import { AdminLeads } from "@/components/admin/admin-leads";
import { listLeads } from "@/lib/server/store";

export default async function AdminPage() {
  const items = await listLeads();
  return <AdminLeads initialItems={items} />;
}
