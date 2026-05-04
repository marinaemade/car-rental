import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const validate = (form) => {
  const e = {};
  if (!form.name || form.name.trim().length < 3) e.name = "Full name must be at least 3 characters.";
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
  if (!form.phone || form.phone.trim().length < 7) e.phone = "Phone must be at least 7 characters.";
  if (!form.status) e.status = "Status is required.";
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

const ClientEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, updateClient } = useAdmin();

  const existing = clients.find((c) => c.id == id) || {};

  const [form, setForm]       = useState({ name: existing.name || "", email: existing.email || "", phone: existing.phone || "", address: existing.address || "", status: existing.status || "Active" });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const set  = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const blur = (k) => { setTouched((p) => ({ ...p, [k]: true })); setErrors(validate(form)); };
  const err  = (k) => touched[k] && errors[k];

  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, status: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    updateClient(id, form);
    navigate("/admin/clients");
  };

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/clients")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Edit Client</h2>
          <p className="text-gray text-sm font-mono">{id}</p>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6">
        <form onSubmit={submit} className="space-y-5" noValidate>
          <Field label="Full Name *" error={err("name")}>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} className={cls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Email *" error={err("email")}>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} className={cls} />
            </Field>
            <Field label="Phone *" error={err("phone")}>
              <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} onBlur={() => blur("phone")} className={cls} />
            </Field>
          </div>

          <Field label="Address">
            <input value={form.address} onChange={(e) => set("address", e.target.value)} className={cls} />
          </Field>

          <Field label="Status *" error={err("status")}>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} onBlur={() => blur("status")} className={cls}>
              {["Active", "Inactive", "Suspended"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate("/admin/clients")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-green hover:bg-darkGreen text-black text-sm font-bold transition-colors">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientEdit;
