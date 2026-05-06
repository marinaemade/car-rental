import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ClientDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, deleteClient } = useAdmin();

  const client = clients.find((c) => c.id == id);

  const handleDelete = () => {
    deleteClient(id);
    navigate("/admin/clients");
  };

  if (!client) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray text-lg mt-20">Client not found.</p>
        <button onClick={() => navigate("/admin/clients")} className="mt-4 text-green underline text-sm">Back to Clients</button>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/clients")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <h2 className="text-2xl font-bold text-white">Delete Client</h2>
      </div>

      <div className="bg-surface border border-red-500/30 rounded-xl p-6 space-y-5">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Are you sure?</h3>
            <p className="text-gray text-sm mt-1">This will permanently remove the client and all associated data.</p>
          </div>
        </div>

        <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-green/20 border border-green/20 flex items-center justify-center text-sm font-bold text-white">
              {client.name?.charAt(0)}
            </div>
            <div>
              <p className="text-white font-bold">{client.name}</p>
              <p className="text-xs text-gray">{client.email}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm border-t border-white/5 pt-2">
            <span className="text-gray">Total Bookings</span>
            <span className="text-white">{client.totalBookings ?? 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray">Status</span>
            <span className="text-white">{client.status}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate("/admin/clients")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">Cancel</button>
          <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ClientDelete;
