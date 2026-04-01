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

/**
 * AIValidatorPanel — strict administrative reviewer for requests.
 */
const AIValidatorPanel = ({ token, type = "LEAVE", subject, reason, hasDocument = false, onApply }) => {
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

    const payload = { subject, reason, hasDocument, type };
    const data = await validateAIRequest(payload, token);

    if (!data) {
      setError("Could not reach the AI validation service. Please try again.");
    } else {
      setResult(data);
    }

    setLoading(false);
  };

  const cfg = result ? (decisionConfig[result.decision] || decisionConfig["REVIEW"]) : null;
  const docCfg = result?.documentAnalysis ? docStatusConfig[result.documentAnalysis.status] : null;

  return (
    <div className="mb-5 bg-[#0A0F1C] border border-sky-500/15 rounded-2xl overflow-hidden shadow-2xl shadow-sky-950/20">
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-sky-500/5 transition-all group"
      >
        <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:border-sky-500/40 transition-colors">
          <ShieldCheck size={14} className="text-sky-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sky-100 font-mooxy text-sm font-semibold tracking-tight">System AI Validator</p>
            {result && (
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20">
                 <Sparkles size={8} className="text-sky-400" />
                 <span className="text-[9px] font-mooxy text-sky-300/80 uppercase tracking-tighter">Powered by GPT-4o</span>
              </div>
            )}
          </div>
          <p className="text-sky-400/40 font-mooxy text-[11px]">
            Institutional policy audit & recommendation engine
          </p>
        </div>
        {result && cfg && (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mooxy border ${cfg.colorClass} mr-2 shadow-sm uppercase tracking-wider`}>
            <cfg.icon size={10} />
            {cfg.badgeText}
          </span>
        )}
        {open ? (
          <ChevronUp size={14} className="text-sky-400/40" />
        ) : (
          <ChevronDown size={14} className="text-sky-400/40" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-6 border-t border-sky-500/10">
          {!result && !loading && (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-sky-500/5 flex items-center justify-center mb-3">
                <ShieldCheck size={24} className="text-sky-500/20" />
              </div>
              <p className="text-sky-200/40 text-xs font-mooxy max-w-[200px]">
                Run the validator to audit your request against institutional rules.
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleValidate}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-sm font-bold font-mooxy transition-all shadow-lg shadow-sky-500/20 group"
            >
              {loading ? (
                <><Loader2 size={14} className="animate-spin" /> Analyzing Request…</>
              ) : (
                <><ShieldCheck size={16} className="group-hover:scale-110 transition-transform" /> Audit Request</>
              )}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleValidate}
                disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white text-xs font-mooxy transition-all"
              >
                <RefreshCw size={12} /> Re-Audit
              </button>
            )}
          </div>

          {/* Error */}
          {error && !result && (
            <div className="mt-4 flex items-start gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300 font-mooxy text-xs">{error}</p>
            </div>
          )}

          {/* Result card */}
          {result && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500 space-y-5">
              {/* Verdict Summary */}
              <div className={`p-4 rounded-2xl border ${cfg?.colorClass} bg-opacity-5 relative overflow-hidden`}>
                <div className="relative z-10">
                   <div className="flex items-center justify-between mb-2">
                     <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${cfg?.colorClass.split(" ")[0]} opacity-80`}>System Verdict</span>
                     <span className="text-[10px] font-mooxy text-white/30 uppercase tracking-widest font-bold">Confidence: {result.confidence}%</span>
                   </div>
                   <p className="text-white/90 text-sm font-mooxy leading-relaxed">
                     {result.finalSummary}
                   </p>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03]">
                  <ShieldCheck size={120} />
                </div>
              </div>

              {/* Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Metadata Section */}
                 <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                       <p className="text-white/30 font-mooxy text-[9px] uppercase tracking-widest mb-3 font-bold">Classification</p>
                       <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60 font-mooxy">Detected Type</span>
                          <span className="text-xs text-sky-400 font-bold font-mooxy bg-sky-400/10 px-2 py-0.5 rounded-md border border-sky-400/20">{result.detectedType}</span>
                       </div>
                    </div>

                    {/* Document Analysis */}
                    {result.documentAnalysis && (
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                         <p className="text-white/30 font-mooxy text-[9px] uppercase tracking-widest mb-3 font-bold">Document Audit</p>
                         <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-opacity-10 border ${docCfg?.color || "text-white/20"} bg-current border-current`}>
                               {docCfg && <docCfg.icon size={16} className={docCfg.color} />}
                            </div>
                            <div>
                               <p className={`text-xs font-bold font-mooxy ${docCfg?.color || "text-white"}`}>{docCfg?.label}</p>
                               <p className="text-[10px] text-white/40 font-mooxy">Policy compliance check</p>
                            </div>
                         </div>
                         <p className="text-[11px] text-white/60 font-mooxy leading-relaxed italic">
                           "{result.documentAnalysis.reason}"
                         </p>
                      </div>
                    )}
                 </div>

                 {/* Issues & Suggestions */}
                 <div className="space-y-4">
                   {result.issues && result.issues.length > 0 && (
                     <div className="bg-red-500/[0.03] border border-red-500/10 p-4 rounded-2xl">
                        <p className="text-red-400/60 font-mooxy text-[9px] uppercase tracking-widest mb-3 font-bold flex items-center gap-1.5">
                           <XCircle size={10} /> Quality Issues
                        </p>
                        <ul className="space-y-2">
                          {result.issues.map((issue, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-red-400/40 mt-1.5 flex-shrink-0" />
                              <p className="text-red-200/70 font-mooxy text-xs leading-snug">{issue}</p>
                            </li>
                          ))}
                        </ul>
                     </div>
                   )}

                   {result.suggestions && result.suggestions.length > 0 && (
                     <div className="bg-emerald-500/[0.03] border border-emerald-500/10 p-4 rounded-2xl">
                        <p className="text-emerald-400/60 font-mooxy text-[9px] uppercase tracking-widest mb-3 font-bold flex items-center gap-1.5">
                           <Sparkles size={10} /> Actionable Steps
                        </p>
                        <ul className="space-y-2">
                          {result.suggestions.map((s, i) => (
                            <li key={`sug-${i}`} className="flex items-start gap-2">
                              <ArrowRight size={10} className="text-emerald-500/50 flex-shrink-0 mt-0.5" />
                              <p className="text-emerald-200/70 font-mooxy text-xs leading-snug">{s}</p>
                            </li>
                          ))}
                        </ul>
                     </div>
                   )}
                 </div>
              </div>

              {/* Improved Version Preview */}
              {result.improvedVersion && (
                <div className="bg-gradient-to-br from-sky-500/[0.05] to-transparent border border-sky-500/20 rounded-2xl overflow-hidden shadow-xl">
                   <div className="bg-sky-500/10 px-5 py-3 border-b border-sky-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <Sparkles size={14} className="text-sky-400" />
                         <p className="text-sky-200 font-mooxy text-[11px] uppercase tracking-widest font-bold">
                            Policy-Compliant Draft
                         </p>
                      </div>
                   </div>
                   <div className="p-5 space-y-4">
                      <div>
                         <p className="text-white/20 text-[9px] uppercase font-mooxy tracking-widest mb-1.5 font-bold">Subject</p>
                         <p className="text-white/90 font-mooxy text-xs leading-relaxed font-medium bg-white/[0.02] p-3 rounded-xl border border-white/5">
                           {result.improvedVersion.subject}
                         </p>
                      </div>
                      <div>
                         <p className="text-white/20 text-[9px] uppercase font-mooxy tracking-widest mb-1.5 font-bold">Reasoning / Body</p>
                         <p className="text-white/70 font-mooxy text-xs leading-relaxed whitespace-pre-wrap bg-white/[0.02] p-3 rounded-xl border border-white/5 italic">
                           {result.improvedVersion.reason}
                         </p>
                      </div>

                      {onApply && (
                        <button
                          type="button"
                          onClick={() => onApply(result.improvedVersion)}
                          className="w-full mt-2 flex items-center justify-center gap-2.5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold font-mooxy transition-all shadow-lg shadow-sky-500/20"
                        >
                          <CheckCircle size={14} /> Apply Professional Rewrite
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
