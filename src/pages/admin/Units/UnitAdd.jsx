import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const CATEGORIES   = ["Sports", "Electric", "SUV", "Luxury", "Sedan", "Pickup"];
const TRANSMISSIONS = ["Automatic", "Manual", "CVT"];
const FUEL_TYPES   = ["Petrol", "Diesel", "Electric", "Hybrid"];
const STATUSES     = ["Available", "Rented", "Maintenance"];

const validate = (form) => {
  const errors = {};
  if (!form.name || form.name.trim().length < 3)        errors.name         = "Vehicle name must be at least 3 characters.";
  if (!form.type)                                        errors.type         = "Category is required.";
  if (!form.price || Number(form.price) <= 0)            errors.price        = "Daily rate must be greater than 0.";
  if (!form.specs.transmission)                          errors.transmission = "Transmission is required.";
  if (!form.specs.seats || form.specs.seats < 2 || form.specs.seats > 12)
    errors.seats = "Seats must be between 2 and 12.";
  if (!form.specs.fuel)                                  errors.fuel         = "Fuel type is required.";
  if (!form.status)                                      errors.status       = "Status is required.";
  if (form.image && !form.image.startsWith("http"))      errors.image        = "Image URL must start with http.";
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

const UnitAdd = () => {
  const navigate = useNavigate();
  const { addUnit } = useAdmin();

  const [form, setForm] = useState({
    name: "", type: "Sedan", price: "", image: "", status: "Available",
    specs: { transmission: "Automatic", seats: 5, fuel: "Petrol" },
  });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const set     = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const setSpec = (key, val) => setForm((p) => ({ ...p, specs: { ...p.specs, [key]: val } }));

  const handleBlur = (key) => {
    setTouched((p) => ({ ...p, [key]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, type: true, price: true, transmission: true, seats: true, fuel: true, status: true, image: true };
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    addUnit({ ...form, price: Number(form.price) });
    navigate("/admin/units");
  };

  const err = (key) => touched[key] && errors[key];

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/units")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Add New Unit</h2>
          <p className="text-gray text-sm">Add a new vehicle to the fleet.</p>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          <Field label="Vehicle Name *" error={err("name")}>
            <input placeholder="e.g. BMW M3" value={form.name} onChange={(e) => set("name", e.target.value)} onBlur={() => handleBlur("name")} className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category *" error={err("type")}>
              <select value={form.type} onChange={(e) => set("type", e.target.value)} onBlur={() => handleBlur("type")} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Daily Rate ($) *" error={err("price")}>
              <input type="number" min="0" placeholder="0" value={form.price} onChange={(e) => set("price", e.target.value)} onBlur={() => handleBlur("price")} className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Transmission *" error={err("transmission")}>
              <select value={form.specs.transmission} onChange={(e) => setSpec("transmission", e.target.value)} onBlur={() => handleBlur("transmission")} className={inputCls}>
                {TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Seats *" error={err("seats")}>
              <input type="number" min="2" max="12" value={form.specs.seats} onChange={(e) => setSpec("seats", Number(e.target.value))} onBlur={() => handleBlur("seats")} className={inputCls} />
            </Field>
            <Field label="Fuel Type *" error={err("fuel")}>
              <select value={form.specs.fuel} onChange={(e) => setSpec("fuel", e.target.value)} onBlur={() => handleBlur("fuel")} className={inputCls}>
                {FUEL_TYPES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Status *" error={err("status")}>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} onBlur={() => handleBlur("status")} className={inputCls}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Image URL" error={err("image")}>
            <input placeholder="https://..." value={form.image} onChange={(e) => set("image", e.target.value)} onBlur={() => handleBlur("image")} className={inputCls} />
            {form.image && !errors.image && (
              <img src={form.image} alt="preview" className="w-full h-36 object-cover rounded-xl border border-white/10 opacity-80 mt-2" onError={(e) => (e.target.style.display = "none")} />
            )}
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate("/admin/units")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-green hover:bg-darkGreen text-black text-sm font-bold transition-colors">Add Unit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitAdd;
