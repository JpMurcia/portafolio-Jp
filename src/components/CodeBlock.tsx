export function CodeBlock({ code }: { code: string }) {
  return (
    // tabIndex: una región con scroll horizontal debe poder recorrerse con teclado.
    <pre
      tabIndex={0}
      className="overflow-x-auto rounded-xl border border-divider bg-bg px-4 py-4 font-mono text-xs leading-[1.75] text-mute-800"
    >
      {code}
    </pre>
  )
}
