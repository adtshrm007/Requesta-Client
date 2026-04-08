import { useState } from "react";
import {
  ShieldCheck, ShieldAlert, ShieldOff, Loader2, AlertCircle,
  CheckCircle, XCircle, ChevronDown, ChevronUp, Sparkles, RefreshCw, ArrowRight, MessageSquare
} from "lucide-react";
import { validateAIRequest } from "../utils/POSTAIValidate";

const decisionConfig = {
  APPROVE: {
    icon: CheckCircle,
    colorClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    badgeText: "Approve",
  },
  REVIEW: {
    icon: AlertCircle,
    colorClass: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    badgeText: "Review Required",
  },
  REJECT: {
    icon: XCircle,
    colorClass: "text-red-400 bg-red-400/10 border-red-400/25",
    badgeText: "Reject",
  },
};

const docStatusConfig = {
  MISSING: { color: "text-red-400", icon: ShieldOff, label: "Document Missing" },
  PROVIDED: { color: "text-emerald-400", icon: ShieldCheck, label: "Document Provided" },
  NOT_REQUIRED: { color: "text-sky-400", icon: CheckCircle, label: "Not Required" },
};

const riskLevelConfig = {
  LOW: { color: "text-emerald-400", bg: "bg-emerald-400/10", bar: "bg-emerald-400" },
  MEDIUM: { color: "text-amber-400", bg: "bg-amber-400/10", bar: "bg-amber-400" },
  HIGH: { color: "text-red-400", bg: "bg-red-400/10", bar: "bg-red-400" },
};

/**
 * AIValidatorPanel — production-grade decision engine.
 */
const AIValidatorPanel = ({ token, type = "LEAVE", subject, reason, hasDocument = false, startDate, endDate, userHistory, onApply }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleValidate = async () => {
    if (!reason || reason.trim().length < 5) {
      setError("Please describe your request reason before validating.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const payload = { 
      subject, 
      reason, 
      hasDocument, 
      type,
      startDate,
      endDate,
      userHistory
    };

    const data = await validateAIRequest(payload, token);

    if (!data) {
      setError("Could not reach the AI decision service. Please try again.");
    } else {
      setResult(data);
    }

    setLoading(false);
  };

  const cfg = result ? (decisionConfig[result.decision] || decisionConfig["REVIEW"]) : null;
  const docCfg = result?.documentAnalysis ? docStatusConfig[result.documentAnalysis.status] : null;
  const riskCfg = result?.riskAnalysis ? riskLevelConfig[result.riskAnalysis.level] : null;

  const themes = {
    CERTIFICATE: {
      primary: "purple",
      textMain: "text-purple-400",
      textSub: "text-purple-300",
      bgSolid: "bg-purple-600 hover:bg-purple-500",
      bgSoft: "bg-purple-500/10",
      bgSofter: "bg-purple-500/5",
      borderMain: "border-purple-500/20",
      borderSub: "border-purple-500/10",
      borderHover: "group-hover:border-purple-500/40",
      glow: "shadow-purple-600/20",
    },
    LEAVE: {
      primary: "indigo",
      textMain: "text-indigo-400",
      textSub: "text-indigo-300",
      bgSolid: "bg-indigo-600 hover:bg-indigo-500",
      bgSoft: "bg-indigo-500/10",
      bgSofter: "bg-indigo-500/5",
      borderMain: "border-indigo-500/20",
      borderSub: "border-indigo-500/10",
      borderHover: "group-hover:border-indigo-500/40",
      glow: "shadow-indigo-600/20",
    }
  };
  const th = themes[type] || themes.LEAVE;

  return (
    <div className={`mb-6 bg-[#0D1117]/80 backdrop-blur-2xl border ${th.borderMain} rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative group/card transition-all duration-500`}>
      {/* Mesh Glow */}
      {open && <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-${th.primary}-500/10 rounded-full blur-[100px] pointer-events-none -mt-48 -mr-48 opacity-50`} />}
      
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors rounded-t-[2rem] group relative z-10"
      >
        <div className={`w-12 h-12 rounded-2xl ${th.bgSoft} border ${th.borderMain} flex items-center justify-center ${th.borderHover} transition-colors shadow-inner`}>
          <ShieldCheck size={20} className={th.textMain} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-white font-growmajour text-lg tracking-tight">AI Decision Engine</p>
            {result && (
              <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${th.bgSoft} border ${th.borderMain}`}>
                 <Sparkles size={10} className={th.textMain} />
                 <span className={`text-[9px] font-bold font-mooxy ${th.textSub} uppercase tracking-widest`}>Policy Audit Active</span>
              </div>
            )}
          </div>
          <p className="text-white/40 font-mooxy text-[10px] uppercase tracking-[0.2em] mt-1">
            Institutional Standards & Risk Intelligence
          </p>
        </div>
        {result && cfg && (
          <div className="hidden sm:flex items-center">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold font-mooxy border ${cfg.colorClass} mr-2 shadow-lg shadow-black/20 backdrop-blur-md transition-all animate-in fade-in zoom-in duration-500`}>
              <cfg.icon size={12} className="opacity-80" />
              {cfg.badgeText.toUpperCase()}
            </span>
          </div>
        )}
        {open ? (
          <ChevronUp size={16} className="text-white/20" />
        ) : (
          <ChevronDown size={16} className="text-white/20" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-8 border-t border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent">
          {!result && !loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center max-w-[300px] mx-auto">
              <div className="w-16 h-16 rounded-full bg-indigo-500/5 flex items-center justify-center mb-4 border border-indigo-500/10">
                <ShieldCheck size={32} className="text-indigo-500/20" />
              </div>
              <p className="text-white/40 text-xs font-mooxy leading-relaxed">
                Analyze your request details against institutional policy and get a pre-submission decision.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10">
            <button
               type="button"
               onClick={handleValidate}
               disabled={loading}
               className={`flex-1 sm:flex-none flex items-center justify-center gap-3 px-10 py-4 rounded-2xl ${th.bgSolid} disabled:opacity-50 text-white text-[11px] font-bold font-mooxy uppercase tracking-widest transition-all shadow-xl ${th.glow} group relative overflow-hidden active:scale-95`}
             >
               <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <span className="relative flex items-center gap-3">
                 {loading ? (
                   <><Loader2 size={18} className="animate-spin" /> System Audit in Progress…</>
                 ) : (
                   <><ShieldCheck size={18} /> {result ? "Re-Run Full Audit" : "Request Institutional Audit"}</>
                 )}
               </span>
             </button>
            {result && !loading && (
              <p className="text-white/25 font-mooxy text-[10px] uppercase tracking-widest sm:ml-auto">
                Last Audit: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>

          {/* Error */}
          {error && !result && (
            <div className="mt-5 flex items-start gap-3 px-4 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <AlertCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300 font-mooxy text-xs leading-relaxed">{error}</p>
            </div>
          )}

          {/* Result Intelligence */}
          {result && (
            <div className="mt-8 animate-in fade-in slide-in-from-top-6 duration-700 space-y-6">
              {/* Main Decision Header */}
              <div className={`p-8 rounded-[2rem] border ${cfg?.colorClass} bg-opacity-5 relative overflow-hidden backdrop-blur-md shadow-inner`}>
                 <div className="relative z-10">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                     <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${cfg?.colorClass} text-[11px] font-bold tracking-[0.2em] uppercase backdrop-blur-xl`}>
                       <cfg.icon size={14} /> Official Policy Verdict: {result.decision}
                     </span>
                     <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-4 py-2 rounded-2xl">
                        <div className="text-right">
                          <p className="text-white/20 font-bold text-[8px] uppercase tracking-widest">Trust Index</p>
                          <p className="text-white font-mooxy text-xs font-bold">{result.confidence}%</p>
                        </div>
                        <div className="w-[1px] h-6 bg-white/10" />
                        <Sparkles size={16} className={th.textMain} />
                     </div>
                   </div>
                   <h3 className="text-white text-xl font-growmajour tracking-tight mb-4">Audit Intelligence Summary</h3>
                   <p className="text-white/70 font-mooxy text-[13px] leading-relaxed max-w-3xl">
                     {result.finalSummary}
                   </p>
                 </div>
                 <div className={`absolute top-[-40px] right-[-40px] opacity-[0.05] ${th.textMain}`}>
                   <ShieldCheck size={240} />
                 </div>
              </div>

              {/* Intelligence Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Column 1: Analysis & Stats */}
                 <div className="space-y-6">
                   {/* Risk Engine */}
                   {result.riskAnalysis && riskCfg && (
                     <div className="bg-white/[0.02] border border-white/5 p-7 rounded-[2rem] relative group/risk overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.02] rounded-full -mr-12 -mt-12" />
                       <div className="flex items-center justify-between mb-5">
                         <p className="text-white/30 font-bold text-[10px] uppercase tracking-[0.25em]">Critical Risk Matrix</p>
                         <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border ${riskCfg.color} ${riskCfg.bg} border-current uppercase shadow-sm`}>
                           {result.riskAnalysis.level}
                         </span>
                       </div>
                       
                       <div className="mb-8">
                          <div className="flex items-end justify-between mb-3">
                            <div className="space-y-1">
                              <p className="text-3xl font-growmajour text-white tabular-nums tracking-tighter">{result.riskAnalysis.score}<span className="text-sm text-white/20 ml-1">/100</span></p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[10px] text-white/20 uppercase tracking-widest font-black mb-1">Impact Level</span>
                              <span className={`text-[11px] font-bold ${riskCfg.color}`}>SYSTEMIC</span>
                            </div>
                          </div>
                          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner p-[1px]">
                            <div 
                              className={`h-full ${riskCfg.bar} rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.1)]`} 
                              style={{ width: `${result.riskAnalysis.score}%` }} 
                            />
                          </div>
                       </div>

                       <div className="grid grid-cols-1 gap-2.5">
                         {result.riskAnalysis.factors.map((f, i) => (
                           <div key={i} className="flex items-start gap-3 bg-white/[0.02] p-2.5 rounded-xl border border-white/5 group-hover/risk:bg-white/[0.04] transition-all">
                              <div className={`w-1.5 h-1.5 rounded-full ${riskCfg.bar} mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                              <span className="text-[11px] text-white/50 font-mooxy leading-tight">{f}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {/* Duration & Classification */}
                   <div className="bg-white/[0.02] border border-white/5 p-7 rounded-[2rem] flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center`}>
                               <AlertCircle size={14} className="text-white/30" />
                            </div>
                            <div>
                               <p className="text-white/20 font-bold text-[9px] uppercase tracking-widest mb-0.5">Classification</p>
                               <p className="text-sm font-bold text-indigo-400 font-mooxy truncate max-w-[150px]">{result.detectedType}</p>
                            </div>
                         </div>
                         <div className="h-10 w-[1px] bg-white/5" />
                         <div className="text-right">
                            <p className="text-white/20 font-bold text-[9px] uppercase tracking-widest mb-0.5">Audit Duration</p>
                            <p className="text-sm font-bold text-white font-mooxy underline decoration-indigo-500/50 underline-offset-4">{result.duration || "N/A"} Days</p>
                         </div>
                      </div>
                   </div>
                 </div>

                 {/* Column 2: Key Factors & Logic */}
                 <div className="lg:col-span-2 space-y-6">
                    {/* Document Analysis */}
                    {result.documentAnalysis && docCfg && (
                      <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex flex-wrap gap-6 items-center">
                         <div className={`p-4 rounded-2xl bg-opacity-10 border ${docCfg.color} bg-current border-current flex-shrink-0`}>
                            <docCfg.icon size={24} className={docCfg.color} />
                         </div>
                         <div className="flex-1 min-w-[200px]">
                            <div className="flex items-center justify-between mb-1">
                               <p className={`text-sm font-bold font-mooxy ${docCfg.color}`}>{docCfg.label}</p>
                               <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Document Audit</span>
                            </div>
                            <p className="text-xs text-white/40 font-mooxy leading-relaxed italic">
                              "{result.documentAnalysis.reason}"
                            </p>
                         </div>
                      </div>
                    )}

                    {/* Decision Reasoning Step-by-Step */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* Explain Decision */}
                       <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                          <p className="text-white/30 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Path to Decision</p>
                          <div className="space-y-4">
                            {result.explainDecision?.map((step, i) => (
                              <div key={i} className="flex gap-4">
                                <span className={`w-6 h-6 rounded-full ${th.bgSoft} border ${th.borderMain} ${th.textMain} text-[10px] flex items-center justify-center font-bold flex-shrink-0 shadow-inner`}>{i+1}</span>
                                <p className="text-xs text-white/60 font-mooxy leading-relaxed mt-1">{step}</p>
                              </div>
                            ))}
                          </div>
                       </div>

                       {/* Key Factors */}
                       <div className={`${th.bgSoft} border ${th.borderMain} p-6 rounded-3xl`}>
                          <p className={`${th.textMain} font-bold text-[10px] uppercase tracking-[0.2em] mb-4`}>Deterministic Factors</p>
                          <div className="space-y-3">
                            {result.keyFactors?.map((f, i) => (
                              <div key={i} className="flex items-center gap-3">
                                 <CheckCircle size={12} className="text-indigo-500/40" />
                                 <span className="text-xs text-white/70 font-mooxy">{f}</span>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Quality Audit: Issues & Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {result.issues?.length > 0 && (
                   <div className="bg-red-500/[0.03] border border-red-500/10 p-6 rounded-3xl">
                      <p className="text-red-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <ShieldOff size={12} /> Compliance Deviations
                      </p>
                      <ul className="space-y-2.5">
                        {result.issues.map((issue, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400/40 mt-1.5 flex-shrink-0" />
                            <p className="text-red-200/60 font-mooxy text-xs leading-relaxed">{issue}</p>
                          </li>
                        ))}
                      </ul>
                   </div>
                 )}

                 {result.suggestions?.length > 0 && (
                   <div className="bg-sky-500/[0.03] border border-sky-500/10 p-6 rounded-3xl">
                      <p className="text-sky-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Sparkles size={12} /> Optimization Strategies
                      </p>
                      <ul className="space-y-2.5">
                        {result.suggestions.map((s, i) => (
                          <li key={`sug-${i}`} className="flex items-start gap-3">
                            <ArrowRight size={12} className="text-sky-500/50 flex-shrink-0 mt-0.5" />
                            <p className="text-sky-200/60 font-mooxy text-xs leading-relaxed">{s}</p>
                          </li>
                        ))}
                      </ul>
                   </div>
                 )}
              </div>

              {/* Professional Draft Preview */}
              {result.improvedVersion && (
                <div className={`mt-12 bg-white/[0.02] border ${th.borderMain} rounded-[2rem] md:rounded-[3rem] overflow-hidden group/draft transition-all duration-700 hover:border-white/20`}>
                   <div className={`bg-white/[0.04] px-10 py-6 border-b ${th.borderSub} flex items-center justify-between`}>
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl ${th.bgSoft} border ${th.borderSub} flex items-center justify-center shadow-inner`}>
                           <Sparkles size={20} className={th.textMain} />
                         </div>
                         <div>
                            <p className={`${th.textMain} font-growmajour text-sm uppercase tracking-[0.2em] mb-0.5`}>
                               Formalized Proposal Draft
                            </p>
                            <p className="text-white/20 font-mooxy text-[10px] uppercase tracking-wider">AI High-Fidelity Rewrite Module</p>
                         </div>
                      </div>
                      <div className="hidden sm:block">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Verified Format</span>
                      </div>
                   </div>
                   <div className="p-10 space-y-8 bg-gradient-to-b from-white/[0.01] to-transparent">
                      <div className="group/item">
                         <div className="flex items-center justify-between mb-3 px-1">
                            <p className={`${th.textMain} text-[9px] uppercase font-black tracking-[0.25em] opacity-40`}>Proposed Subject Line</p>
                            <div className="w-12 h-px bg-white/5" />
                         </div>
                         <div className="text-white/90 font-mooxy text-[15px] leading-relaxed font-semibold bg-white/[0.04] p-5 rounded-2xl border border-white/10 group-hover/item:border-white/20 transition-all shadow-inner">
                           {result.improvedVersion.subject}
                         </div>
                      </div>
                      <div className="group/item">
                         <div className="flex items-center justify-between mb-3 px-1">
                            <p className={`${th.textMain} text-[9px] uppercase font-black tracking-[0.25em] opacity-40`}>Justification Argument</p>
                            <div className="w-12 h-px bg-white/5" />
                         </div>
                         <div className="text-white/70 font-mooxy text-[14px] leading-[1.8] whitespace-pre-wrap bg-white/[0.02] p-6 rounded-2xl border border-white/5 group-hover/item:border-white/10 transition-all italic shadow-inner relative">
                            <div className="absolute top-4 left-4 opacity-[0.03] text-white">
                               <MessageSquare size={40} />
                            </div>
                            <span className="relative z-10">"{result.improvedVersion.reason}"</span>
                         </div>
                      </div>

                      {onApply && (
                        <button
                          type="button"
                          onClick={() => onApply(result.improvedVersion)}
                          className={`w-full mt-4 group/apply flex items-center justify-center gap-4 py-5 rounded-2xl ${th.bgSolid} text-white text-[11px] font-bold uppercase tracking-[0.3em] font-mooxy transition-all shadow-2xl ${th.glow} hover:scale-[1.01] active:scale-[0.98] relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/apply:translate-x-0 transition-transform duration-700" />
                          <span className="relative flex items-center gap-3">
                            <CheckCircle size={20} /> Deploy Validated Draft to Request
                          </span>
                        </button>
                      )}
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIValidatorPanel;
