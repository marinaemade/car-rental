import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const UnitDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { units, deleteUnit } = useAdmin();

  const unit = units.find((u) => String(u.id) === id);

  const handleDelete = () => {
    deleteUnit(id);
    navigate("/admin/units");
  };

  if (!unit) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray text-lg mt-20">Vehicle not found.</p>
        <button onClick={() => navigate("/admin/units")} className="mt-4 text-green underline text-sm">Back to Units</button>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/units")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <h2 className="text-2xl font-bold text-white">Delete Unit</h2>
      </div>

      <div className="bg-surface border border-red-500/30 rounded-xl p-6 space-y-5">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Are you sure?</h3>
            <p className="text-gray text-sm mt-1">This vehicle will be permanently removed from the fleet.</p>
          </div>
        </div>

        <div className="bg-black/30 border border-white/5 rounded-xl overflow-hidden">
          <div className="h-32 overflow-hidden">
            <img src={unit.image} alt={unit.name} className="w-full h-full object-cover opacity-60" />
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray">Vehicle</span>
              <span className="text-white font-bold">{unit.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Category</span>
              <span className="text-white">{unit.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Daily Rate</span>
              <span className="text-green font-bold">${unit.price}/day</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate("/admin/units")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">Cancel</button>
          <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default UnitDelete;
