type PublishLinkedInInput = {
  text: string;
  url: string;
  title: string;
  description: string;
};

export function isLinkedInEnabled() {
  return Boolean(
    process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_AUTHOR_URN,
  );
}

export async function publishToLinkedIn(input: PublishLinkedInInput) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const author = process.env.LINKEDIN_AUTHOR_URN;

  if (!token || !author) {
    return { ok: false as const, error: "LinkedIn no configurado" };
  }

  const body = {
    author,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: input.text,
        },
        shareMediaCategory: "ARTICLE",
        media: [
          {
            status: "READY",
            originalUrl: input.url,
            title: { text: input.title },
            description: { text: input.description },
          },
        ],
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return { ok: false as const, error: await res.text() };
  }

  const data = (await res.json()) as { id?: string };
  return { ok: true as const, id: data.id ?? "" };
}
