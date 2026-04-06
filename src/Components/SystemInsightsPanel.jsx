import { useState, useEffect } from "react";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  Loader2,
  CheckCircle,
  Calendar,
  Users,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Clock,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Brain,
  Stethoscope,
  Home,
  GraduationCap,
  Plane,
  PartyPopper,
  Briefcase,
  UserCircle,
  HelpCircle,
} from "lucide-react";
import { getLeaveInsights } from "../utils/GETLeaveInsights";
import { getSystemInsights } from "../utils/GETSystemInsights";

/* ── Reason → Icon map ──────────────────────────────────────────────────── */
const reasonIconMap = {
  "Medical / Health": Stethoscope,
  "Family Emergency": Home,
  Academic: GraduationCap,
  Travel: Plane,
  "Festival / Holiday": PartyPopper,
  "Placement / Internship": Briefcase,
  Personal: UserCircle,
  Other: HelpCircle,
};

/* ── Color palette for reasons ──────────────────────────────────────────── */
const reasonColors = [
  { bar: "bg-rose-500", text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", glow: "shadow-rose-500/10" },
  { bar: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "shadow-amber-500/10" },
  { bar: "bg-sky-500", text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", glow: "shadow-sky-500/10" },
  { bar: "bg-purple-500", text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", glow: "shadow-purple-500/10" },
  { bar: "bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "shadow-emerald-500/10" },
  { bar: "bg-indigo-500", text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", glow: "shadow-indigo-500/10" },
  { bar: "bg-pink-500", text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", glow: "shadow-pink-500/10" },
  { bar: "bg-teal-500", text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20", glow: "shadow-teal-500/10" },
];

/* ── Month formatter ────────────────────────────────────────────────────── */
const formatMonth = (ym) => {
  if (!ym) return "—";
  const [y, m] = ym.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m, 10) - 1] || m} '${y?.slice(2)}`;
};

/**
 * SystemInsightsPanel — Shows REAL leave data with optional AI interpretation.
 */
const SystemInsightsPanel = ({ token, analyticsData, role }) => {
  const [insights, setInsights] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);

  /* ── Fetch hard data ──────────────────────────────────────────────────── */
  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getLeaveInsights(token);
      if (res && !res.error) {
        setInsights(res);
      } else {
        setError(res?.error || "Failed to load leave insights data.");
      }
    } catch {
      setError("Network error fetching insights.");
    }
    setLoading(false);
  };

  /* ── Fetch AI analysis (lazy, on demand) ──────────────────────────────── */
  const fetchAI = async () => {
    if (!analyticsData || Object.keys(analyticsData).length === 0) return;
    setAiLoading(true);
    const res = await getSystemInsights(analyticsData, token);
    if (res && !res.error) setAiData(res);
    setAiLoading(false);
  };

  const toggleAI = () => {
    if (!aiOpen && !aiData && !aiLoading) fetchAI();
    setAiOpen(!aiOpen);
  };

  useEffect(() => {
    if (token) fetchInsights();
  }, [token]);

  /* ── Compute derived values ───────────────────────────────────────────── */
  const maxReasonCount = insights?.topReasons?.[0]?.count || 1;
  const maxMonthTotal = insights?.monthlyStats ? Math.max(...insights.monthlyStats.map((m) => m.total), 1) : 1;
  const maxPeakDay = insights?.peakDays?.[0]?.count || 1;

  return (
    <div className="mt-16 bg-[#0B0F19]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-[0_0_80px_rgba(30,58,138,0.1)] group/main mx-auto max-w-7xl transition-all duration-700">
      {/* Mesh Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none group-hover/main:bg-indigo-500/8 transition-colors duration-1000" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none group-hover/main:bg-purple-500/8 transition-colors duration-1000" />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="relative z-20 px-10 py-8 border-b border-white/[0.06] flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
            <BarChart3 size={28} className="text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="font-growmajour text-2xl md:text-3xl text-white tracking-tight drop-shadow-sm">Leave Intelligence</h2>
              <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-none">Live Data</span>
              </div>
            </div>
            <p className="text-white/30 font-mooxy text-[11px] uppercase tracking-[0.25em] pl-0.5">
              Role: <span className="text-white/60">{role || "Administrator"}</span> · Real-Time Analytics
            </p>
          </div>
        </div>

        <button
          onClick={fetchInsights}
          disabled={loading}
          className="relative group/btn px-8 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-[11px] font-bold font-mooxy uppercase tracking-widest transition-all hover:border-white/20 active:scale-95 disabled:opacity-40 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
          <div className="relative z-10 flex items-center justify-center gap-3">
            {loading ? (
              <Loader2 size={16} className="animate-spin text-indigo-400" />
            ) : (
              <RefreshCw size={16} className="text-white/50 group-hover/btn:rotate-180 transition-transform duration-700" />
            )}
            <span>Refresh Data</span>
          </div>
        </button>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 p-10 min-h-[400px]">
        {loading && !insights ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-indigo-500/10 animate-[spin_3s_linear_infinite] border-t-indigo-500/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 size={32} className="text-indigo-400/40 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-white font-mooxy text-[13px] font-bold tracking-[0.2em] uppercase">Loading Leave Data</p>
              <p className="text-white/20 font-mooxy text-[10px] italic">Aggregating institutional records...</p>
            </div>
          </div>
        ) : error && !insights ? (
          <div className="py-24 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <AlertTriangle size={24} className="text-rose-400" />
            </div>
            <p className="text-white/50 font-mooxy text-[13px] text-center max-w-sm leading-relaxed">{error}</p>
            <button onClick={fetchInsights} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-[11px] font-bold font-mooxy uppercase tracking-wider hover:text-white hover:bg-white/10 transition-all">
              Retry
            </button>
          </div>
        ) : insights ? (
          <div className="space-y-10 animate-in fade-in zoom-in-95 duration-1000 ease-out">

            {/* ── ROW 1: Status Overview Cards ───────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { label: "Total Leaves", value: insights.statusStats?.total || 0, color: "indigo", icon: Calendar },
                { label: "Approved", value: insights.statusStats?.approved || 0, color: "emerald", icon: CheckCircle },
                { label: "Rejected", value: insights.statusStats?.rejected || 0, color: "rose", icon: AlertTriangle },
                { label: "Pending", value: insights.statusStats?.pending || 0, color: "amber", icon: Clock },
              ].map((card, i) => (
                <div key={i} className={`relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-[1.5rem] p-6 group hover:bg-white/[0.05] transition-all duration-500`}>
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-${card.color}-500/10 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative z-10">
                    <div className={`w-10 h-10 rounded-xl bg-${card.color}-500/10 border border-${card.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <card.icon size={18} className={`text-${card.color}-400`} />
                    </div>
                    <p className={`font-growmajour text-3xl text-${card.color}-300 tabular-nums mb-1`}>{card.value}</p>
                    <p className="text-white/30 font-mooxy text-[10px] uppercase tracking-widest">{card.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ROW 2: Approval / Rejection Rates ──────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 flex items-center gap-8">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray={`${insights.statusStats?.approvalRate || 0} ${100 - (insights.statusStats?.approvalRate || 0)}`} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-emerald-400 font-growmajour text-xl">{insights.statusStats?.approvalRate || 0}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-white/20 font-bold text-[9px] uppercase tracking-[0.3em] mb-1">Approval Rate</p>
                  <p className="text-white/60 font-mooxy text-sm leading-relaxed">
                    {insights.statusStats?.approved || 0} out of {(insights.statusStats?.approved || 0) + (insights.statusStats?.rejected || 0)} processed requests were approved.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 flex items-center gap-8">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F43F5E" strokeWidth="3" strokeDasharray={`${insights.statusStats?.rejectionRate || 0} ${100 - (insights.statusStats?.rejectionRate || 0)}`} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-rose-400 font-growmajour text-xl">{insights.statusStats?.rejectionRate || 0}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-white/20 font-bold text-[9px] uppercase tracking-[0.3em] mb-1">Rejection Rate</p>
                  <p className="text-white/60 font-mooxy text-sm leading-relaxed">
                    {insights.statusStats?.rejected || 0} out of {(insights.statusStats?.approved || 0) + (insights.statusStats?.rejected || 0)} processed requests were rejected.
                  </p>
                </div>
              </div>
            </div>

            {/* ── ROW 3: Top Leave Reasons + Monthly Stats ───────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

              {/* Top Leave Reasons */}
              <div className="xl:col-span-5 bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <PieChartIcon size={80} className="text-indigo-400" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <Target size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-60">Why People Apply Leave</h3>
                    <p className="text-white/20 font-mooxy text-[10px]">Top reasons categorized from all applications</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {insights.topReasons?.length > 0 ? insights.topReasons.map((r, i) => {
                    const color = reasonColors[i % reasonColors.length];
                    const Icon = reasonIconMap[r.reason] || HelpCircle;
                    return (
                      <div key={i} className="group/reason">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center`}>
                              <Icon size={13} className={color.text} />
                            </div>
                            <span className="text-white/70 text-[12px] font-mooxy font-semibold group-hover/reason:text-white transition-colors">{r.reason}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`${color.text} font-bold text-[11px] tabular-nums`}>{r.count}</span>
                            <span className="text-white/20 text-[10px] font-mooxy">({r.percentage}%)</span>
                          </div>
                        </div>
                        <div className="h-[5px] bg-white/[0.04] rounded-full overflow-hidden">
                          <div className={`h-full ${color.bar} rounded-full group-hover/reason:brightness-125 transition-all duration-700 ease-out`} style={{ width: `${Math.max((r.count / maxReasonCount) * 100, 4)}%` }} />
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="flex flex-col items-center py-8 gap-3 opacity-30">
                      <Target size={24} className="text-white" />
                      <p className="text-white font-mooxy text-xs">No leave data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Monthly Leave Stats */}
              <div className="xl:col-span-7 bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <BarChart3 size={80} className="text-sky-400" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                    <CalendarDays size={20} className="text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-60">Monthly Leave Stats</h3>
                    <p className="text-white/20 font-mooxy text-[10px]">Leave volume per month (last 6 months)</p>
                  </div>
                </div>

                {insights.monthlyStats?.length > 0 ? (
                  <div className="space-y-5">
                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 mb-2">
                      {[
                        { label: "Approved", color: "bg-emerald-500" },
                        { label: "Rejected", color: "bg-rose-500" },
                        { label: "Pending", color: "bg-amber-500" },
                        { label: "Forwarded", color: "bg-purple-500" },
                      ].map((l) => (
                        <div key={l.label} className="flex items-center gap-1.5">
                          <div className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />
                          <span className="text-white/30 font-mooxy text-[10px]">{l.label}</span>
                        </div>
                      ))}
                    </div>

                    {insights.monthlyStats.map((m, i) => (
                      <div key={i} className="group/month">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 font-mooxy text-[13px] font-bold tracking-wide min-w-[70px]">{formatMonth(m.month)}</span>
                          <span className="text-white/30 font-mooxy text-[11px] tabular-nums">{m.total} total</span>
                        </div>

                        {/* Stacked bar */}
                        <div className="h-[8px] bg-white/[0.04] rounded-full overflow-hidden flex">
                          {m.approved > 0 && (
                            <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${(m.approved / maxMonthTotal) * 100}%` }} title={`Approved: ${m.approved}`} />
                          )}
                          {m.rejected > 0 && (
                            <div className="h-full bg-rose-500 transition-all duration-700" style={{ width: `${(m.rejected / maxMonthTotal) * 100}%` }} title={`Rejected: ${m.rejected}`} />
                          )}
                          {m.pending > 0 && (
                            <div className="h-full bg-amber-500 transition-all duration-700" style={{ width: `${(m.pending / maxMonthTotal) * 100}%` }} title={`Pending: ${m.pending}`} />
                          )}
                          {m.forwarded > 0 && (
                            <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${(m.forwarded / maxMonthTotal) * 100}%` }} title={`Forwarded: ${m.forwarded}`} />
                          )}
                        </div>

                        {/* Breakdown numbers */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                          {m.approved > 0 && <span className="text-emerald-400/60 font-mooxy text-[10px]">{m.approved} approved</span>}
                          {m.rejected > 0 && <span className="text-rose-400/60 font-mooxy text-[10px]">{m.rejected} rejected</span>}
                          {m.pending > 0 && <span className="text-amber-400/60 font-mooxy text-[10px]">{m.pending} pending</span>}
                          {m.forwarded > 0 && <span className="text-purple-400/60 font-mooxy text-[10px]">{m.forwarded} forwarded</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-10 gap-3 opacity-30">
                    <CalendarDays size={24} className="text-white" />
                    <p className="text-white font-mooxy text-xs">No monthly data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── ROW 4: Peak Days + Leave Split ─────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Peak Leave Days */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <TrendingUp size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-60">Peak Leave Days</h3>
                    <p className="text-white/20 font-mooxy text-[10px]">Which days of the week get most leave requests</p>
                  </div>
                </div>

                {insights.peakDays?.length > 0 ? (
                  <div className="flex items-end gap-3 h-40">
                    {/* Sort to Mon-Sun order for display */}
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName) => {
                      const dayData = insights.peakDays.find((d) => d.day === dayName);
                      const count = dayData?.count || 0;
                      const heightPct = maxPeakDay > 0 ? Math.max((count / maxPeakDay) * 100, 4) : 4;
                      const isHighest = count === maxPeakDay && count > 0;
                      return (
                        <div key={dayName} className="flex-1 flex flex-col items-center gap-2 group/day">
                          <span className={`font-mooxy text-[10px] tabular-nums transition-colors ${isHighest ? "text-amber-400 font-bold" : "text-white/30"}`}>
                            {count}
                          </span>
                          <div className="w-full relative">
                            <div
                              className={`w-full rounded-t-lg transition-all duration-700 ${isHighest ? "bg-gradient-to-t from-amber-500 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]" : "bg-white/10 group-hover/day:bg-white/20"}`}
                              style={{ height: `${heightPct}px`, minHeight: "4px" }}
                            />
                          </div>
                          <span className={`font-mooxy text-[10px] uppercase tracking-wider ${isHighest ? "text-amber-400 font-bold" : "text-white/40"}`}>
                            {dayName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 gap-3 opacity-30">
                    <TrendingUp size={24} className="text-white" />
                    <p className="text-white font-mooxy text-xs">No peak day data</p>
                  </div>
                )}
              </div>

              {/* Student vs Admin Leave Split */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <Users size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-60">Leave Distribution</h3>
                    <p className="text-white/20 font-mooxy text-[10px]">Student vs Admin/Faculty leaves</p>
                  </div>
                </div>

                {insights.leaveSplit?.length > 0 ? (
                  <div className="space-y-6">
                    {insights.leaveSplit.map((item, i) => {
                      const totalSplit = insights.leaveSplit.reduce((s, x) => s + x.count, 0) || 1;
                      const pct = Math.round((item.count / totalSplit) * 100);
                      const isStudent = i === 0;
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/70 font-mooxy text-[12px] font-semibold">{item.type}</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-[13px] tabular-nums ${isStudent ? "text-sky-400" : "text-purple-400"}`}>{item.count}</span>
                              <span className="text-white/20 text-[10px] font-mooxy">({pct}%)</span>
                            </div>
                          </div>
                          <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${isStudent ? "bg-gradient-to-r from-sky-500 to-sky-400" : "bg-gradient-to-r from-purple-500 to-purple-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* Total */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-white/30 font-mooxy text-[10px] uppercase tracking-widest">Combined Total</span>
                      <span className="text-white font-growmajour text-2xl">{insights.leaveSplit.reduce((s, x) => s + x.count, 0)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 gap-3 opacity-30">
                    <Users size={24} className="text-white" />
                    <p className="text-white font-mooxy text-xs">No split data</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── AI Analysis (Collapsible) ──────────────────────────────── */}
            <div className="bg-white/[0.015] border border-white/[0.06] rounded-[2rem] overflow-hidden">
              <button
                onClick={toggleAI}
                className="w-full flex items-center justify-between px-8 py-6 hover:bg-white/[0.02] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                    <Brain size={20} className="text-violet-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold text-[12px] uppercase tracking-[0.15em]">AI Analysis & Recommendations</h3>
                    <p className="text-white/25 font-mooxy text-[10px]">AI-powered interpretation of the data above</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {aiLoading && <Loader2 size={14} className="animate-spin text-violet-400" />}
                  {aiOpen ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
                </div>
              </button>

              {aiOpen && (
                <div className="border-t border-white/[0.05] px-8 py-8">
                  {aiLoading && !aiData ? (
                    <div className="flex flex-col items-center py-12 gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-violet-500/10 animate-[spin_3s_linear_infinite] border-t-violet-500/60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles size={20} className="text-violet-400/40 animate-pulse" />
                        </div>
                      </div>
                      <p className="text-white/30 font-mooxy text-[11px] uppercase tracking-widest">AI is analyzing patterns...</p>
                    </div>
                  ) : aiData ? (
                    <div className="space-y-8">
                      {/* Executive Summary */}
                      {aiData.executiveSummary && (
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                          <div className="xl:col-span-4 flex items-center gap-4">
                            <div className={`relative flex items-center justify-center`}>
                              <div className={`absolute w-6 h-6 rounded-full animate-ping opacity-20 ${
                                aiData.executiveSummary.systemHealth === "GOOD" ? "bg-emerald-500" :
                                aiData.executiveSummary.systemHealth === "MODERATE" ? "bg-amber-500" : "bg-rose-500"
                              }`} />
                              <div className={`relative w-3.5 h-3.5 rounded-full border-2 border-white/20 shadow-xl ${
                                aiData.executiveSummary.systemHealth === "GOOD" ? "bg-emerald-400" :
                                aiData.executiveSummary.systemHealth === "MODERATE" ? "bg-amber-400" : "bg-rose-400"
                              }`} />
                            </div>
                            <div>
                              <p className="text-white/20 font-bold text-[9px] uppercase tracking-[0.3em]">System Health</p>
                              <p className={`font-mooxy font-black text-sm tracking-widest uppercase ${
                                aiData.executiveSummary.systemHealth === "GOOD" ? "text-emerald-400" :
                                aiData.executiveSummary.systemHealth === "MODERATE" ? "text-amber-400" : "text-rose-400"
                              }`}>{aiData.executiveSummary.systemHealth}</p>
                            </div>
                          </div>
                          <div className="xl:col-span-8">
                            <p className="text-white/70 font-mooxy text-sm leading-relaxed italic">"{aiData.executiveSummary.summary}"</p>
                          </div>
                        </div>
                      )}

                      {/* Trends + Alerts + Suggestions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Trends */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
                            <TrendingUp size={14} className="text-sky-400" />
                            <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Trends</p>
                          </div>
                          {aiData.trends?.map((t, i) => (
                            <div key={i} className="flex gap-3">
                              <div className="w-1 h-4 rounded-full bg-sky-500/30 mt-0.5" />
                              <p className="text-white/50 font-mooxy text-[12px] leading-relaxed">{t}</p>
                            </div>
                          ))}
                        </div>

                        {/* Alerts */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
                            <AlertTriangle size={14} className="text-rose-400" />
                            <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Alerts</p>
                          </div>
                          {aiData.alerts?.map((a, i) => (
                            <div key={i} className="bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                              <p className="text-rose-100/60 font-mooxy text-[11px] leading-relaxed">{a}</p>
                            </div>
                          ))}
                        </div>

                        {/* Suggestions */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
                            <Lightbulb size={14} className="text-amber-400" />
                            <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Suggestions</p>
                          </div>
                          {aiData.suggestions?.map((s, i) => (
                            <div key={i} className="flex gap-3">
                              <CheckCircle size={10} className="text-amber-400/40 mt-0.5 shrink-0" />
                              <p className="text-white/50 font-mooxy text-[12px] leading-relaxed">{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-8 gap-4 opacity-40">
                      <Brain size={24} className="text-white" />
                      <p className="text-white font-mooxy text-xs">AI analysis unavailable. Try refreshing.</p>
                      <button onClick={fetchAI} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold font-mooxy uppercase tracking-wider hover:text-white hover:bg-white/10 transition-all">
                        Retry AI Analysis
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Footer ─────────────────────────────────────────────────── */}
            <div className="pt-6 mb-2 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
              <div className="flex items-center gap-4">
                <div className="px-2 py-0.5 rounded border border-white/20 text-[9px] font-bold text-white uppercase tracking-tighter">LIVE</div>
                <p className="text-white/40 font-mooxy text-[10px] uppercase tracking-widest">Leave Intelligence · Real-Time Data</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-white/40" />
                  <span className="text-white/40 text-[10px] font-mooxy uppercase tracking-widest font-bold">Institutional Analytics</span>
                </div>
                <span className="text-white/20 text-[11px] font-growmajour font-black tracking-widest">v6.0</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 gap-8 animate-in fade-in duration-1000">
            <div className="w-16 h-16 rounded-full bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center animate-pulse">
              <BarChart3 size={32} className="text-indigo-400 opacity-30" />
            </div>
            <p className="text-white/20 font-mooxy text-[10px] uppercase tracking-[0.4em] font-bold">Waiting for Data Stream</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemInsightsPanel;
