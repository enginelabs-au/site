import type { ComponentProps } from "react";

type MDXComponents = Record<
  string,
  React.ComponentType<ComponentProps<"div">> | React.ComponentType<unknown>
>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
