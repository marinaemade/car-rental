import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import StatusBadge from "../../components/admin/StatusBadge";
import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  TruckIcon,
  CalendarDaysIcon,
  UsersIcon,
  EllipsisHorizontalIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const PIE_COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

const COLOR_MAP = {
  green:  { bg: "bg-green/10",       text: "text-green",       border: "border-green/20" },
  blue:   { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/20" },
  purple: { bg: "bg-purple-500/10",  text: "text-purple-400",  border: "border-purple-500/20" },
  amber:  { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/20" },
};

const KPICard = ({ title, value, trend, icon: Icon, color = "green" }) => {
  const c = COLOR_MAP[color];
  return (
    <div className={`bg-surface border ${c.border} rounded-xl p-5 flex flex-col justify-between`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${c.bg} border ${c.border}`}>
          <Icon className={`h-6 w-6 ${c.text}`} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        <ArrowTrendingUpIcon className="h-4 w-4 text-green" />
        <span className="font-semibold text-green">{trend}</span>
        <span className="text-gray/60 ml-1">vs last month</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { stats, bookings, loading } = useAdmin();
  const navigate = useNavigate();

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-3">
          <div className="h-10 w-10 rounded-full border-2 border-green border-t-transparent animate-spin mx-auto" />
          <p className="text-gray text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <p className="text-sm text-green font-semibold uppercase tracking-widest mb-1">Admin Dashboard</p>
          <h2 className="text-3xl font-bold text-white">Good day, Admin 👋</h2>
          <p className="text-gray mt-1">Here's what's happening with your rental business today.</p>
        </div>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="flex items-center gap-2 bg-green hover:bg-darkGreen text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
          New Booking <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Revenue"  value={`$${stats.totalRevenue.toLocaleString()}`} trend="+12.5%" icon={CurrencyDollarIcon} color="green" />
        <KPICard title="Active Rentals" value={`${stats.activeBookings} Units`}           trend="+5.2%"  icon={TruckIcon}           color="blue" />
        <KPICard title="Total Fleet"    value={`${stats.totalCars} Cars`}                 trend="+2.4%"  icon={CalendarDaysIcon}    color="purple" />
        <KPICard title="Clients"        value={stats.newCustomers}                        trend="+18.1%" icon={UsersIcon}           color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col bg-surface border border-white/10 rounded-xl p-5">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
              <p className="text-xs text-gray mt-0.5">Full year revenue summary</p>
            </div>
            <span className="text-xs bg-green/10 text-green border border-green/20 px-3 py-1 rounded-full font-medium">2026</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={stats.revenueByMonth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 11 }} tickFormatter={(v) => `$${v / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff15", borderRadius: "12px", color: "#fff" }} itemStyle={{ color: "#22c55e" }} formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col bg-surface border border-white/10 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Fleet Status</h3>
              <p className="text-xs text-gray mt-0.5">Vehicle availability</p>
            </div>
            <button className="text-gray hover:text-white transition-colors">
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={stats.fleetBreakdown} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                  {stats.fleetBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#ffffff15", borderRadius: "10px", color: "#fff" }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} formatter={(v) => <span className="text-gray text-xs ml-1">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-1">
              <p className="text-3xl font-bold text-white">{stats.totalCars}</p>
              <p className="text-xs text-gray uppercase tracking-wider">Total Vehicles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-surface border border-white/10 rounded-xl">
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Bookings</h3>
            <p className="text-xs text-gray mt-0.5">{bookings.length} total bookings</p>
          </div>
          <button onClick={() => navigate("/admin/bookings")} className="flex items-center gap-1.5 text-green text-sm font-semibold hover:underline">
            View All <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="border-b border-white/5 text-gray text-xs uppercase tracking-wider bg-black/20">
                {["Booking ID", "Customer", "Vehicle", "Amount", "Status"].map((h) => (
                  <th key={h} className="px-6 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentBookings.map((b) => (
                <tr key={b.id} onClick={() => navigate("/admin/bookings")} className="hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 text-xs font-mono text-gray">{b.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green/20 border border-green/20 flex items-center justify-center text-xs font-bold text-white group-hover:border-green transition-colors">
                        {b.customerName.charAt(0)}
                      </div>
                      <span className="text-sm text-white font-medium">{b.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray">{b.carName}</td>
                  <td className="px-6 py-4 text-sm text-white font-bold">${b.totalPrice.toLocaleString()}</td>
                  <td className="px-6 py-4"><StatusBadge status={b.status} type="pill" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
