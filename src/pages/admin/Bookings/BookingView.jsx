import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import StatusBadge from "../../../components/admin/StatusBadge";
import {
  ArrowLeftIcon, PencilIcon, TrashIcon,
  CalendarIcon, CurrencyDollarIcon, TruckIcon, UserIcon, CreditCardIcon,
} from "@heroicons/react/24/outline";

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
    <div className="h-9 w-9 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center flex-shrink-0">
      <Icon className="h-4 w-4 text-green" />
    </div>
    <div>
      <p className="text-xs text-gray uppercase tracking-wider">{label}</p>
      <p className="text-sm text-white font-medium mt-0.5">{value}</p>
    </div>
  </div>
);

const BookingView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings } = useAdmin();

  const booking = bookings.find((b) => b.id == id);

  if (!booking) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray text-lg mt-20">Booking not found.</p>
        <button onClick={() => navigate("/admin/bookings")} className="mt-4 text-green underline text-sm">
          Back to Bookings
        </button>
      </div>
    );
  }

  const period = `${new Date(booking.startDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} → ${new Date(booking.endDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`;

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/bookings")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">Booking Detail</h2>
            <p className="text-gray text-sm font-mono">{booking.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/admin/bookings/${id}/edit`)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
            <PencilIcon className="h-4 w-4" /> Edit
          </button>
          <button onClick={() => navigate(`/admin/bookings/${id}/delete`)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors">
            <TrashIcon className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm text-gray">Current Status</span>
        <StatusBadge status={booking.status} type="pill" />
      </div>

      <div className="bg-surface border border-white/10 rounded-xl px-6 py-2">
        <InfoRow icon={UserIcon}          label="Customer"       value={booking.customerName} />
        <InfoRow icon={TruckIcon}         label="Vehicle"        value={booking.carName} />
        <InfoRow icon={CalendarIcon}      label="Rental Period"  value={period} />
        <InfoRow icon={CurrencyDollarIcon} label="Total Price"   value={`$${booking.totalPrice?.toLocaleString()}`} />
        <InfoRow icon={CreditCardIcon}    label="Payment Method" value={booking.paymentMethod} />
      </div>
    </div>
  );
};

export default BookingView;
