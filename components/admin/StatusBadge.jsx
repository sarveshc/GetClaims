// Reusable status badge for submissions
const STATUS_CONFIG = {
  new:          { label: "New",         bg: "#dbeafe", color: "#1d4ed8" },
  contacted:    { label: "Contacted",   bg: "#ffedd5", color: "#c2410c" },
  in_review:    { label: "In Review",   bg: "#fef9c3", color: "#854d0e" },
  accepted:     { label: "Accepted",    bg: "#ede9fe", color: "#6d28d9" },
  in_progress:  { label: "In Progress", bg: "#e0e7ff", color: "#3730a3" },
  resolved:     { label: "Resolved",    bg: "#dcfce7", color: "#15803d" },
  closed:       { label: "Closed",      bg: "#f3f4f6", color: "#4b5563" },
};

export default function StatusBadge({ status, size = "sm" }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  const fontSize = size === "lg" ? "13px" : "11px";
  const padding  = size === "lg" ? "5px 14px" : "3px 10px";

  return (
    <span style={{
      background:   cfg.bg,
      color:        cfg.color,
      fontSize,
      fontWeight:   700,
      padding,
      borderRadius: "20px",
      whiteSpace:   "nowrap",
      display:      "inline-block",
    }}>
      {cfg.label}
    </span>
  );
}

export { STATUS_CONFIG };
