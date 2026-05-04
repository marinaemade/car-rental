import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import { ArrowLeftIcon, PencilIcon, TrashIcon, EnvelopeIcon, PhoneIcon, IdentificationIcon, StarIcon } from "@heroicons/react/24/outline";

const InfoCard = ({ icon: Icon, label, value, wide }) => (
  <div className={`flex items-center gap-3 p-4 bg-black/20 rounded-xl ${wide ? "col-span-1 md:col-span-2" : ""}`}>
    <Icon className="h-5 w-5 text-green flex-shrink-0" />
    <div>
      <p className="text-xs text-gray">{label}</p>
      <p className="text-sm text-white font-medium">{value}</p>
    </div>
  </div>
);

const DriverView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { drivers } = useAdmin();

  const driver = drivers.find((d) => d.id == id);

  if (!driver) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray text-lg mt-20">Driver not found.</p>
        <button onClick={() => navigate("/admin/drivers")} className="mt-4 text-green underline text-sm">Back to Drivers</button>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/drivers")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">Driver Profile</h2>
            <p className="text-gray text-sm font-mono">{driver.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/admin/drivers/${id}/edit`)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
            <PencilIcon className="h-4 w-4" /> Edit
          </button>
          <button onClick={() => navigate(`/admin/drivers/${id}/delete`)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors">
            <TrashIcon className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 text-center md:text-left">
          <div className="h-24 w-24 rounded-full bg-surface border border-white/10 overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            {driver.avatar
              ? <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">{driver.name?.charAt(0)}</div>
            }
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white">{driver.name}</h3>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <StatusBadge status={driver.status} type="pill" />
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20">
                <StarIcon className="h-3.5 w-3.5" /> {driver.rating || "4.8"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard icon={EnvelopeIcon}      label="Email"          value={driver.email} />
          <InfoCard icon={PhoneIcon}         label="Phone"          value={driver.phone} />
          <InfoCard icon={IdentificationIcon} label="License Number" value={driver.licenseNumber} wide />
        </div>
      </div>
    </div>
  );
};

export default DriverView;
