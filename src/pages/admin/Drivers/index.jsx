import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, EyeIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

const Drivers = () => {
  const { drivers } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = drivers.filter((d) => {
    const q = search.toLowerCase();
    return !q || d.name?.toLowerCase().includes(q) || d.phone?.includes(q) || d.licenseNumber?.toLowerCase().includes(q);
  });

  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Drivers</h2>
          <p className="text-gray text-sm">{drivers.length} registered drivers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
            <input
              type="text" placeholder="Search drivers..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray/60 focus:outline-none focus:border-green/50 w-52"
            />
          </div>
          <button onClick={() => navigate("/admin/drivers/add")} className="flex items-center gap-2 bg-green hover:bg-darkGreen text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Driver
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((d) => (
          <div key={d.id} className="bg-surface border border-white/10 rounded-xl p-5 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-surface border border-white/10 overflow-hidden flex-shrink-0">
                  {d.avatar
                    ? <img src={d.avatar} alt={d.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white">{d.name?.charAt(0)}</div>
                  }
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{d.name}</h4>
                  <p className="text-xs text-gray font-mono">{d.licenseNumber}</p>
                </div>
              </div>
              <StatusBadge status={d.status} type="pill" />
            </div>

            <div className="space-y-2 text-xs text-gray mb-4">
              <div className="flex items-center gap-2"><EnvelopeIcon className="h-3.5 w-3.5 flex-shrink-0" /><span>{d.email}</span></div>
              <div className="flex items-center gap-2"><PhoneIcon    className="h-3.5 w-3.5 flex-shrink-0" /><span>{d.phone}</span></div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-white/5">
              <button onClick={() => navigate(`/admin/drivers/${d.id}`)}        className="flex-1 py-2 rounded-lg text-xs text-gray hover:text-white hover:bg-white/5 border border-white/10 transition-colors flex items-center justify-center gap-1"><EyeIcon    className="h-3.5 w-3.5" /> View</button>
              <button onClick={() => navigate(`/admin/drivers/${d.id}/edit`)}   className="flex-1 py-2 rounded-lg text-xs text-gray hover:text-white hover:bg-white/5 border border-white/10 transition-colors flex items-center justify-center gap-1"><PencilIcon className="h-3.5 w-3.5" /> Edit</button>
              <button onClick={() => navigate(`/admin/drivers/${d.id}/delete`)} className="flex-1 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors flex items-center justify-center gap-1"><TrashIcon  className="h-3.5 w-3.5" /> Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-20 text-gray">No drivers found.</div>
        )}
      </div>
    </div>
  );
};

export default Drivers;
