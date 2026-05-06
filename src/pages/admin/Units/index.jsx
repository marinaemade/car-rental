import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import {
  PlusIcon, MagnifyingGlassIcon, PencilIcon,
  TrashIcon, EyeIcon, Squares2X2Icon, ListBulletIcon,
} from "@heroicons/react/24/outline";

const CATEGORIES = ["All", "Sports", "Electric", "SUV", "Luxury", "Sedan", "Pickup"];
const PER_PAGE = 9;

const Units = () => {
  const { units } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView]         = useState("grid");
  const [page, setPage]         = useState(1);

  const filtered = units
    .filter((u) => category === "All" || u.type === category)
    .filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const changeCategory = (c) => { setCategory(c); setPage(1); };
  const changeSearch   = (s) => { setSearch(s);   setPage(1); };

  const ActionButtons = ({ id }) => (
    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onClick={() => navigate(`/admin/units/${id}`)}        className="p-1.5 text-gray hover:text-white hover:bg-white/10 rounded-lg"><EyeIcon    className="h-4 w-4" /></button>
      <button onClick={() => navigate(`/admin/units/${id}/edit`)}   className="p-1.5 text-gray hover:text-white hover:bg-white/10 rounded-lg"><PencilIcon className="h-4 w-4" /></button>
      <button onClick={() => navigate(`/admin/units/${id}/delete`)} className="p-1.5 text-gray hover:text-red-400 hover:bg-red-500/10 rounded-lg"><TrashIcon className="h-4 w-4" /></button>
    </div>
  );

  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Fleet Management</h2>
          <p className="text-gray text-sm">{units.length} vehicles in fleet</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
            <input
              type="text" placeholder="Search vehicles..."
              value={search} onChange={(e) => changeSearch(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray/60 focus:outline-none focus:border-green/50 w-52"
            />
          </div>
          <div className="flex bg-surface/50 border border-white/10 rounded-xl p-1">
            <button onClick={() => setView("grid")} className={`p-1.5 rounded-lg ${view === "grid" ? "bg-white/10 text-green" : "text-gray"}`}><Squares2X2Icon className="h-4 w-4" /></button>
            <button onClick={() => setView("list")} className={`p-1.5 rounded-lg ${view === "list" ? "bg-white/10 text-green" : "text-gray"}`}><ListBulletIcon  className="h-4 w-4" /></button>
          </div>
          <button onClick={() => navigate("/admin/units/add")} className="flex items-center gap-2 bg-green hover:bg-darkGreen text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Unit
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => changeCategory(c)} className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${category === c ? "bg-green text-black border-green" : "bg-surface border-white/10 text-gray hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray">
          <p className="text-lg">No vehicles found</p>
          <p className="text-sm mt-1">Try adjusting your filters.</p>
        </div>
      )}

      {filtered.length > 0 && view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {paged.map((u) => (
            <div key={u.id} className="bg-surface border border-white/10 rounded-xl overflow-hidden group">
              <div className="relative h-44 overflow-hidden bg-black">
                <img src={u.image} alt={u.name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-3 left-3"><StatusBadge status={u.status} type="pill" /></div>
                <div className="absolute top-2 right-2"><ActionButtons id={u.id} /></div>
                <div className="absolute bottom-3 left-4">
                  <span className="text-2xl font-bold text-white">${u.price}</span>
                  <span className="text-xs text-gray ml-1">/day</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-white truncate">{u.name}</h3>
                <p className="text-xs text-gray mb-3">{u.type}</p>
                <div className="grid grid-cols-3 gap-1 pt-3 border-t border-white/10 text-center">
                  <div><p className="text-xs text-gray">Trans</p><p className="text-xs font-medium text-white">{u.specs?.transmission?.substring(0, 4)}</p></div>
                  <div className="border-x border-white/10"><p className="text-xs text-gray">Seats</p><p className="text-xs font-medium text-white">{u.specs?.seats}</p></div>
                  <div><p className="text-xs text-gray">Fuel</p><p className="text-xs font-medium text-white">{u.specs?.fuel?.substring(0, 6)}</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && view === "list" && (
        <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 text-gray text-xs uppercase tracking-wider bg-black/20">
                  {["Vehicle", "Specs", "Daily Rate", "Status", ""].map((h) => <th key={h} className="px-5 py-4 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paged.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-20 rounded-lg overflow-hidden bg-black flex-shrink-0">
                          <img src={u.image} alt={u.name} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{u.name}</p>
                          <p className="text-xs text-gray">{u.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray space-y-0.5">
                      <div>{u.specs?.transmission}</div>
                      <div>{u.specs?.seats} seats · {u.specs?.fuel}</div>
                    </td>
                    <td className="px-5 py-4"><span className="text-lg font-bold text-white">${u.price}</span><span className="text-xs text-gray">/day</span></td>
                    <td className="px-5 py-4"><StatusBadge status={u.status} type="pill" /></td>
                    <td className="px-5 py-4"><ActionButtons id={u.id} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray">Page {page} of {totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white disabled:opacity-30">‹</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`h-8 w-8 rounded-lg text-xs font-bold ${page === i + 1 ? "bg-green text-black" : "text-gray hover:text-white"}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white disabled:opacity-30">›</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Units;
