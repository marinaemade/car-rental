import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

const STATUSES = ["All", "Pending", "Confirmed", "Active", "Completed", "Cancelled"];

const Bookings = () => {
  const { bookings } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = bookings
    .filter((b) => statusFilter === "All" || b.status === statusFilter)
    .filter((b) => {
      const q = search.toLowerCase();
      return !q || b.customerName?.toLowerCase().includes(q) || b.carName?.toLowerCase().includes(q) || b.id?.toLowerCase().includes(q);
    });

  const totalValue = filtered.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Bookings</h2>
          <p className="text-gray text-sm">Manage all rental bookings.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-surface/50 border border-white/10 rounded-xl py-2 px-4 text-sm">
            <span className="text-white font-bold">{filtered.length}</span>
            <span className="text-gray">bookings</span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-green font-bold">${totalValue.toLocaleString()}</span>
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray/60 focus:outline-none focus:border-green/50 w-48"
            />
          </div>
          <button
            onClick={() => navigate("/admin/bookings/add")}
            className="flex items-center gap-2 bg-green hover:bg-darkGreen text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <PlusIcon className="h-4 w-4" /> New Booking
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
              statusFilter === s ? "bg-green text-black border-green" : "bg-surface border-white/10 text-gray hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-hidden bg-surface border border-white/10 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-gray text-xs uppercase tracking-wider bg-black/20">
                {["ID", "Customer", "Vehicle", "Dates", "Amount", "Payment", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4 text-xs font-mono text-gray">{b.id}</td>
                  <td className="px-5 py-4 text-sm text-white font-medium">{b.customerName}</td>
                  <td className="px-5 py-4 text-sm text-gray">{b.carName}</td>
                  <td className="px-5 py-4 text-xs text-gray">{formatDate(b.startDate)} → {formatDate(b.endDate)}</td>
                  <td className="px-5 py-4 text-sm font-bold text-white">${b.totalPrice?.toLocaleString()}</td>
                  <td className="px-5 py-4 text-xs text-gray">{b.paymentMethod}</td>
                  <td className="px-5 py-4"><StatusBadge status={b.status} type="pill" /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/admin/bookings/${b.id}`)} className="p-1.5 text-gray hover:text-white hover:bg-white/10 rounded-lg">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => navigate(`/admin/bookings/${b.id}/edit`)} className="p-1.5 text-gray hover:text-white hover:bg-white/10 rounded-lg">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => navigate(`/admin/bookings/${b.id}/delete`)} className="p-1.5 text-gray hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-gray">No bookings match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
