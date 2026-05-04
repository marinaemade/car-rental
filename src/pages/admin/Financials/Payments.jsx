import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import {
  MagnifyingGlassIcon, ArrowDownTrayIcon,
  BanknotesIcon, CreditCardIcon, ArrowTrendingUpIcon, ClockIcon,
} from "@heroicons/react/24/outline";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const STATUS_FILTERS = ["All", "Completed", "Pending", "Refunded"];
const METHODS = ["Credit Card", "Visa", "Bank Transfer", "PayPal", "Cash"];

const StatCard = ({ icon: Icon, label, value, borderColor, iconColor }) => (
  <div className={`bg-surface border ${borderColor} rounded-xl p-5 flex items-center gap-3`}>
    <div className={`h-10 w-10 rounded-full ${iconColor.bg} border ${borderColor} flex items-center justify-center flex-shrink-0`}>
      <Icon className={`h-5 w-5 ${iconColor.text}`} />
    </div>
    <div>
      <p className="text-xs text-gray">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const Payments = () => {
  const { bookings, stats, loading } = useAdmin();
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const payments = bookings.map((b, i) => ({
    id: `TRX-${1000 + i}`,
    bookingId: b.id,
    customer: b.customerName,
    carName: b.carName,
    amount: b.totalPrice,
    date: new Date(b.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    method: METHODS[i % METHODS.length],
    status: b.status === "Pending" ? "Pending" : b.status === "Cancelled" ? "Refunded" : "Completed",
  }));

  const filtered = payments
    .filter((p) => statusFilter === "All" || p.status === statusFilter)
    .filter((p) => {
      const q = search.toLowerCase();
      return !q || p.customer.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    });

  const completed  = payments.filter((p) => p.status === "Completed");
  const totalRevenue   = completed.reduce((s, p) => s + p.amount, 0);
  const totalPending   = payments.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
  const avgTransaction = completed.length > 0 ? Math.round(totalRevenue / completed.length) : 0;

  const exportCSV = () => {
    const header = "Transaction ID,Date,Customer,Vehicle,Method,Amount,Status";
    const rows = filtered.map((p) => `${p.id},${p.date},${p.customer},${p.carName},${p.method},$${p.amount},${p.status}`);
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "payments.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Payments Ledger</h2>
          <p className="text-gray text-sm">Track all incoming revenue and transactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
            <input
              type="text" placeholder="Search transactions..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray/60 focus:outline-none focus:border-green/50 w-52"
            />
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 bg-surface border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            <ArrowDownTrayIcon className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BanknotesIcon}       label="Total Revenue"    value={`$${totalRevenue.toLocaleString()}`} borderColor="border-green/20"          iconColor={{ bg: "bg-green/10",        text: "text-green" }} />
        <StatCard icon={CreditCardIcon}      label="Transactions"     value={payments.length}                     borderColor="border-blue-500/20"        iconColor={{ bg: "bg-blue-500/10",     text: "text-blue-400" }} />
        <StatCard icon={ClockIcon}           label="Pending"          value={`$${totalPending.toLocaleString()}`} borderColor="border-yellow-500/20"      iconColor={{ bg: "bg-yellow-500/10",   text: "text-yellow-400" }} />
        <StatCard icon={ArrowTrendingUpIcon} label="Avg Transaction"  value={`$${avgTransaction.toLocaleString()}`} borderColor="border-purple-500/20"   iconColor={{ bg: "bg-purple-500/10",   text: "text-purple-400" }} />
      </div>

      {stats && (
        <div className="bg-surface border border-white/10 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-4">Monthly Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.revenueByMonth} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} tickFormatter={(v) => `$${v / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff15", borderRadius: "10px", color: "#fff" }} formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="amount" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex gap-2">
        {STATUS_FILTERS.map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${statusFilter === s ? "bg-green text-black border-green" : "bg-surface border-white/10 text-gray hover:text-white"}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray">Loading payments...</div>
      ) : (
        <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-white/5 text-gray text-xs uppercase tracking-wider bg-black/20">
                  {["Transaction ID", "Date", "Customer", "Vehicle", "Method", "Amount", "Status"].map((h) => (
                    <th key={h} className="px-5 py-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4 text-xs font-mono text-gray">{p.id}</td>
                    <td className="px-5 py-4 text-xs text-gray">{p.date}</td>
                    <td className="px-5 py-4 text-sm font-medium text-white">{p.customer}</td>
                    <td className="px-5 py-4 text-xs text-gray">{p.carName}</td>
                    <td className="px-5 py-4 text-xs text-gray">{p.method}</td>
                    <td className="px-5 py-4 text-sm font-bold text-green">${p.amount.toLocaleString()}</td>
                    <td className="px-5 py-4"><StatusBadge status={p.status} type="pill" /></td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-gray">No transactions match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
