import { AdminBlog } from "@/components/admin/admin-blog";
import { listBlogPosts } from "@/lib/blog/posts";

export default async function AdminBlogPage() {
  const posts = await listBlogPosts({ includeDrafts: true });
  return <AdminBlog initialPosts={posts} />;
}
