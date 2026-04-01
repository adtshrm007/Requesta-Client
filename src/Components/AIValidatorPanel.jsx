import { useState } from "react";
import {
  ShieldCheck, ShieldAlert, ShieldOff, Loader2, AlertCircle,
  CheckCircle, XCircle, ChevronDown, ChevronUp, Sparkles, RefreshCw, ArrowRight
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

  return (
    <div className="mb-5 bg-[#0D1117] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/5 transition-all group"
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:border-indigo-500/40 transition-colors">
          <ShieldCheck size={18} className="text-indigo-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-white font-mooxy text-sm font-semibold tracking-tight uppercase tracking-wider">AI Decision Engine</p>
            {result && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                 <Sparkles size={8} className="text-indigo-400" />
                 <span className="text-[9px] font-bold font-mooxy text-indigo-300 uppercase">Policy Audit Active</span>
              </div>
            )}
          </div>
          <p className="text-white/30 font-mooxy text-[10px] uppercase tracking-widest mt-0.5">
            Institutional Standards & Risk Intelligence
          </p>
        </div>
        {result && cfg && (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mooxy border ${cfg.colorClass} mr-2 shadow-sm transition-all animate-in fade-in zoom-in duration-300`}>
            <cfg.icon size={11} />
            {cfg.badgeText.toUpperCase()}
          </span>
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

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleValidate}
              disabled={loading}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold font-mooxy transition-all shadow-xl shadow-indigo-600/20 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2.5">
                {loading ? (
                  <><Loader2 size={15} className="animate-spin" /> Verifying Policy…</>
                ) : (
                  <><ShieldCheck size={15} /> Execute Audit</>
                )}
              </span>
            </button>
            {result && (
              <button
                type="button"
                onClick={handleValidate}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-bold font-mooxy transition-all"
              >
                <RefreshCw size={14} /> Re-Audit
              </button>
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
              <div className={`p-6 rounded-3xl border ${cfg?.colorClass} bg-opacity-5 relative overflow-hidden backdrop-blur-sm`}>
                 <div className="relative z-10">
                   <div className="flex items-center justify-between mb-4">
                     <span className={`text-[11px] font-bold tracking-[0.3em] uppercase ${cfg?.colorClass.split(" ")[0]} opacity-80 flex items-center gap-2`}>
                       <cfg.icon size={14} /> Verdict: {result.decision}
                     </span>
                     <span className="text-[10px] font-bold font-mooxy text-white/30 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full border border-white/5">
                       Confidence Score: {result.confidence}%
                     </span>
                   </div>
                   <h3 className="text-white text-lg font-mooxy font-semibold mb-3">Audit Summary</h3>
                   <p className="text-white/60 text-sm font-mooxy leading-relaxed">
                     {result.finalSummary}
                   </p>
                 </div>
                 <div className="absolute top-[-30px] right-[-30px] opacity-[0.04]">
                   <ShieldCheck size={180} />
                 </div>
              </div>

              {/* Intelligence Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Column 1: Analysis & Stats */}
                 <div className="space-y-6">
                   {/* Risk Engine */}
                   {result.riskAnalysis && riskCfg && (
                     <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-white/30 font-bold text-[10px] uppercase tracking-[0.2em]">Risk Analysis</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${riskCfg.color} ${riskCfg.bg} border-current opacity-80`}>
                            {result.riskAnalysis.level}
                          </span>
                        </div>
                        
                        <div className="mb-6">
                           <div className="flex items-end justify-between mb-2">
                             <span className="text-2xl font-bold text-white font-mooxy">{result.riskAnalysis.score}<span className="text-sm text-white/20 font-normal">/100</span></span>
                             <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Risk Score</span>
                           </div>
                           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                             <div 
                               className={`h-full ${riskCfg.bar} transition-all duration-1000 ease-out`} 
                               style={{ width: `${result.riskAnalysis.score}%` }} 
                             />
                           </div>
                        </div>

                        <div className="space-y-2">
                          {result.riskAnalysis.factors.map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                               <div className={`w-1.5 h-1.5 rounded-full ${riskCfg.bar} opacity-40`} />
                               <span className="text-[11px] text-white/50 font-mooxy">{f}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}

                   {/* Duration & Classification */}
                   <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl grid grid-cols-2 gap-4">
                      <div>
                         <p className="text-white/20 font-bold text-[9px] uppercase tracking-widest mb-1.5">Classification</p>
                         <p className="text-sm font-bold text-indigo-400 font-mooxy truncate">{result.detectedType}</p>
                      </div>
                      <div>
                         <p className="text-white/20 font-bold text-[9px] uppercase tracking-widest mb-1.5">Detected Duration</p>
                         <p className="text-sm font-bold text-white font-mooxy">{result.duration || "N/A"} Days</p>
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
                              <div key={i} className="flex gap-3">
                                <span className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold flex-shrink-0">{i+1}</span>
                                <p className="text-[11px] text-white/60 font-mooxy leading-relaxed mt-0.5">{step}</p>
                              </div>
                            ))}
                          </div>
                       </div>

                       {/* Key Factors */}
                       <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-3xl">
                          <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Deterministic Factors</p>
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
                <div className="bg-gradient-to-br from-indigo-500/[0.08] to-transparent border border-indigo-500/20 rounded-[2.5rem] overflow-hidden shadow-3xl">
                   <div className="bg-indigo-500/10 px-8 py-4 border-b border-indigo-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Sparkles size={16} className="text-indigo-400" />
                         <p className="text-indigo-200 font-growmajour text-xs uppercase tracking-[0.2em]">
                            Validated Formal Rewrite
                         </p>
                      </div>
                   </div>
                   <div className="p-8 space-y-6">
                      <div>
                         <p className="text-indigo-300/30 text-[9px] uppercase font-bold tracking-[0.2em] mb-2 px-1">Subject Header</p>
                         <p className="text-white/90 font-mooxy text-sm leading-relaxed font-semibold bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                           {result.improvedVersion.subject}
                         </p>
                      </div>
                      <div>
                         <p className="text-indigo-300/30 text-[9px] uppercase font-bold tracking-[0.2em] mb-2 px-1">Body Text / Justification</p>
                         <p className="text-white/70 font-mooxy text-sm leading-relaxed whitespace-pre-wrap bg-white/[0.02] p-4 rounded-2xl border border-white/5 italic">
                           "{result.improvedVersion.reason}"
                         </p>
                      </div>

                      {onApply && (
                        <button
                          type="button"
                          onClick={() => onApply(result.improvedVersion)}
                          className="w-full mt-4 flex items-center justify-center gap-3 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest font-mooxy transition-all shadow-2xl shadow-indigo-600/30 active:scale-95"
                        >
                          <CheckCircle size={18} /> Deploy Policy Draft
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
