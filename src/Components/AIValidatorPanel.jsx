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
const AIValidatorPanel = ({ token, type = "LEAVE", getText, onApply }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleValidate = async () => {
    const text = getText?.();
    if (!text || text.trim().length < 10) {
      setError("Please fill in your request reason (at least 10 characters) before validating.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const data = await validateAIRequest(text, type, token);

    if (!data) {
      setError("Could not reach the AI validation service. Please try again.");
    } else if (data.error) {
      // Graceful degradation — still show fallback result
      setResult(data);
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
          <p className="text-sky-200 font-mooxy text-sm font-medium">AI Request Validator</p>
          <p className="text-sky-400/60 font-mooxy text-xs">
            Check your request quality before submitting
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
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleValidate}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-sm font-mooxy transition-all shadow-lg shadow-sky-500/20"
            >
              {loading ? (
                <><Loader2 size={13} className="animate-spin" /> Validating…</>
              ) : (
                <><ShieldCheck size={13} /> Validate Request</>
              )}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleValidate}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-mooxy transition-all"
              >
                <RefreshCw size={12} /> Re-validate
              </button>
            )}
          </div>

          <p className="text-white/30 font-mooxy text-xs mt-2">
            AI will review your current form content and check for completeness, tone, and clarity.
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
            <div className="mt-4 bg-white/[0.025] border border-white/8 rounded-xl overflow-hidden">
              {/* Validity badge header */}
              <div className={`px-4 py-3 flex items-center gap-2 border-b border-white/5 ${cfg.colorClass.split(" ")[1]} bg-opacity-30`}>
                <cfg.icon size={15} className={cfg.colorClass.split(" ")[0]} />
                <span className={`font-mooxy text-sm font-semibold ${cfg.colorClass.split(" ")[0]}`}>
                  {result.validity}
                </span>
                {result.error && (
                  <span className="ml-auto text-amber-300/60 font-mooxy text-[10px] italic">
                    (AI fallback mode)
                  </span>
                )}
              </div>

              <div className="p-4">
                {/* Issues list */}
                {result.issues && result.issues.length > 0 && (
                  <div className="mb-4">
                    <p className="text-white/40 font-mooxy text-[11px] uppercase tracking-wider mb-2">
                       Why this needs improvement
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {result.issues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-1.5 flex-shrink-0" />
                          <p className="text-red-200/70 font-mooxy text-xs leading-relaxed">{issue}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actionable Changes */}
                {result.actionableChanges && result.actionableChanges.length > 0 && (
                  <div className="mb-4 bg-sky-500/10 border border-sky-500/20 p-3 rounded-xl">
                    <p className="text-sky-300 font-mooxy text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ArrowRight size={12} className="text-sky-400" /> What to Change
                    </p>
                    <ul className="flex flex-col gap-2">
                      {result.actionableChanges.map((change, i) => (
                        <li key={`action-${i}`} className="flex items-start gap-2 text-sky-100 font-mooxy text-xs leading-relaxed">
                          <span className="text-sky-400 flex-shrink-0">•</span> {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.issues?.length === 0 && result.validity === "Valid" && (
                  <div className="mb-4 flex items-center gap-2 text-green-400">
                    <CheckCircle size={13} />
                    <p className="font-mooxy text-xs">Your request looks complete and well-written.</p>
                  </div>
                )}

                {/* Suggested rewrite */}
                {result.suggestedRewrite && (
                  <div>
                    <p className="text-white/40 font-mooxy text-[11px] uppercase tracking-wider mb-2">
                      Suggested Rewrite
                    </p>
                    <p className="text-white/60 font-mooxy text-xs leading-relaxed bg-white/[0.03] rounded-lg p-3 border border-white/6">
                      {result.suggestedRewrite}
                    </p>
                    {onApply && (
                      <button
                        type="button"
                        onClick={() => onApply(result.suggestedRewrite)}
                        className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/25 text-sky-300 text-xs font-mooxy transition-all"
                      >
                        <Sparkles size={11} /> Use Suggested Version
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIValidatorPanel;
