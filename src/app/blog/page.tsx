import Image from "next/image";
import Link from "next/link";

import { listBlogPosts } from "@/lib/blog/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Blog",
  description:
    "Artículos sobre desarrollo web, performance, ecommerce y automatización para pymes en Chile.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await listBlogPosts();

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Ideas prácticas sobre web, performance, ecommerce y automatización.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted">
                  {post.cover ? (
                    <Image
                      src={post.cover}
                      alt={post.coverAlt ?? post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : null}
                </div>
              </Link>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${SITE_NAME} Blog`,
            url: `${SITE_URL}/blog`,
          }),
        }}
      />
    </>
  );
}
