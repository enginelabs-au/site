# Back-office Engine

**A workflow that reads your invoices, receipts and supplier docs, extracts the data, and drops it cleanly into the system your bookkeeper actually uses.**

## The work it retires

The data-entry half of bookkeeping: opening a PDF, reading a number, typing it into Xero / QuickBooks / a spreadsheet, attaching the file, tagging the category. The Back-office Engine does the reading and typing. A human still reviews.

## Inputs

- Invoices, receipts, supplier statements, purchase orders, expense reports (PDF, image, email).
- Where they currently arrive (an email inbox, a Dropbox folder, a Drive folder, scanned uploads).
- Your chart of accounts and category tags.

## Outputs

- Extracted structured data: vendor, date, amount, GST, line items, category guess.
- A draft record in your accounting tool (or a clean CSV ready to import), with the original file attached.
- A weekly summary of what was processed, what's flagged, and what needs human attention.

## Typical integrations

Xero, QuickBooks Online, MYOB, Wave, Zoho Books, Hubdoc, Dext, Google Drive, Dropbox, Gmail/Outlook, Airtable, Google Sheets.

## What's included

- Document intake from one or two sources.
- Extraction pipeline with confidence scoring.
- Drafted records in your tool (or CSV).
- Flagging for anything below a confidence threshold.
- Weekly processing summary.
- Setup notes, accuracy benchmarks, handover.

## What's not included

- **Bookkeeping, tax, BAS, GST, financial or accounting advice.** This Engine extracts data. Your accountant or bookkeeper reviews and decides. This is explicit in the MSA §3 and re-stated in every Back-office SOW.
- Auto-posting of records to your accounting system without human review.
- Payroll, payment processing, or any action that moves money.
- Audit-grade reconciliation, fraud detection or compliance certification.
- Handling of sensitive personal financial data without an explicit SOW provision and safeguards (Addendum §2).

## Human review

Every extracted record sits in a review queue. A human approves, edits or rejects before anything is posted. Records below the confidence threshold are flagged automatically. The Engine never moves money.

## Price band

**from A$650 → A$3,500 (AUD)**, scoped in the Control Centre.

- *Basic* (A$650): one source, one document type, CSV output.
- *Standard* (A$1,800): two sources, multiple doc types, draft records in your tool.
- *Premium* (A$3,500): multi-source, full flagging, weekly summary, accuracy benchmarks.

## Typical timeline

2–4 weeks depending on document variety and accounting tool integration.

## Configure in the Control Centre →
