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
  Clock,
  CalendarDays,
  Brain,
  Stethoscope,
  Home,
  GraduationCap,
  Plane,
  PartyPopper,
  Briefcase,
  UserCircle,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
} from "lucide-react";

const BASE_URL = "https://requesta-server-3.onrender.com";

/* ── Reason → Icon map ──────────────────────────────────────────────────── */
const reasonIconMap = {
  "Medical / Health": Stethoscope, "Family Emergency": Home,
  Academic: GraduationCap, Travel: Plane, "Festival / Holiday": PartyPopper,
  "Placement / Internship": Briefcase, Personal: UserCircle, Other: HelpCircle,
};

/* ── Color palette ──────────────────────────────────────────────────────── */
const reasonColors = [
  { bar: "bg-rose-500", text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { bar: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { bar: "bg-sky-500", text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  { bar: "bg-purple-500", text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { bar: "bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { bar: "bg-indigo-500", text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { bar: "bg-pink-500", text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  { bar: "bg-teal-500", text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
];

const formatMonth = (ym) => {
  if (!ym) return "—";
  const [y, m] = ym.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1] || m} '${y?.slice(2)}`;
};

/**
 * SystemInsightsPanel — AI-powered leave intelligence with real data backing.
 * The AI fetches real data server-side and interprets it.
 */
const SystemInsightsPanel = ({ token, role }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/ai/system-insights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("[SystemInsights] Error:", err.message);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchInsights();
  }, [token]);

  // Derived values from raw data
  const rawData = data?.rawData;
  const studentReasons = rawData?.studentLeaves?.reasonBreakdown || [];
  const studentMonthly = rawData?.studentLeaves?.monthlyStats || [];
  const studentStatus = rawData?.studentLeaves?.statusStats || {};
  const facultyData = rawData?.facultyLeaves || null;
  const deptAdminData = rawData?.deptAdminLeaves || null;
  const certData = rawData?.certificates || null;
  const maxReasonCount = studentReasons[0]?.count || 1;
  const maxMonthTotal = studentMonthly.length > 0 ? Math.max(...studentMonthly.map(m => m.total), 1) : 1;

  return (
    <div className="mt-8 md:mt-16 bg-[#0B0F19]/60 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative shadow-[0_0_80px_rgba(30,58,138,0.1)] group/main mx-auto max-w-7xl transition-all duration-700">
      {/* Mesh Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="relative z-20 px-6 md:px-10 py-6 md:py-8 border-b border-white/[0.06] flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[1.5rem] bg-gradient-to-tr from-violet-600/30 to-indigo-600/30 border border-white/10 flex items-center justify-center shadow-2xl relative group overflow-hidden">
            <Brain size={24} className="text-white relative z-10 md:size-[28px] drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-growmajour text-xl md:text-3xl text-white tracking-tight">Leave Intelligence</h2>
              <div className="px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">AI Powered</span>
              </div>
            </div>
            <p className="text-white/30 font-mooxy text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em]">
              Role: <span className="text-white/60">{role || "Admin"}</span> <span className="hidden sm:inline">· AI analyzes real leave data</span>
            </p>
          </div>
        </div>

        <button onClick={fetchInsights} disabled={loading}
          className="relative group/btn w-full lg:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-[10px] md:text-[11px] font-bold font-mooxy uppercase tracking-widest transition-all hover:border-white/20 active:scale-95 disabled:opacity-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
          <div className="relative z-10 flex items-center justify-center gap-3">
            {loading ? <Loader2 size={14} className="animate-spin text-violet-400" /> : <RefreshCw size={14} className="text-white/50 group-hover/btn:rotate-180 transition-transform duration-700" />}
            <span>{loading ? "Analyzing..." : "Analyze Leave Patterns"}</span>
          </div>
        </button>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 p-6 md:p-10 min-h-[400px]">
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-violet-500/10 animate-[spin_3s_linear_infinite] border-t-violet-500/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain size={32} className="text-violet-400/40 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-white font-mooxy text-[13px] font-bold tracking-[0.2em] uppercase">AI Analyzing Leave Data</p>
              <p className="text-white/20 font-mooxy text-[10px] italic">Interpreting patterns from real leave records...</p>
            </div>
          </div>
        ) : error && !data ? (
          <div className="py-24 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <AlertTriangle size={24} className="text-rose-400" />
            </div>
            <p className="text-white/50 font-mooxy text-[13px] text-center max-w-sm">{error}</p>
            <button onClick={fetchInsights} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-[11px] font-bold font-mooxy uppercase tracking-wider hover:text-white hover:bg-white/10 transition-all">Retry</button>
          </div>
        ) : data ? (
          <div className="space-y-10 animate-in fade-in zoom-in-95 duration-1000 ease-out">

            {/* ── Executive Summary ──────────────────────────────────────── */}
            {data.executiveSummary && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
                {/* Health Card */}
                <div className="xl:col-span-4 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] rounded-3xl md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 md:w-1.5 h-full ${
                    data.executiveSummary.systemHealth === "GOOD" ? "bg-emerald-500/40" :
                    data.executiveSummary.systemHealth === "MODERATE" ? "bg-amber-500/40" : "bg-rose-500/40"
                  }`} />
                  <div className="mb-4 md:mb-6 flex items-center gap-3">
                    <div className={`relative flex items-center justify-center`}>
                      <div className={`absolute w-6 h-6 rounded-full animate-ping opacity-20 ${
                        data.executiveSummary.systemHealth === "GOOD" ? "bg-emerald-500" :
                        data.executiveSummary.systemHealth === "MODERATE" ? "bg-amber-500" : "bg-rose-500"
                      }`} />
                      <div className={`relative w-3.5 h-3.5 rounded-full border-2 border-white/20 ${
                        data.executiveSummary.systemHealth === "GOOD" ? "bg-emerald-400" :
                        data.executiveSummary.systemHealth === "MODERATE" ? "bg-amber-400" : "bg-rose-400"
                      }`} />
                    </div>
                    <span className={`font-mooxy font-black text-xs md:text-sm tracking-widest uppercase ${
                      data.executiveSummary.systemHealth === "GOOD" ? "text-emerald-400" :
                      data.executiveSummary.systemHealth === "MODERATE" ? "text-amber-400" : "text-rose-400"
                    }`}>{data.executiveSummary.systemHealth}</span>
                  </div>
                  <h3 className="text-white font-growmajour text-xl md:text-2xl leading-tight mb-3">{data.executiveSummary.headline}</h3>
                  <p className="text-white/30 font-mooxy text-[9px] md:text-[11px] uppercase tracking-wider">AI-Generated Health Index</p>
                </div>

                {/* Summary + Risk + Action */}
                <div className="xl:col-span-8 bg-white/[0.02] border border-white/[0.06] rounded-3xl md:rounded-[2rem] p-6 md:p-10 flex flex-col justify-center space-y-6 md:space-y-8">
                  <div className="relative">
                    <Sparkles size={16} className="text-violet-400/30 absolute -top-4 -left-4" />
                    <p className="text-white/80 font-mooxy text-base md:text-lg leading-relaxed italic">"{data.executiveSummary.summary}"</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 pl-4 border-l border-rose-500/20">
                      <p className="text-rose-400/60 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.25em] flex items-center gap-2">
                        <ShieldAlert size={14} className="animate-pulse" /> Key Risk
                      </p>
                      <p className="text-white/70 font-mooxy text-xs md:text-sm leading-relaxed font-semibold">{data.executiveSummary.keyRisk}</p>
                    </div>
                    <div className="space-y-2 pl-4 border-l border-emerald-500/20">
                      <p className="text-emerald-400/60 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.25em] flex items-center gap-2">
                        <ShieldCheck size={14} /> Immediate Action
                      </p>
                      <p className="text-white/70 font-mooxy text-xs md:text-sm leading-relaxed font-semibold">{data.executiveSummary.immediateAction}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Leave Reason Insights (AI + Data) ─────────────────────── */}
            {data.leaveReasonInsights?.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl md:rounded-[2rem] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={80} className="text-indigo-400" /></div>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <Target size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs md:text-[13px] uppercase tracking-[0.15em]">Why People Apply Leave</h3>
                    <p className="text-white/25 font-mooxy text-[9px] md:text-[10px]">AI analysis of leave reasons with actual numbers</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {data.leaveReasonInsights.map((r, i) => {
                    const color = reasonColors[i % reasonColors.length];
                    const Icon = reasonIconMap[r.reason] || HelpCircle;
                    const barWidth = maxReasonCount > 0 ? Math.max((r.count / maxReasonCount) * 100, 4) : 4;
                    return (
                      <div key={i} className="group/reason">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center`}>
                              <Icon size={15} className={color.text} />
                            </div>
                            <div>
                              <span className="text-white/80 text-[13px] font-mooxy font-bold">{r.reason}</span>
                              <span className="text-white/25 text-[11px] font-mooxy ml-2">({r.count} leaves · {r.percentage}%)</span>
                            </div>
                          </div>
                        </div>
                        {/* Data bar */}
                        <div className="h-[5px] bg-white/[0.04] rounded-full overflow-hidden mb-2">
                          <div className={`h-full ${color.bar} rounded-full transition-all duration-700`} style={{ width: `${barWidth}%` }} />
                        </div>
                        {/* AI insight */}
                        <div className="flex gap-2 items-start ml-1 md:ml-11">
                          <MessageSquare size={10} className="text-violet-400/40 mt-0.5 shrink-0" />
                          <p className="text-white/40 font-mooxy text-[10px] md:text-[11px] leading-relaxed italic">{r.insight}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Monthly Insights (AI + Data) ──────────────────────────── */}
            {data.monthlyInsights?.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl md:rounded-[2rem] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><CalendarDays size={80} className="text-sky-400" /></div>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                    <CalendarDays size={18} className="text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs md:text-[13px] uppercase tracking-[0.15em]">Monthly Leave Trends</h3>
                    <p className="text-white/25 font-mooxy text-[9px] md:text-[10px]">AI interpretation of leave volume by month</p>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-5">
                  {data.monthlyInsights.map((m, i) => {
                    const matchingRaw = studentMonthly.find(s => s.month === m.month);
                    const total = matchingRaw?.total || m.total || 0;
                    const barWidth = maxMonthTotal > 0 ? Math.max((total / maxMonthTotal) * 100, 4) : 4;
                    return (
                      <div key={i} className="group/month">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-white/80 font-mooxy text-[13px] md:text-[14px] font-bold min-w-[60px] md:min-w-[70px] uppercase tracking-tighter sm:tracking-normal">{formatMonth(m.month)}</span>
                            <span className="text-sky-400 font-bold text-[11px] md:text-[12px] tabular-nums whitespace-nowrap">{total} {total === 1 ? "entry" : "entries"}</span>
                          </div>
                          {i > 0 && data.monthlyInsights[i - 1]?.total && (
                            <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                              {total > (data.monthlyInsights[i - 1].total || 0) ? (
                                <ArrowUpRight size={10} className="text-rose-400" />
                              ) : (
                                <ArrowDownRight size={10} className="text-emerald-400" />
                              )}
                              <span className="text-[8px] font-bold text-white/30 tracking-tighter">vs PREV</span>
                            </div>
                          )}
                        </div>
                        {/* Data bar with breakdown */}
                        <div className="h-[6px] md:h-[6px] bg-white/[0.04] rounded-full overflow-hidden flex mb-2">
                          {matchingRaw?.approved > 0 && (
                            <div className="h-full bg-emerald-500" style={{ width: `${(matchingRaw.approved / maxMonthTotal) * 100}%` }} />
                          )}
                          {matchingRaw?.rejected > 0 && (
                            <div className="h-full bg-rose-500" style={{ width: `${(matchingRaw.rejected / maxMonthTotal) * 100}%` }} />
                          )}
                          {matchingRaw?.pending > 0 && (
                            <div className="h-full bg-amber-500" style={{ width: `${(matchingRaw.pending / maxMonthTotal) * 100}%` }} />
                          )}
                          {!matchingRaw && (
                            <div className="h-full bg-sky-500/60" style={{ width: `${barWidth}%` }} />
                          )}
                        </div>
                        {/* AI insight for this month */}
                        <div className="flex gap-2 items-start mt-2">
                          <MessageSquare size={10} className="text-violet-400/40 mt-0.5 shrink-0" />
                          <p className="text-white/40 font-mooxy text-[10px] md:text-[11px] leading-relaxed italic">{m.insight}</p>
                        </div>
                      </div>
                    );
                  })}
                  {/* Legend */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 border-t border-white/[0.05]">
                    {[{ label: "Approved", color: "bg-emerald-500" }, { label: "Rejected", color: "bg-rose-500" }, { label: "Pending", color: "bg-amber-500" }].map(l => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-[2px] ${l.color}`} />
                        <span className="text-white/25 font-mooxy text-[9px] md:text-[10px]">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Faculty Comparison (DeptAdmin + SuperAdmin) ────────────── */}
            {data.facultyComparison && (
              <div className="bg-gradient-to-br from-purple-500/[0.03] to-transparent border border-purple-500/[0.1] rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <Users size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[13px] uppercase tracking-[0.15em]">Student vs Faculty Comparison</h3>
                    <p className="text-white/25 font-mooxy text-[10px]">AI comparison of leave patterns across roles</p>
                  </div>
                </div>
                <p className="text-white/60 font-mooxy text-sm leading-relaxed italic pl-4 border-l-2 border-purple-500/20">
                  "{data.facultyComparison}"
                </p>

                {/* Faculty & Admin data distributions if available */}
                {(facultyData?.leaveTypes?.length > 0 || deptAdminData?.leaveTypes?.length > 0) && (
                  <div className="mt-8 space-y-6">
                    {facultyData?.leaveTypes?.length > 0 && (
                      <div>
                        <p className="text-white/40 font-mooxy text-xs uppercase tracking-widest mb-3">Faculty Leaves</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {facultyData.leaveTypes.map((ft, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
                              <p className="text-purple-400 font-growmajour text-2xl mb-1">{ft.count}</p>
                              <p className="text-white/30 font-mooxy text-[10px] uppercase tracking-wider">{ft.type || "Other"}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {deptAdminData?.leaveTypes?.length > 0 && (
                      <div className="pt-4 border-t border-white/[0.05]">
                        <p className="text-white/40 font-mooxy text-xs uppercase tracking-widest mb-3">Admin Leaves</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {deptAdminData.leaveTypes.map((dt, i) => (
                            <div key={i} className="bg-amber-500/[0.03] border border-amber-500/[0.1] rounded-xl p-4 text-center">
                              <p className="text-amber-400 font-growmajour text-2xl mb-1">{dt.count}</p>
                              <p className="text-white/30 font-mooxy text-[10px] uppercase tracking-wider">{dt.type || "Other"}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Certificates (SuperAdmin) ────────────── */}
            {certData && (
              <div className="bg-gradient-to-br from-emerald-500/[0.03] to-transparent border border-emerald-500/[0.1] rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <ShieldCheck size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[13px] uppercase tracking-[0.15em]">Institutional Certificates</h3>
                    <p className="text-white/25 font-mooxy text-[10px]">Processing pipelines and categorical volume</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {certData.typesBreakdown?.map((ct, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
                      <p className="text-emerald-400 font-growmajour text-2xl mb-1">{ct.count}</p>
                      <p className="text-white/30 font-mooxy text-[10px] uppercase tracking-wider">{ct.type}</p>
                    </div>
                  ))}
                  
                  {certData.statusStats && (
                    <div className="bg-amber-500/[0.03] border border-amber-500/20 rounded-xl p-4 text-center flex flex-col justify-center">
                      <p className="text-amber-400 font-growmajour text-xl mb-1">{certData.statusStats.pending}</p>
                      <p className="text-white/30 font-mooxy text-[10px] uppercase tracking-wider">Total Pending</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Alerts + Recommendations ───────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Alerts */}
              <div className="bg-white/[0.015] border border-white/[0.05] rounded-[2rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><AlertTriangle size={80} className="text-rose-400" /></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-rose-400/10 flex items-center justify-center border border-rose-400/20">
                    <AlertTriangle size={20} className="text-rose-400" />
                  </div>
                  <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-60">Alerts</h3>
                </div>
                <div className="space-y-4">
                  {data.alerts?.length > 0 ? data.alerts.map((a, i) => (
                    <div key={i} className="bg-white/[0.03] hover:bg-rose-500/5 p-4 rounded-2xl border border-white/[0.06] hover:border-rose-500/20 transition-all">
                      <div className="flex gap-3">
                        <Activity size={12} className="text-rose-400/40 mt-0.5 shrink-0" />
                        <p className="text-rose-100/70 font-mooxy text-[12px] leading-relaxed">{a}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-white/20 font-mooxy text-xs text-center py-4">No alerts at this time</p>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white/[0.015] border border-white/[0.05] rounded-[2rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Lightbulb size={80} className="text-amber-400" /></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20">
                    <Lightbulb size={20} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-60">Recommendations</h3>
                </div>
                <div className="space-y-4">
                  {data.recommendations?.length > 0 ? data.recommendations.map((s, i) => (
                    <div key={i} className="flex gap-3 group/item">
                      <div className="w-6 h-6 rounded-lg bg-amber-400/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-400/10 transition-colors">
                        <CheckCircle size={10} className="text-amber-400/40" />
                      </div>
                      <p className="text-white/60 font-mooxy text-[12px] leading-relaxed group-hover/item:text-white/80 transition-colors">{s}</p>
                    </div>
                  )) : (
                    <p className="text-white/20 font-mooxy text-xs text-center py-4">No recommendations</p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Footer ─────────────────────────────────────────────────── */}
            <div className="pt-6 mb-2 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
              <div className="flex items-center gap-4">
                <div className="px-2 py-0.5 rounded border border-violet-500/30 text-[9px] font-bold text-violet-400 uppercase tracking-tighter">AI</div>
                <p className="text-white/40 font-mooxy text-[10px] uppercase tracking-widest">Leave Intelligence · Role-Based Analysis</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Brain size={12} className="text-white/40" />
                  <span className="text-white/40 text-[10px] font-mooxy uppercase tracking-widest font-bold">AI-Powered Insights</span>
                </div>
                <span className="text-white/20 text-[11px] font-growmajour font-black tracking-widest">v7.0</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 gap-8 animate-in fade-in duration-1000">
            <div className="w-16 h-16 rounded-full bg-violet-500/5 border border-violet-500/10 flex items-center justify-center animate-pulse">
              <Brain size={32} className="text-violet-400 opacity-30" />
            </div>
            <p className="text-white/20 font-mooxy text-[10px] uppercase tracking-[0.4em] font-bold">Waiting for Data Stream</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemInsightsPanel;
