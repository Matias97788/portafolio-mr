import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function PostContent({ content }: { content: string }) {
  return (
    <article className="blog-content space-y-4 text-base leading-7 text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 scroll-mt-24 text-3xl tracking-tight text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 scroll-mt-24 text-2xl tracking-tight text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="text-muted-foreground">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">{children}</ol>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-primary underline underline-offset-4">
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
