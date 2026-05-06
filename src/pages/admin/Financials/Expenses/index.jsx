import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../../context/AdminContext";
import { PlusIcon, MagnifyingGlassIcon, TrashIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const CATEGORIES = ["All", "Maintenance", "Salaries", "Utilities", "Marketing", "Other"];

const Expenses = () => {
  const { expenses } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");

  const filtered = expenses
    .filter((e) => category === "All" || e.category === category)
    .filter((e) => {
      const q = search.toLowerCase();
      return !q || e.description?.toLowerCase().includes(q) || e.id?.toLowerCase().includes(q);
    });

  const totalValue = filtered.reduce((sum, e) => sum + (e.amount || 0), 0);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Expenses</h2>
          <p className="text-gray text-sm">Track and manage company expenditures.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-surface/50 border border-white/10 rounded-xl py-2 px-4 text-sm">
            <span className="text-white font-bold">{filtered.length}</span>
            <span className="text-gray">records</span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-red-400 font-bold">${totalValue.toLocaleString()}</span>
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
            <input
              type="text" placeholder="Search..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray/60 focus:outline-none focus:border-green/50 w-48"
            />
          </div>
          <button onClick={() => navigate("/admin/financials/expenses/add")} className="flex items-center gap-2 bg-green hover:bg-darkGreen text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Expense
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${category === c ? "bg-green text-black border-green" : "bg-surface border-white/10 text-gray hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="overflow-hidden bg-surface border border-white/10 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 text-gray text-xs uppercase tracking-wider bg-black/20">
                {["ID / Date", "Description", "Category", "Amount", "Logged By", ""].map((h) => (
                  <th key={h} className="px-5 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="text-sm font-mono text-gray">{e.id}</p>
                    <p className="text-xs text-white">{formatDate(e.date)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="h-4 w-4 text-gray" />
                      <span className="text-sm font-medium text-white">{e.description}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-white/5 text-gray border border-white/10 px-2.5 py-1 rounded-md text-xs">{e.category}</span>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-red-400">-${e.amount?.toLocaleString()}</td>
                  <td className="px-5 py-4 text-xs text-gray">{e.loggedBy}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/admin/financials/expenses/${e.id}/delete`)} className="p-1.5 text-gray hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-gray">No expenses found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
