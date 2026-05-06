import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const UnitView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { units } = useAdmin();

  const unit = units.find((u) => String(u.id) === id);

  if (!unit) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray text-lg mt-20">Vehicle not found.</p>
        <button onClick={() => navigate("/admin/units")} className="mt-4 text-green underline text-sm">Back to Units</button>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/units")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">Vehicle Detail</h2>
            <p className="text-gray text-sm">{unit.type}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/admin/units/${id}/edit`)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
            <PencilIcon className="h-4 w-4" /> Edit
          </button>
          <button onClick={() => navigate(`/admin/units/${id}/delete`)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors">
            <TrashIcon className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      <div className="relative h-56 rounded-xl overflow-hidden bg-black">
        <img src={unit.image} alt={unit.name} className="w-full h-full object-cover opacity-90" />
        <div className="absolute top-4 left-4"><StatusBadge status={unit.status} type="pill" /></div>
        <div className="absolute bottom-4 right-4">
          <span className="text-3xl font-bold text-white">${unit.price}</span>
          <span className="text-sm text-gray ml-1">/day</span>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">{unit.name}</h3>
          <p className="text-gray text-sm mt-0.5">{unit.type}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <p className="text-xs text-gray uppercase tracking-wider mb-1">Transmission</p>
            <p className="text-sm font-bold text-white">{unit.specs?.transmission}</p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="text-xs text-gray uppercase tracking-wider mb-1">Seats</p>
            <p className="text-sm font-bold text-white">{unit.specs?.seats}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray uppercase tracking-wider mb-1">Fuel</p>
            <p className="text-sm font-bold text-white">{unit.specs?.fuel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitView;
