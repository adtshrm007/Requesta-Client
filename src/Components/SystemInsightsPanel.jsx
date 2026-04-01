import { useState, useEffect } from "react";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  Loader2,
  ArrowRight,
  CheckCircle,
  Clock,
  Calendar,
  Users,
  Search,
  Zap
} from "lucide-react";
import { getSystemInsights } from "../utils/GETSystemInsights";

/**
 * SystemInsightsPanel — production-grade role-based insights interpretation.
 */
const SystemInsightsPanel = ({ token, analyticsData, role }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    if (!analyticsData || Object.keys(analyticsData).length === 0) return;
    setLoading(true);
    setError(null);
    const res = await getSystemInsights(analyticsData, token);
    
    if (res?.error) {
      setError(res.error);
    } else if (!res) {
      setError("Failed to interpret analytics data. Please retry.");
    } else {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (analyticsData && token) fetchInsights();
  }, [token, analyticsData]);

  return (
    <div className="mt-12 bg-[#0D1117] border border-white/5 rounded-[2rem] overflow-hidden relative shadow-2xl">
      {/* Glossy Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent px-8 py-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-inner group overflow-hidden relative">
            <div className="absolute inset-0 bg-indigo-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Zap size={24} className="text-indigo-400 relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
               <h2 className="font-growmajour text-2xl text-white tracking-tight">AI Decision Intelligence</h2>
               <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Live Audit</span>
            </div>
            <p className="text-white/40 font-mooxy text-xs mt-0.5 uppercase tracking-[0.2em]">
               Role: {role || "Institutional Admin"} · Interpretive Layer
            </p>
          </div>
        </div>

        <button
          onClick={fetchInsights}
          disabled={loading || !analyticsData}
          className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold font-mooxy transition-all disabled:opacity-50 group active:scale-95"
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin text-indigo-400" />
          ) : (
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
          )}
          Re-Analyze Patterns
        </button>
      </div>

      <div className="p-8 relative z-10 min-h-[300px]">
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-pulse">
            <div className="w-20 h-20 rounded-full border-t-2 border-r-2 border-indigo-500/40 animate-spin flex items-center justify-center">
               <Sparkles size={32} className="text-indigo-500/20" />
            </div>
            <div className="text-center">
               <p className="text-white font-mooxy text-sm font-semibold tracking-wide uppercase">Executing Heuristic Analysis</p>
               <p className="text-white/20 font-mooxy text-[10px] mt-1 italic">Mapping anomalies & processing role logs...</p>
            </div>
          </div>
        ) : error && !data ? (
          <div className="py-20 flex flex-col items-center">
             <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400/80 font-mooxy text-sm flex items-center gap-3">
               <AlertTriangle size={18} /> {error}
             </div>
             <button onClick={fetchInsights} className="mt-4 text-indigo-400 text-xs font-bold font-mooxy hover:underline">Retry Connection</button>
          </div>
        ) : data ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Primary Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Trends */}
              <div className="bg-white/[0.01] border border-white/5 rounded-[1.5rem] p-6 hover:bg-white/[0.03] transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                    <TrendingUp size={18} className="text-sky-400" />
                  </div>
                  <h3 className="text-white font-mooxy font-bold text-xs uppercase tracking-[0.15em]">Detected Trends</h3>
                </div>
                <div className="space-y-4">
                  {data.trends?.map((t, i) => (
                    <div key={i} className="flex gap-3 group">
                      <ArrowRight size={14} className="text-sky-500/30 mt-0.5 group-hover:translate-x-1 transition-transform" />
                      <p className="text-white/60 font-mooxy text-[13px] leading-relaxed italic">"{t}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts - High Urgency */}
              <div className="bg-red-500/[0.02] border border-red-500/10 rounded-[1.5rem] p-6 hover:bg-red-500/[0.04] transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <AlertTriangle size={18} className="text-red-400" />
                  </div>
                  <h3 className="text-red-400 font-mooxy font-bold text-xs uppercase tracking-[0.15em]">System Alerts</h3>
                </div>
                <div className="space-y-4">
                  {data.alerts?.map((a, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-red-500/[0.05] border border-red-500/10">
                      <CheckCircle size={14} className="text-red-500/50 mt-0.5" />
                      <p className="text-red-200/70 font-mooxy text-[12px] leading-snug">{a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-amber-500/[0.02] border border-amber-500/10 rounded-[1.5rem] p-6 hover:bg-amber-500/[0.04] transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Lightbulb size={18} className="text-amber-400" />
                  </div>
                  <h3 className="text-amber-400 font-mooxy font-bold text-xs uppercase tracking-[0.15em]">Actionable Strategy</h3>
                </div>
                <div className="space-y-4">
                  {data.suggestions?.map((s, i) => (
                     <div key={i} className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-amber-500/30 mt-2 flex-shrink-0" />
                       <p className="text-white/60 font-mooxy text-[13px] leading-relaxed">{s}</p>
                     </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Analytics Interpretation Panel */}
            {data.advancedAnalytics && (
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                 <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                     <Search size={18} className="text-indigo-400" />
                   </div>
                   <h3 className="text-white font-growmajour text-lg tracking-wide">Advanced Interpretive Analytics</h3>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Top Reasons */}
                    <div className="space-y-5">
                       <p className="text-white/20 font-bold text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">Top Drivers</p>
                       <div className="space-y-3">
                          {data.advancedAnalytics.topLeaveReasons?.map((r, i) => (
                            <div key={i} className="flex items-center justify-between group">
                               <span className="text-white/60 text-xs font-mooxy truncate">{r.reason}</span>
                               <span className="text-indigo-400 font-bold text-xs tabular-nums bg-white/5 px-2 py-0.5 rounded-md min-w-[30px] text-center">{r.count}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Peak Dates */}
                    <div className="space-y-5">
                       <p className="text-white/20 font-bold text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">Load Spikes</p>
                       <div className="space-y-3">
                          {data.advancedAnalytics.peakDates?.map((d, i) => (
                            <div key={i} className="flex items-center gap-3">
                               <Calendar size={12} className="text-white/20" />
                               <span className="text-white/60 text-xs font-mooxy">{d.date}: <span className="text-white font-bold">{d.requests}</span> req</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Decision Time */}
                    <div className="space-y-5">
                       <p className="text-white/20 font-bold text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">Latency Analysis</p>
                       <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl text-center">
                          <p className="text-white font-growmajour text-2xl">{data.advancedAnalytics.averageDecisionTime}</p>
                          <p className="text-indigo-400/60 font-mooxy text-[10px] uppercase tracking-widest mt-1">Average S.L.A.</p>
                       </div>
                       <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                          <Clock size={12} className="text-white/20" />
                          <span className="text-white/40 text-[10px] font-mooxy leading-snug">Processing speed interpretated from log variance.</span>
                       </div>
                    </div>

                    {/* Admin Performance */}
                    <div className="space-y-5">
                       <p className="text-white/20 font-bold text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">Leaderboard Audit</p>
                       <div className="space-y-3">
                          {data.advancedAnalytics.adminPerformance?.map((p, i) => (
                            <div key={i} className="flex flex-col gap-1">
                               <div className="flex items-center justify-between">
                                  <span className="text-white/80 text-xs font-mooxy font-semibold">{p.admin}</span>
                                  <span className="text-indigo-400 text-[10px] font-bold">{p.avgTime}</span>
                               </div>
                               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-indigo-500/40 w-[60%]" />
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            )}
            
            {/* Meta Footer */}
            <div className="pt-6 border-t border-white/5 flex items-center justify-center">
               <p className="text-white/10 font-mooxy text-[10px] uppercase tracking-widest">
                  Secure Intelligence Cluster · Institutional Decision Engine v4.0
               </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
             <Zap size={48} className="text-indigo-500 mb-4" />
             <p className="text-white font-mooxy text-xs">Waiting for data stream...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemInsightsPanel;
