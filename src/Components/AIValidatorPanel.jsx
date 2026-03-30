import { useState } from "react";
import {
  ShieldCheck, ShieldAlert, ShieldOff, Loader2, AlertCircle,
  CheckCircle, XCircle, ChevronDown, ChevronUp, Sparkles, RefreshCw, ArrowRight
} from "lucide-react";
import { validateAIRequest } from "../utils/POSTAIValidate";

const validityConfig = {
  Valid: {
    icon: CheckCircle,
    colorClass: "text-green-400 bg-green-400/10 border-green-400/25",
    badgeText: "Valid",
  },
  "Needs Improvement": {
    icon: AlertCircle,
    colorClass: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    badgeText: "Needs Improvement",
  },
  Suspicious: {
    icon: ShieldOff,
    colorClass: "text-red-400 bg-red-400/10 border-red-400/25",
    badgeText: "Suspicious",
  },
};

/**
 * AIValidatorPanel — validates request content using AI before submission.
 *
 * Props:
 *   token      {string}   - auth token
 *   type       {string}   - "LEAVE" | "CERTIFICATE"
 *   getText    {function} - () => string — returns current form text to validate
 *   onApply    {function} - optional, called with suggestedRewrite if user wants to use it
 */
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

  const cfg = result ? (validityConfig[result.validity] || validityConfig["Needs Improvement"]) : null;

  return (
    <div className="mb-5 bg-sky-500/5 border border-sky-500/15 rounded-2xl overflow-hidden">
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-sky-500/5 transition-all"
      >
        <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
          <ShieldCheck size={13} className="text-sky-300" />
        </div>
        <div className="flex-1">
          <p className="text-sky-200 font-mooxy text-sm font-medium">Strict Administrative Validator</p>
          <p className="text-sky-400/60 font-mooxy text-xs">
            Review for errors, tone, and missing documentation
          </p>
        </div>
        {result && cfg && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mooxy border ${cfg.colorClass} mr-2`}>
            <cfg.icon size={10} />
            {cfg.badgeText}
          </span>
        )}
        {open ? (
          <ChevronUp size={14} className="text-sky-400/60" />
        ) : (
          <ChevronDown size={14} className="text-sky-400/60" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-sky-500/10">
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleValidate}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-sm font-mooxy transition-all shadow-lg shadow-sky-500/20 group"
            >
              {loading ? (
                <><Loader2 size={13} className="animate-spin" /> Reviewing Content…</>
              ) : (
                <><ShieldCheck size={14} className="group-hover:scale-110 transition-transform" /> Review Request</>
              )}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleValidate}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-mooxy transition-all"
              >
                <RefreshCw size={12} /> Re-verify
              </button>
            )}
          </div>

          <p className="text-white/30 font-mooxy text-[10px] uppercase tracking-widest mt-3 mb-1">
            Institutional Standards check
          </p>

          {/* Error */}
          {error && !result && (
            <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300 font-mooxy text-xs">{error}</p>
            </div>
          )}

          {/* Result card */}
          {result && cfg && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500">
              {/* Validity Section */}
              <div className={`p-4 rounded-xl border ${cfg.colorClass} mb-4 flex items-center gap-3`}>
                <cfg.icon size={20} className={cfg.colorClass.split(" ")[0]} />
                <div>
                   <p className="text-[10px] uppercase font-mooxy tracking-widest opacity-60">Status</p>
                   <p className="text-sm font-bold font-mooxy">{result.validity}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 {/* Issues list */}
                 {result.issues && result.issues.length > 0 && (
                   <div className="bg-white/3 border border-white/5 p-4 rounded-xl">
                     <p className="text-red-400 font-mooxy text-[10px] uppercase tracking-wider mb-2 font-bold">
                        Analysis Results
                     </p>
                     <ul className="flex flex-col gap-2">
                       {result.issues.map((issue, i) => (
                         <li key={i} className="flex items-start gap-2">
                           <div className="w-1 h-1 rounded-full bg-red-400/60 mt-1.5 flex-shrink-0" />
                           <p className="text-red-200/90 font-mooxy text-xs">{issue}</p>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}

                 {/* Missing Elements */}
                 {result.missingElements && result.missingElements.length > 0 && (
                   <div className="bg-sky-500/5 border border-sky-500/15 p-4 rounded-xl">
                     <p className="text-sky-300 font-mooxy text-[10px] uppercase tracking-wider mb-2 font-bold">
                        Missing Information
                     </p>
                     <ul className="flex flex-col gap-2">
                       {result.missingElements.map((item, i) => (
                         <li key={`missing-${i}`} className="flex items-start gap-2">
                           <AlertCircle size={10} className="text-sky-400 mt-0.5 flex-shrink-0" />
                           <p className="text-sky-100 font-mooxy text-xs">{item}</p>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
              </div>

              {/* Actionable Changes */}
              {result.suggestions && result.suggestions.length > 0 && (
                <div className="mb-4 bg-amber-500/5 border border-amber-500/15 p-4 rounded-xl">
                  <p className="text-amber-300 font-mooxy text-[10px] uppercase tracking-wider mb-2 font-bold">
                    Actionable Improvements
                  </p>
                  <ul className="flex flex-col gap-2">
                    {result.suggestions.map((s, i) => (
                      <li key={`sug-${i}`} className="flex items-start gap-2 text-amber-100/90 font-mooxy text-xs">
                        <ArrowRight size={10} className="text-amber-500 flex-shrink-0 mt-0.5" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improved Version Preview */}
              {result.improvedVersion && (
                <div className="bg-green-500/[0.03] border border-green-500/15 rounded-2xl overflow-hidden shadow-2xl">
                   <div className="bg-green-500/10 px-4 py-2 border-b border-green-500/15 flex items-center justify-between">
                      <p className="text-green-300 font-mooxy text-[10px] uppercase tracking-widest font-bold">
                         Recommended Final Version
                      </p>
                      <Sparkles size={12} className="text-green-400" />
                   </div>
                   <div className="p-4 space-y-3">
                      <div>
                         <p className="text-white/30 text-[9px] uppercase font-mooxy tracking-widest mb-1">Subject</p>
                         <p className="text-white font-mooxy text-xs leading-relaxed italic bg-white/5 p-2 rounded-lg">
                           {result.improvedVersion.subject}
                         </p>
                      </div>
                      <div>
                         <p className="text-white/30 text-[9px] uppercase font-mooxy tracking-widest mb-1">Reason / Description</p>
                         <p className="text-white/80 font-mooxy text-xs leading-relaxed whitespace-pre-wrap bg-white/5 p-2 rounded-lg">
                           {result.improvedVersion.reason}
                         </p>
                      </div>

                      {onApply && (
                        <button
                          type="button"
                          onClick={() => onApply(result.improvedVersion)}
                          className="w-full mt-2 flex items-center justify-center gap-2 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-mooxy transition-all shadow-lg shadow-green-500/20"
                        >
                          <CheckCircle size={12} /> Apply Recommended Version
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
