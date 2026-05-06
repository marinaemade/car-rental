import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import {
  ArrowLeftIcon, PencilIcon, TrashIcon,
  EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon, ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 bg-black/20 rounded-xl">
    <Icon className="h-4 w-4 text-green flex-shrink-0" />
    <div>
      <p className="text-xs text-gray">{label}</p>
      <p className="text-sm text-white">{value}</p>
    </div>
  </div>
);

const ClientView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, bookings } = useAdmin();

  const client = clients.find((c) => c.id == id);
  const clientBookings = bookings.filter((b) => b.customerId == id || b.customerName === client?.name);

  if (!client) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray text-lg mt-20">Client not found.</p>
        <button onClick={() => navigate("/admin/clients")} className="mt-4 text-green underline text-sm">Back to Clients</button>
      </div>
    );
  }

  const joined = client.joinDate
    ? new Date(client.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "—";

  return (
    <div className="py-4 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/clients")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">Client Profile</h2>
            <p className="text-gray text-sm font-mono">{client.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/admin/clients/${id}/edit`)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
            <PencilIcon className="h-4 w-4" /> Edit
          </button>
          <button onClick={() => navigate(`/admin/clients/${id}/delete`)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors">
            <TrashIcon className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="h-16 w-16 rounded-full bg-green/20 border border-green/30 flex items-center justify-center text-2xl font-bold text-white">
            {client.name?.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{client.name}</h3>
            <div className="mt-1"><StatusBadge status={client.status} type="pill" /></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard icon={EnvelopeIcon} label="Email"        value={client.email} />
          <InfoCard icon={PhoneIcon}    label="Phone"        value={client.phone} />
          <InfoCard icon={MapPinIcon}   label="Address"      value={client.address || "—"} />
          <InfoCard icon={CalendarIcon} label="Member Since" value={joined} />
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardDocumentListIcon className="h-5 w-5 text-green" />
          <h3 className="text-base font-bold text-white">Booking History</h3>
          <span className="ml-auto bg-white/10 text-gray text-xs px-2 py-0.5 rounded-full">{clientBookings.length}</span>
        </div>
        {clientBookings.length === 0 ? (
          <p className="text-gray text-sm text-center py-6">No bookings found for this client.</p>
        ) : (
          <div className="space-y-2">
            {clientBookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white font-medium">{b.carName}</p>
                  <p className="text-xs text-gray font-mono">{b.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green">${b.totalPrice?.toLocaleString()}</p>
                  <p className="text-xs text-gray">{new Date(b.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientView;
