import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const CATEGORIES    = ["Sports", "Electric", "SUV", "Luxury", "Sedan", "Pickup"];
const TRANSMISSIONS = ["Automatic", "Manual", "CVT"];
const FUEL_TYPES    = ["Petrol", "Diesel", "Electric", "Hybrid"];
const STATUSES      = ["Available", "Rented", "Maintenance"];

const validate = (form) => {
  const e = {};
  if (!form.name || form.name.trim().length < 3) e.name = "At least 3 characters.";
  if (!form.type)  e.type  = "Required.";
  if (!form.price || Number(form.price) <= 0) e.price = "Must be > 0.";
  if (!form.specs.transmission) e.transmission = "Required.";
  if (!form.specs.seats || form.specs.seats < 2 || form.specs.seats > 12) e.seats = "Between 2 and 12.";
  if (!form.specs.fuel)   e.fuel   = "Required.";
  if (!form.status)       e.status = "Required.";
  if (form.image && !form.image.startsWith("http")) e.image = "Must start with http.";
  return e;
};

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray uppercase tracking-wider mb-2">{label}</label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

const cls = "w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-green/50 appearance-none";

const UnitEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { units, updateUnit } = useAdmin();
  const existing = units.find((u) => String(u.id) === id) || {};

  const [form, setForm] = useState({
    name: existing.name || "", type: existing.type || "Sedan",
    price: existing.price || "", image: existing.image || "",
    status: existing.status || "Available",
    specs: {
      transmission: existing.specs?.transmission || "Automatic",
      seats: existing.specs?.seats || 5,
      fuel:  existing.specs?.fuel  || "Petrol",
    },
  });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const set     = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const setSpec = (k, v) => setForm((p) => ({ ...p, specs: { ...p.specs, [k]: v } }));
  const blur    = (k) => { setTouched((p) => ({ ...p, [k]: true })); setErrors(validate(form)); };
  const err     = (k) => touched[k] && errors[k];

  const submit = (e) => {
    e.preventDefault();
    const allTouched = { name:true, type:true, price:true, transmission:true, seats:true, fuel:true, status:true, image:true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    updateUnit(id, { ...form, price: Number(form.price) });
    navigate("/admin/units");
  };

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/units")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Edit Unit</h2>
          <p className="text-gray text-sm">{existing.name || `Unit #${id}`}</p>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6">
        <form onSubmit={submit} className="space-y-5" noValidate>
          <Field label="Vehicle Name *" error={err("name")}>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} className={cls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category *" error={err("type")}>
              <select value={form.type} onChange={(e) => set("type", e.target.value)} onBlur={() => blur("type")} className={cls}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Daily Rate ($) *" error={err("price")}>
              <input type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} onBlur={() => blur("price")} className={cls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Transmission *" error={err("transmission")}>
              <select value={form.specs.transmission} onChange={(e) => setSpec("transmission", e.target.value)} onBlur={() => blur("transmission")} className={cls}>
                {TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Seats *" error={err("seats")}>
              <input type="number" min="2" max="12" value={form.specs.seats} onChange={(e) => setSpec("seats", Number(e.target.value))} onBlur={() => blur("seats")} className={cls} />
            </Field>
            <Field label="Fuel Type *" error={err("fuel")}>
              <select value={form.specs.fuel} onChange={(e) => setSpec("fuel", e.target.value)} onBlur={() => blur("fuel")} className={cls}>
                {FUEL_TYPES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Status *" error={err("status")}>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} onBlur={() => blur("status")} className={cls}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Image URL" error={err("image")}>
            <input placeholder="https://..." value={form.image} onChange={(e) => set("image", e.target.value)} onBlur={() => blur("image")} className={cls} />
            {form.image && !errors.image && (
              <img src={form.image} alt="preview" className="w-full h-36 object-cover rounded-xl border border-white/10 opacity-80 mt-2" onError={(e) => (e.target.style.display = "none")} />
            )}
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate("/admin/units")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-green hover:bg-darkGreen text-black text-sm font-bold transition-colors">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitEdit;
