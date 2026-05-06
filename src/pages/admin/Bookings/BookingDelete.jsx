import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const BookingDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, deleteBooking } = useAdmin();

  const booking = bookings.find((b) => b.id == id);

  const handleDelete = () => {
    deleteBooking(id);
    navigate("/admin/bookings");
  };

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

  return (
    <div className="py-4 max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/bookings")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <h2 className="text-2xl font-bold text-white">Delete Booking</h2>
      </div>

      <div className="bg-surface border border-red-500/30 rounded-xl p-6 space-y-5">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Are you sure?</h3>
            <p className="text-gray text-sm mt-1">This action cannot be undone. The booking will be permanently removed.</p>
          </div>
        </div>

        <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray">Booking ID</span>
            <span className="text-white font-mono">{booking.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray">Customer</span>
            <span className="text-white">{booking.customerName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray">Vehicle</span>
            <span className="text-white">{booking.carName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray">Amount</span>
            <span className="text-green font-bold">${booking.totalPrice?.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate("/admin/bookings")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">
            Cancel
          </button>
          <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDelete;
