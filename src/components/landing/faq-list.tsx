import { faqs } from "@/lib/content/faqs";

export function FaqList({ titleAs = "h2" }: { titleAs?: "h1" | "h2" }) {
  const Title = titleAs;

  return (
    <div>
      <Title
        className={
          titleAs === "h1"
            ? "text-3xl font-semibold tracking-tight sm:text-4xl"
            : "text-2xl font-semibold tracking-tight"
        }
      >
        Preguntas frecuentes
      </Title>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Respuestas directas si estás evaluando desarrollo web, ecommerce o
        automatización en Chile.
      </p>
      <div className="mt-8 grid gap-3">
        {faqs.map((f) => (
          <details
            key={f.question}
            className="rounded-[var(--radius-lg)] border border-border bg-card/50 p-4"
          >
            <summary className="cursor-pointer font-medium">{f.question}</summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
