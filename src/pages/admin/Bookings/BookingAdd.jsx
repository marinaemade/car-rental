import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import useForm from "../../../hooks/useForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const STATUS_OPTIONS  = ["Pending", "Confirmed", "Active", "Completed", "Cancelled"];
const PAYMENT_OPTIONS = ["Visa", "Cash", "Wallet", "Credit Card", "Bank Transfer", "PayPal"];

const INITIAL_FORM = {
  customerId: "", customerName: "",
  carId: "", carName: "",
  startDate: "", endDate: "",
  totalPrice: "", paymentMethod: "Visa", status: "Pending",
};

const validate = (form) => {
  const errors = {};
  if (!form.customerId)   errors.customerId   = "Customer is required.";
  if (!form.carId)        errors.carId        = "Vehicle is required.";
  if (!form.startDate)    errors.startDate    = "Start date is required.";
  if (!form.endDate)      errors.endDate      = "End date is required.";
  if (form.startDate && form.endDate && form.endDate <= form.startDate)
    errors.endDate = "End date must be after start date.";
  if (!form.totalPrice || Number(form.totalPrice) <= 0)
    errors.totalPrice = "Total price must be greater than 0.";
  if (!form.paymentMethod) errors.paymentMethod = "Payment method is required.";
  if (!form.status)        errors.status        = "Status is required.";
  return errors;
};

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">{label}</label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

const inputCls = "w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-green/50 appearance-none";

const BookingAdd = () => {
  const navigate = useNavigate();
  const { clients, units, addBooking } = useAdmin();

  const { form, set, blur, err, handleSubmit } = useForm(INITIAL_FORM, validate);

  const onSuccess = (data) => {
    addBooking({ ...data, totalPrice: Number(data.totalPrice) });
    navigate("/admin/bookings");
  };

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/bookings")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">New Booking</h2>
          <p className="text-gray text-sm">Fill in the details to create a new booking.</p>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6">
        <form onSubmit={handleSubmit(onSuccess)} className="space-y-5" noValidate>

          <Field label="Customer *" error={err("customerId")}>
            <select
              value={form.customerId}
              onChange={(e) => {
                const client = clients.find((c) => c.id == e.target.value);
                set("customerId", e.target.value);
                if (client) set("customerName", client.name);
              }}
              onBlur={() => blur("customerId")}
              className={inputCls}
            >
              <option value="">Select customer</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>

          <Field label="Vehicle *" error={err("carId")}>
            <select
              value={form.carId}
              onChange={(e) => {
                const unit = units.find((u) => String(u.id) === e.target.value);
                set("carId", e.target.value);
                if (unit) set("carName", unit.name);
              }}
              onBlur={() => blur("carId")}
              className={inputCls}
            >
              <option value="">Select vehicle</option>
              {units.map((u) => <option key={u.id} value={u.id}>{u.name} — ${u.price}/day</option>)}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date *" error={err("startDate")}>
              <input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} onBlur={() => blur("startDate")} className={inputCls} />
            </Field>
            <Field label="End Date *" error={err("endDate")}>
              <input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} onBlur={() => blur("endDate")} className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Total Price ($) *" error={err("totalPrice")}>
              <input type="number" min="0" placeholder="0" value={form.totalPrice} onChange={(e) => set("totalPrice", e.target.value)} onBlur={() => blur("totalPrice")} className={inputCls} />
            </Field>
            <Field label="Payment Method *" error={err("paymentMethod")}>
              <select value={form.paymentMethod} onChange={(e) => set("paymentMethod", e.target.value)} onBlur={() => blur("paymentMethod")} className={inputCls}>
                {PAYMENT_OPTIONS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Status *" error={err("status")}>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} onBlur={() => blur("status")} className={inputCls}>
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate("/admin/bookings")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-green hover:bg-darkGreen text-black text-sm font-bold transition-colors">
              Create Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingAdd;
