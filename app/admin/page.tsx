import PostTable from "@/components/admin/PostTable";

export const metadata = { title: "Admin Dashboard" };

export default function AdminDashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold text-mc-dark tracking-tight mb-8">
        Posts
      </h1>
      <PostTable />
    </>
  );
}
