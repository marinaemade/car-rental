import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../../context/AdminContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const validate = (form) => {
  const e = {};
  if (!form.description || form.description.trim().length < 3) e.description = "Description must be at least 3 characters.";
  if (!form.category) e.category = "Category is required.";
  if (!form.amount || Number(form.amount) <= 0) e.amount = "Amount must be greater than 0.";
  if (!form.date) e.date = "Date is required.";
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

const ExpenseAdd = () => {
  const navigate = useNavigate();
  const { addExpense } = useAdmin();

  const [form, setForm]       = useState({ description: "", category: "Maintenance", amount: "", date: "" });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const set  = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const blur = (k) => { setTouched((p) => ({ ...p, [k]: true })); setErrors(validate(form)); };
  const err  = (k) => touched[k] && errors[k];

  const submit = (e) => {
    e.preventDefault();
    setTouched({ description: true, category: true, amount: true, date: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    addExpense({ ...form, amount: Number(form.amount) });
    navigate("/admin/financials/expenses");
  };

  return (
    <div className="py-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/financials/expenses")} className="p-2 rounded-lg border border-white/10 text-gray hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Log Expense</h2>
          <p className="text-gray text-sm">Record a new company expenditure.</p>
        </div>
      </div>

      <div className="bg-surface border border-white/10 rounded-xl p-6">
        <form onSubmit={submit} className="space-y-5" noValidate>

          <Field label="Description *" error={err("description")}>
            <input placeholder="e.g. Office Supplies" value={form.description} onChange={(e) => set("description", e.target.value)} onBlur={() => blur("description")} className={cls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category *" error={err("category")}>
              <select value={form.category} onChange={(e) => set("category", e.target.value)} onBlur={() => blur("category")} className={cls}>
                {["Maintenance", "Salaries", "Utilities", "Marketing", "Other"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Amount ($) *" error={err("amount")}>
              <input type="number" min="0" placeholder="0" value={form.amount} onChange={(e) => set("amount", e.target.value)} onBlur={() => blur("amount")} className={cls} />
            </Field>
          </div>

          <Field label="Date *" error={err("date")}>
            <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} onBlur={() => blur("date")} className={cls} />
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate("/admin/financials/expenses")} className="flex-1 py-3 rounded-xl border border-white/10 text-gray hover:text-white text-sm font-medium transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-green hover:bg-darkGreen text-black text-sm font-bold transition-colors">Log Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseAdd;
