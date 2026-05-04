import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import {
  PlusIcon, MagnifyingGlassIcon, PencilIcon,
  TrashIcon, EyeIcon, EnvelopeIcon, PhoneIcon,
  ChevronLeftIcon, ChevronRightIcon,
} from "@heroicons/react/24/outline";

const PER_PAGE = 8;

const Clients = () => {
  const { clients } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.phone?.includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Clients</h2>
          <p className="text-gray text-sm">{clients.length} registered customers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
            <input
              type="text" placeholder="Search clients..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray/60 focus:outline-none focus:border-green/50 w-52"
            />
          </div>
          <button onClick={() => navigate("/admin/clients/add")} className="flex items-center gap-2 bg-green hover:bg-darkGreen text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Client
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-surface border border-white/10 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-gray text-xs uppercase tracking-wider bg-black/20">
                {["Client", "Contact", "Address", "Joined", "Bookings", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paged.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/admin/clients/${c.id}`)}
                  className="hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-green/20 border border-green/20 flex items-center justify-center text-sm font-bold text-white">
                        {c.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{c.name}</p>
                        <p className="text-xs text-gray font-mono">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray"><EnvelopeIcon className="h-3.5 w-3.5" />{c.email}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray"><PhoneIcon    className="h-3.5 w-3.5" />{c.phone}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray">{c.address}</td>
                  <td className="px-5 py-4 text-xs text-gray">
                    {c.joinDate ? new Date(c.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold">{c.totalBookings ?? 0}</span>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={c.status} type="pill" /></td>
                  <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/admin/clients/${c.id}`)}        className="p-1.5 text-gray hover:text-white hover:bg-white/10 rounded-lg"><EyeIcon    className="h-4 w-4" /></button>
                      <button onClick={() => navigate(`/admin/clients/${c.id}/edit`)}   className="p-1.5 text-gray hover:text-white hover:bg-white/10 rounded-lg"><PencilIcon className="h-4 w-4" /></button>
                      <button onClick={() => navigate(`/admin/clients/${c.id}/delete`)} className="p-1.5 text-gray hover:text-red-400 hover:bg-red-500/10 rounded-lg"><TrashIcon  className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-gray">No clients found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-gray">
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-white/10 text-gray hover:text-white disabled:opacity-30">
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`h-7 w-7 rounded-lg text-xs font-bold ${page === i + 1 ? "bg-green text-black" : "text-gray hover:text-white"}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-white/10 text-gray hover:text-white disabled:opacity-30">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
