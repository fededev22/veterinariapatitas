export function ExampleBadge({ children = "Contenido de ejemplo" }: { children?: string }) {
  return <span className="example-badge">{children}</span>;
}
