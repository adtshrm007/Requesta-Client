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
  Zap,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Target
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
    <div className="mt-16 bg-[#0B0F19]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-[0_0_80px_rgba(30,58,138,0.1)] group/main mx-auto max-w-7xl transition-all duration-700">
      
      {/* Dynamic Mesh Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none group-hover/main:bg-indigo-500/8 transition-colors duration-1000" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none group-hover/main:bg-purple-500/8 transition-colors duration-1000" />

      {/* Glossy Interactive Header */}
      <div className="relative z-20 px-10 py-8 border-b border-white/[0.06] flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
            <Zap size={28} className="text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
            <div className="absolute -inset-1 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="font-growmajour text-2xl md:text-3xl text-white tracking-tight drop-shadow-sm">Decision Intelligence</h2>
              <div className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-none">Institutional Lab</span>
              </div>
            </div>
            <p className="text-white/30 font-mooxy text-[11px] uppercase tracking-[0.25em] pl-0.5">
              Role: <span className="text-white/60">{role || "Lead Administrator"}</span> · AI Pattern Recognition
            </p>
          </div>
        </div>

        <button
          onClick={fetchInsights}
          disabled={loading || !analyticsData}
          className="relative group/btn px-8 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-[11px] font-bold font-mooxy uppercase tracking-widest transition-all hover:border-white/20 active:scale-95 disabled:opacity-40 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
          <div className="relative z-10 flex items-center justify-center gap-3">
            {loading ? (
              <Loader2 size={16} className="animate-spin text-indigo-400" />
            ) : (
              <RefreshCw size={16} className="text-white/50 group-hover/btn:rotate-180 transition-transform duration-700" />
            )}
            <span>Analyze Workflow Pattern</span>
          </div>
        </button>
      </div>

      <div className="relative z-10 p-10 min-h-[400px]">
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-indigo-500/10 animate-[spin_3s_linear_infinite] border-t-indigo-500/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={32} className="text-indigo-400/40 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
               <p className="text-white font-mooxy text-[13px] font-bold tracking-[0.2em] uppercase">Processing Heuristics</p>
               <p className="text-white/20 font-mooxy text-[10px] italic">Calibrating institutional variance logs...</p>
            </div>
          </div>
        ) : error && !data ? (
          <div className="py-24 flex flex-col items-center gap-6">
             <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle size={24} className="text-rose-400" />
             </div>
             <p className="text-white/50 font-mooxy text-[13px] text-center max-w-sm leading-relaxed">
               {error}
             </p>
             <button onClick={fetchInsights} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-[11px] font-bold font-mooxy uppercase tracking-wider hover:text-white hover:bg-white/10 transition-all">Retry Synchronization</button>
          </div>
        ) : data ? (
          <div className="space-y-10 animate-in fade-in zoom-in-95 duration-1000 ease-out">
            
            {/* 🛡️ Executive Strategy Hub - Bento Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
               
               {/* Health Indicator Card */}
               <div className="xl:col-span-4 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] rounded-[2rem] p-8 flex flex-col justify-center relative group overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
                    data.executiveSummary.systemHealth === 'GOOD' ? 'bg-emerald-500/40' : 
                    data.executiveSummary.systemHealth === 'MODERATE' ? 'bg-amber-500/40' : 'bg-rose-500/40'
                  }`} />
                  
                  <div className="mb-8 flex items-center gap-4">
                    <div className="relative flex items-center justify-center">
                       <div className={`absolute w-6 h-6 rounded-full animate-ping opacity-20 ${
                         data.executiveSummary.systemHealth === 'GOOD' ? 'bg-emerald-500' : 
                         data.executiveSummary.systemHealth === 'MODERATE' ? 'bg-amber-500' : 'bg-rose-500'
                       }`} />
                       <div className={`relative w-3.5 h-3.5 rounded-full border-2 border-white/20 shadow-xl ${
                         data.executiveSummary.systemHealth === 'GOOD' ? 'bg-emerald-400 shadow-emerald-500/20' : 
                         data.executiveSummary.systemHealth === 'MODERATE' ? 'bg-amber-400 shadow-amber-500/20' : 'bg-rose-400 shadow-rose-500/20'
                       }`} />
                    </div>
                    <div>
                      <p className="text-white/20 font-bold text-[9px] uppercase tracking-[0.3em]">Institutional Pulse</p>
                      <h4 className={`font-mooxy font-black text-sm tracking-widest uppercase ${
                        data.executiveSummary.systemHealth === 'GOOD' ? 'text-emerald-400' : 
                        data.executiveSummary.systemHealth === 'MODERATE' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                         Health: {data.executiveSummary.systemHealth}
                      </h4>
                    </div>
                  </div>

                  <h3 className="text-white font-growmajour text-4xl leading-[1.1] mb-4">Strategic Overview</h3>
                  <p className="text-white/30 font-mooxy text-[12px] leading-relaxed uppercase tracking-wider">
                     Integrity Audit of institutional workflow distribution.
                  </p>
               </div>

               {/* Executive Summary Card */}
               <div className="xl:col-span-8 bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-10 flex flex-col justify-center relative group">
                  <div className="space-y-8">
                    <div className="relative">
                      <Sparkles size={16} className="text-indigo-400/30 absolute -top-4 -left-4" />
                      <p className="text-white/90 font-mooxy text-xl leading-relaxed italic font-medium tracking-tight">
                        "{data.executiveSummary.summary}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3 pl-4 border-l border-rose-500/20">
                        <p className="text-rose-400/60 font-bold text-[10px] uppercase tracking-[0.25em] flex items-center gap-2">
                           <ShieldAlert size={14} className="animate-pulse" /> Primary Criticality
                        </p>
                        <p className="text-white/70 font-mooxy text-sm leading-relaxed font-semibold">{data.executiveSummary.keyRisk}</p>
                      </div>

                      <div className="space-y-3 pl-4 border-l border-emerald-500/20">
                        <p className="text-emerald-400/60 font-bold text-[10px] uppercase tracking-[0.25em] flex items-center gap-2">
                           <ShieldCheck size={14} className="hover:rotate-12 transition-transform" /> Priority Action
                        </p>
                        <p className="text-white/70 font-mooxy text-sm leading-relaxed font-semibold">{data.executiveSummary.immediateAction}</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Core Metrics Visuals - Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Trends Card */}
              <div className="relative group bg-white/[0.015] border border-white/[0.05] rounded-[2rem] p-8 hover:bg-indigo-500/[0.02] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <TrendingUp size={80} className="text-sky-400" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform">
                    <TrendingUp size={20} className="text-sky-400" />
                  </div>
                  <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-40">Load Trends</h3>
                </div>
                <div className="space-y-6">
                  {data.trends?.map((t, i) => (
                    <div key={i} className="flex gap-4 group/item">
                      <div className="w-1 h-4 rounded-full bg-sky-500/20 mt-1" />
                      <p className="text-white/60 font-mooxy text-[13px] leading-relaxed italic group-hover/item:text-white/90 transition-colors">"{t}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts Card */}
              <div className="relative group bg-white/[0.015] border border-white/[0.05] rounded-[2rem] p-8 hover:bg-rose-500/[0.02] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <AlertTriangle size={80} className="text-rose-400" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-rose-400/10 flex items-center justify-center border border-rose-400/20 group-hover:scale-110 transition-transform">
                    <AlertTriangle size={20} className="text-rose-400" />
                  </div>
                  <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-40">System Alerts</h3>
                </div>
                <div className="space-y-4">
                  {data.alerts?.map((a, i) => (
                    <div key={i} className="group/item relative overflow-hidden bg-white/[0.03] hover:bg-rose-500/5 p-4 rounded-2xl border border-white/[0.06] hover:border-rose-500/20 transition-all duration-300">
                      <div className="flex gap-3 relative z-10">
                        <Activity size={12} className="text-rose-400/40 mt-0.5 shrink-0" />
                        <p className="text-rose-100/70 font-mooxy text-[12px] leading-relaxed group-hover/item:text-rose-100 transition-colors">{a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy Card */}
              <div className="relative group bg-white/[0.015] border border-white/[0.05] rounded-[2rem] p-8 hover:bg-amber-500/[0.02] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Lightbulb size={80} className="text-amber-400" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20 group-hover:scale-110 transition-transform">
                    <Lightbulb size={20} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] opacity-40">Strategy Layer</h3>
                </div>
                <div className="space-y-6">
                  {data.suggestions?.map((s, i) => (
                    <div key={i} className="flex gap-4 group/item">
                       <div className="w-6 h-6 rounded-lg bg-amber-400/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-400/10 transition-colors">
                          <CheckCircle size={10} className="text-amber-400/40" />
                       </div>
                       <p className="text-white/60 font-mooxy text-[13px] leading-relaxed group-hover/item:text-white/80 transition-colors">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Analytics Interpretation Panel */}
            {data.advancedAnalytics && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-[2.5rem] p-10 overflow-hidden relative group/layer">
                 {/* Internal Mesh Aura */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />
                 <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -mr-48 -mb-48 pointer-events-none" />

                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 relative z-10 gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-inner group-hover/layer:shadow-indigo-500/10 transition-all duration-700">
                        <Search size={20} className="text-indigo-400 group-hover/layer:scale-110 transition-transform" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-white font-growmajour text-2xl tracking-tight">Interpretive Analysis</h3>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Institutional SLM Layer</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8 bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl backdrop-blur-md">
                       <div className="text-center md:text-right">
                          <p className="text-white/20 font-bold text-[9px] uppercase tracking-widest mb-1">Global Approval</p>
                          <div className="flex items-center justify-center md:justify-end gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                             <p className="text-emerald-400 font-growmajour text-2xl leading-none">{data.advancedAnalytics.approvalRate || "0%"}</p>
                          </div>
                       </div>
                       <div className="w-px h-10 bg-white/[0.08]" />
                       <div className="text-center md:text-right">
                          <p className="text-white/20 font-bold text-[9px] uppercase tracking-widest mb-1">Global Rejection</p>
                          <div className="flex items-center justify-center md:justify-end gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.4)]" />
                             <p className="text-rose-400 font-growmajour text-2xl leading-none">{data.advancedAnalytics.rejectionRate || "0%"}</p>
                          </div>
                       </div>
                    </div>
                 </div>
  
                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 relative z-10">
                    {/* Top Reasons - Digital List */}
                    <div className="space-y-6">
                       <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                          <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Growth Drivers</p>
                          <Target size={12} className="text-white/20" />
                       </div>
                       <div className="space-y-4">
                          {data.advancedAnalytics.topLeaveReasons?.map((r, i) => (
                            <div key={i} className="flex flex-col gap-2 group/reason">
                               <div className="flex items-center justify-between">
                                 <span className="text-white/60 text-[11px] font-mooxy group-hover/reason:text-white transition-colors">{r.reason}</span>
                                 <span className="text-indigo-400 font-bold text-[11px] tabular-nums">{r.count}</span>
                               </div>
                               <div className="h-[2px] bg-white/[0.03] rounded-full overflow-hidden">
                                  <div className="h-full bg-indigo-500/40 rounded-full group-hover/reason:bg-indigo-500/60 transition-all duration-700" style={{ width: `${Math.min((r.count / 10) * 100, 100)}%` }} />
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Admin Benchmarks - High Density Leaderboard */}
                    <div className="space-y-6 lg:col-span-2">
                       <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                          <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest">Administrative Benchmarks</p>
                          <ShieldCheck size={12} className="text-white/20" />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {data.advancedAnalytics.adminPerformance?.map((adm, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 hover:border-indigo-500/20 transition-all duration-300">
                               <div className="flex items-center justify-between mb-3">
                                  <span className="text-white/80 text-[12px] font-bold font-mooxy truncate">{adm.admin}</span>
                                  <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                                     <span className="text-indigo-400 font-bold text-[10px] tabular-nums">{adm.approvalRate}</span>
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-gradient-to-r from-indigo-500/60 to-purple-500/60 rounded-full" style={{ width: adm.approvalRate }} />
                                  </div>
                                  <div className="flex items-center gap-2">
                                     <Clock size={10} className="text-white/20" />
                                     <span className="text-white/30 text-[10px] font-mooxy tracking-wider uppercase">Latency: <span className="text-white/60">{adm.avgTime}</span></span>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Meta Insights - Dual Widget Stack */}
                    <div className="space-y-8">
                       {/* Latency Widget */}
                       <div className="space-y-4">
                          <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest border-b border-white/[0.06] pb-3">Latency Audit</p>
                          <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 p-6 rounded-[2rem] text-center relative overflow-hidden group/latency">
                             <div className="absolute -top-4 -right-4 opacity-5 group-hover/latency:scale-110 transition-transform duration-700">
                                <Clock size={80} className="text-indigo-400" />
                             </div>
                             <p className="text-white font-growmajour text-4xl mb-1 relative z-10">{data.advancedAnalytics.averageDecisionTime}</p>
                             <p className="text-indigo-400/60 font-bold text-[9px] uppercase tracking-[0.2em] relative z-10 translate-y-1">Mean Institutional S.L.A.</p>
                          </div>
                       </div>

                       {/* Anomaly Widget */}
                       <div className="space-y-4">
                          <p className="text-amber-400/40 font-bold text-[10px] uppercase tracking-widest border-b border-white/[0.06] pb-3">Anomalies</p>
                          <div className="space-y-3">
                             {data.advancedAnalytics.anomalies?.slice(0, 2).map((anom, i) => (
                               <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-amber-500/[0.02] border border-amber-500/10 group/anom hover:bg-amber-500/5 transition-all">
                                  <Activity size={12} className="text-amber-400/30 mt-0.5" />
                                  <p className="text-amber-100/40 font-mooxy text-[11px] leading-relaxed italic line-clamp-2 transition-colors group-hover/anom:text-amber-100/60">
                                     {anom}
                                   </p>
                               </div>
                             ))}
                             {(!data.advancedAnalytics.anomalies || data.advancedAnalytics.anomalies.length === 0) && (
                               <div className="flex flex-col items-center py-4 gap-2 opacity-10">
                                  <Target size={20} className="text-white" />
                                  <span className="text-[10px] text-white font-mooxy uppercase tracking-widest">Steady State</span>
                               </div>
                             )}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}
            
            {/* Minimalist Tech Footer */}
            <div className="pt-10 mb-2 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
               <div className="flex items-center gap-4">
                  <div className="px-2 py-0.5 rounded border border-white/20 text-[9px] font-bold text-white uppercase tracking-tighter">SECURE NODE</div>
                  <p className="text-white/40 font-mooxy text-[10px] uppercase tracking-widest">Cluster 04-A // Institutional Core</p>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <Users size={12} className="text-white/40" />
                     <span className="text-white/40 text-[10px] font-mooxy uppercase tracking-widest font-bold">Encrypted Audit Trail</span>
                  </div>
                  <span className="text-white/20 text-[11px] font-growmajour font-black letter-spacing-2 tracking-widest">v5.0-STAGE</span>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 gap-8 animate-in fade-in duration-1000">
             <div className="w-16 h-16 rounded-full bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center animate-pulse">
                <Zap size={32} className="text-indigo-400 opacity-30" />
             </div>
             <p className="text-white/20 font-mooxy text-[10px] uppercase tracking-[0.4em] font-bold">Waiting for Data Stream Synchronization</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemInsightsPanel;
