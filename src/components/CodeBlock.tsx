export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto border-l-2 border-accent bg-surface px-[18px] py-4 font-mono text-xs leading-[1.7]">
      {code}
    </pre>
  )
}
