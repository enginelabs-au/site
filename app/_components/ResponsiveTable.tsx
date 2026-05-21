import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ResponsiveTableColumn<Row> = {
  /** Stable key used for React lists and as the column id. */
  key: string;
  /** Column header rendered above the table on md+; also used as the
   *  per-cell mobile label unless `mobileLabel` is provided. */
  header: ReactNode;
  /** Optional shorter label to use on the mobile card view. */
  mobileLabel?: ReactNode;
  /** How to render the value for this row. */
  cell: (row: Row) => ReactNode;
  /** Marks this column as the headline on the mobile card view:
   *  rendered without a label, with stronger emphasis. Expect one per table. */
  primary?: boolean;
  /** Extra classes for the `<th>` in table view. */
  thClassName?: string;
  /** Extra classes for the `<td>` in table view. */
  tdClassName?: string;
  /** Extra classes for the mobile-card cell wrapper. */
  mobileCellClassName?: string;
};

/**
 * A table that stacks into a card list on mobile (`<md`) and renders a
 * normal `<table>` on `md:`+. Used for any table where stacking is a
 * better UX than horizontal scrolling on narrow phones.
 *
 * - Each row's mobile card uses a `<dl>` with the column header as the
 *   `<dt>` (rendered as a small uppercase eyebrow) and the cell value
 *   as the `<dd>`. The column flagged `primary` is rendered without a
 *   label as the card's headline.
 * - The desktop table reuses the same `bg-paper-3` header and
 *   `divide-y divide-border` body styling that the existing engines /
 *   pricing tables had, so dropping this component in is visually
 *   neutral on wider screens.
 */
/** Hoist primary columns to the top of the mobile card without altering
 *  the desktop column order. */
function mobileOrderedColumns<Row>(
  columns: ResponsiveTableColumn<Row>[],
): ResponsiveTableColumn<Row>[] {
  const primary = columns.filter((c) => c.primary);
  const rest = columns.filter((c) => !c.primary);
  return [...primary, ...rest];
}

export default function ResponsiveTable<Row>({
  columns,
  rows,
  rowKey,
  className,
  ariaLabel,
}: {
  columns: ResponsiveTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-paper",
        className,
      )}
    >
      <ul
        aria-label={ariaLabel}
        className="divide-y divide-border md:hidden"
      >
        {rows.map((row) => (
          <li key={rowKey(row)} className="px-4 py-4">
            <dl className="space-y-2.5">
              {mobileOrderedColumns(columns).map((col) => (
                <div
                  key={col.key}
                  className={cn("min-w-0", col.mobileCellClassName)}
                >
                  {col.primary ? (
                    <div className="min-w-0 break-words text-[0.95rem] font-medium text-foreground">
                      {col.cell(row)}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-ink-3">
                        {col.mobileLabel ?? col.header}
                      </dt>
                      <dd className="min-w-0 break-words text-sm leading-snug text-ink-2">
                        {col.cell(row)}
                      </dd>
                    </div>
                  )}
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-paper-3 text-xs uppercase tracking-[0.06em] text-ink-3">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-5 py-3.5 text-left align-top font-semibold",
                    col.thClassName,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={rowKey(row)} className="align-top">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-5 py-5 align-top text-ink-2",
                      col.tdClassName,
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
