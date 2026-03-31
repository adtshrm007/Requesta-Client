import { useState } from "react";
import { Sparkles, Loader2, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { getApprovalSuggestion } from "../utils/POSTAIApprovalSuggestion";

const decisionConfig = {
  Approve: { icon: CheckCircle, colorClass: "text-green-400 bg-green-400/10 border-green-400/25" },
  Reject: { icon: XCircle, colorClass: "text-red-400 bg-red-400/10 border-red-400/25" },
  Review: { icon: AlertCircle, colorClass: "text-amber-400 bg-amber-400/10 border-amber-400/25" },
};

const confidenceColors = {
  High: "text-emerald-400",
  Medium: "text-amber-400",
  Low: "text-red-400"
};

/**
 * ApprovalAISuggestion — advisory panel for admins inside Leave/Certificate cards.
 */
const ApprovalAISuggestion = ({ token, type = "LEAVE", reason, duration, userHistory, hasDocument = false, onApplyRemark }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchSuggestion = async () => {
    if (result) return; // already fetched
    
    setLoading(true);
    setError(null);
    
    const payload = {
      type, // Pass it to the backend
      reason: reason || "",
      duration: duration || "Not specified",
      userHistory,
      hasDocument,
    };

    const data = await getApprovalSuggestion(payload, token);
    
    if (!data) {
      setError("AI Service Unavailable");
    } else {
      setResult(data);
    }
    
    setLoading(false);
  };

  const toggleOpen = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && !result && !loading) {
      fetchSuggestion();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2 p-3 text-white/50 text-xs font-mooxy">
          <Loader2 size={14} className="animate-spin text-purple-400" />
          Analyzing request context...
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-3 text-amber-300/80 text-xs font-mooxy italic flex items-center gap-2">
          <AlertCircle size={12} /> {error}
        </div>
      );
    }

    if (result) {
      const cfg = decisionConfig[result.decision] || decisionConfig.Review;
      const Icon = cfg.icon;

      return (
        <div className="p-3 bg-white/[0.02]">
          <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-white/40 font-mooxy text-[10px] uppercase tracking-wider">
                AI Suggestion
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mooxy border ${cfg.cls || cfg.colorClass}`}>
                <Icon size={10} /> {result.decision}
              </span>
            </div>
            <div className="text-[10px] font-mooxy text-white/40">
              Confidence: <span className={confidenceColors[result.confidence] || "text-white/60"}>{result.confidence}</span>
            </div>
          </div>
          
          <div className="mb-3">
             <p className="text-purple-300/50 text-[10px] uppercase tracking-widest mb-1.5 font-mooxy">Reasoning for Admin</p>
             <p className="text-white/70 font-mooxy text-[11px] leading-relaxed bg-white/5 p-2.5 rounded-lg border border-white/5">
               {result.reasoning}
             </p>
          </div>

          {result.suggestedRemark && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-green-400/50 text-[10px] uppercase tracking-widest font-mooxy">Suggested Remark for Student</p>
                {onApplyRemark && (
                  <button 
                    onClick={() => onApplyRemark(result.suggestedRemark)}
                    className="text-[9px] text-green-400 hover:text-green-300 font-mooxy uppercase tracking-wider bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 hover:bg-green-500/20 transition-all"
                  >
                    Apply Remark
                  </button>
                )}
              </div>
              <p className="text-green-100/80 font-mooxy text-xs leading-relaxed italic bg-green-500/5 p-2.5 rounded-lg border border-green-500/10">
                "{result.suggestedRemark}"
              </p>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mt-2 mb-3 bg-purple-500/5 border border-purple-500/15 rounded-xl overflow-hidden shadow-inner">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-purple-500/10 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-purple-400 group-hover:scale-110 transition-transform" />
          <span className="text-purple-300/80 font-mooxy text-xs font-medium">Get AI Approval Suggestion</span>
        </div>
        {open ? <ChevronUp size={12} className="text-purple-400/50" /> : <ChevronDown size={12} className="text-purple-400/50" />}
      </button>

      {open && (
        <div className="border-t border-purple-500/10">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default ApprovalAISuggestion;
