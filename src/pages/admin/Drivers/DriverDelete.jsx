import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const DriverDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { drivers, deleteDriver } = useAdmin();

  const driver = drivers.find((d) => d.id == id);

  const handleDelete = () => {
    deleteDriver(id);
    navigate("/admin/drivers");
  };

  if (!driver) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray text-lg mt-20">Driver not found.</p>
        <button onClick={() => navigate("/admin/drivers")} className="mt-4 text-green underline text-sm">Back to Drivers</button>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/drivers")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <h2 className="text-2xl font-bold text-white">Delete Driver</h2>
      </div>

      <div className="bg-surface border border-red-500/30 rounded-xl p-6 space-y-5">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Are you sure?</h3>
            <p className="text-gray text-sm mt-1">This action cannot be undone. The driver's profile will be permanently removed.</p>
          </div>
        </div>

        <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
            <div className="h-12 w-12 rounded-full bg-surface border border-white/10 overflow-hidden flex-shrink-0">
              {driver.avatar
                ? <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white">{driver.name?.charAt(0)}</div>
              }
            </div>
            <div>
              <p className="text-white font-bold">{driver.name}</p>
              <p className="text-xs text-gray font-mono">{driver.licenseNumber}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray">Status</span>
            <span className="text-white">{driver.status}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate("/admin/drivers")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">Cancel</button>
          <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DriverDelete;
