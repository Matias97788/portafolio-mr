import { AdminConfig } from "@/components/admin/admin-config";
import { getSiteConfig } from "@/lib/server/store";

export default async function AdminConfigPage() {
  const config = await getSiteConfig();
  return <AdminConfig initialConfig={config} />;
}
