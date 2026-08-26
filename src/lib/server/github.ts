type GitHubCommitInput = {
  path: string;
  content: string;
  message: string;
};

function getRepoConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? "Matias97788/portafolio-mr";
  if (!token) return null;
  const [owner, name] = repo.split("/");
  if (!owner || !name) return null;
  return { token, owner, name };
}

async function getFileSha(owner: string, name: string, path: string, token: string) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${name}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  if (!res.ok) return undefined;
  const data = (await res.json()) as { sha?: string };
  return data.sha;
}

export async function commitFilesToGitHub(commits: GitHubCommitInput[]) {
  const config = getRepoConfig();
  if (!config) {
    return { ok: false as const, error: "GITHUB_TOKEN no configurado" };
  }

  const { token, owner, name } = config;

  for (const commit of commits) {
    const sha = await getFileSha(owner, name, commit.path, token);
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${name}/contents/${commit.path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          message: commit.message,
          content: Buffer.from(commit.content, "utf8").toString("base64"),
          ...(sha ? { sha } : {}),
        }),
      },
    );

    if (!res.ok) {
      const error = await res.text();
      return { ok: false as const, error };
    }
  }

  return { ok: true as const };
}

export function isGitHubPublishEnabled() {
  return Boolean(getRepoConfig());
}
