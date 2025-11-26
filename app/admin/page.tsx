import LogoutButton from "@/components/admin/LogoutButton";
import { getCustomerLeadCollection } from "@/lib/mongodb";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminPage() {
  const collection = await getCustomerLeadCollection();
  const documents = await collection
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  const leads = documents.map((doc) => ({
    id: doc._id?.toString() ?? "",
    customerName: doc.customerName,
    phoneNumber: doc.phoneNumber,
    product: doc.product || null,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
  }));

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <header className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-sans font-medium uppercase tracking-[0.3em] text-emerald-600">Dashboard</p>
          <h1 className="mt-2 text-3xl font-sans font-semibold tracking-tight">Customer submissions</h1>
          <p className="mt-1 text-sm font-sans text-zinc-500">Showing the most recent {leads.length} entries.</p>
        </div>
        <LogoutButton />
      </header>

      <main className="mx-auto mt-8 w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-6 py-3 font-sans font-medium">Name</th>
              <th className="px-6 py-3 font-sans font-medium">Phone</th>
              <th className="px-6 py-3 font-sans font-medium">Product</th>
              <th className="px-6 py-3 font-sans font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td className="px-6 py-8 text-center text-sm font-sans text-zinc-500" colSpan={4}>
                  No submissions yet.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-zinc-100 text-sm font-sans text-zinc-700">
                <td className="px-6 py-4 font-sans font-medium text-zinc-900">{lead.customerName}</td>
                <td className="px-6 py-4 font-sans">{lead.phoneNumber}</td>
                <td className="px-6 py-4 font-sans text-zinc-500">{lead.product || "—"}</td>
                <td className="px-6 py-4 font-sans text-zinc-500">
                  {dateFormatter.format(new Date(lead.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

