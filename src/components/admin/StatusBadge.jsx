const getStyles = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("available") || s.includes("completed") || s.includes("active"))
    return { dot: "bg-green shadow-[0_0_8px_rgba(34,197,94,0.6)]", text: "text-green", bg: "bg-green/10 border-green/20" };
  if (s.includes("maintenance") || s.includes("cancelled") || s.includes("sick"))
    return { dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]", text: "text-red-500", bg: "bg-red-500/10 border-red-500/20" };
  if (s.includes("pending") || s.includes("half"))
    return { dot: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]", text: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" };
  return { dot: "bg-gray shadow-[0_0_8px_rgba(156,163,175,0.6)]", text: "text-gray", bg: "bg-gray/10 border-gray/20" };
};

const StatusBadge = ({ status, type = "dot", className = "" }) => {
  const styles = getStyles(status);

  if (type === "dot") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
        <span className={`text-sm font-medium ${styles.text}`}>{status}</span>
      </div>
    );
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles.bg} ${styles.text} ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
