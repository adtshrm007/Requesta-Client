import { useState } from "react";
import { 
  Sparkles, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight,
  Info,
  Send
} from "lucide-react";
import { getApprovalSuggestion } from "../utils/POSTAIApprovalSuggestion";

const decisionConfig = {
  Approve: { icon: CheckCircle, colorClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25" },
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
 * Upgraded with Policy Consulting & Future Guidance.
 */
const ApprovalAISuggestion = ({ token, type = "LEAVE", reason, duration, userHistory, hasDocument = false, onApplyRemark }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchSuggestion = async () => {
    if (result) return;
    
    setLoading(true);
    setError(null);
    
    const payload = {
      type,
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
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <Loader2 size={24} className="animate-spin text-indigo-500" />
          <p className="text-white/40 font-mooxy text-[10px] uppercase tracking-widest">Consulting Policy Engine...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl m-3 flex items-center gap-3">
          <AlertCircle size={14} className="text-red-400" />
          <p className="text-red-300 font-mooxy text-xs italic">{error}</p>
        </div>
      );
    }

    if (result) {
      const cfg = decisionConfig[result.decision] || decisionConfig.Review;
      const Icon = cfg.icon;

      return (
        <div className="p-4 animate-in fade-in slide-in-from-top-2 duration-500">
          {/* Decision Header */}
          <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${cfg.colorClass} flex items-center justify-center border-current`}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-white/40 font-mooxy text-[9px] uppercase tracking-[0.2em] mb-0.5">Recommended Verdict</p>
                <p className={`text-xs font-bold font-mooxy ${cfg.colorClass.split(" ")[0]}`}>{result.decision.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/20 font-mooxy text-[9px] uppercase tracking-widest mb-0.5">Confidence</p>
              <p className={`text-[10px] font-bold font-mooxy ${confidenceColors[result.confidence] || "text-white/60"}`}>{result.confidence}</p>
            </div>
          </div>
          
          {/* Policy Summary Card */}
          <div className="mb-4 bg-indigo-500/5 border border-indigo-500/10 p-3.5 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <ShieldCheck size={40} className="text-indigo-400" />
             </div>
             <p className="text-indigo-300/60 text-[9px] uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                <Info size={10} /> Policy Understanding
             </p>
             <p className="text-white/80 font-mooxy text-[11px] leading-relaxed relative z-10 italic">
               "{result.policySummary}"
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Logic for Admin */}
            <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl">
               <p className="text-white/30 text-[9px] uppercase tracking-widest mb-2 font-bold">Logic for Admin</p>
               <p className="text-white/60 font-mooxy text-[11px] leading-relaxed">
                 {result.reasoning}
               </p>
            </div>

            {/* Future Guidance */}
            <div className="bg-amber-500/[0.03] border border-amber-500/10 p-3.5 rounded-2xl">
               <p className="text-amber-400/60 text-[9px] uppercase tracking-widest mb-2 font-bold">Future Guidance</p>
               <p className="text-amber-200/50 font-mooxy text-[11px] leading-relaxed italic">
                 {result.futureGuidance}
               </p>
            </div>
          </div>

          {/* Remark Preview & Action */}
          {result.suggestedRemark && (
            <div className="mt-2 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-[1.5rem] relative group">
              <div className="flex items-center justify-between mb-3">
                <p className="text-emerald-400/40 text-[9px] uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <MessageSquare size={10} /> Suggested Remark
                </p>
                {onApplyRemark && (
                  <button 
                    onClick={() => onApplyRemark(`${result.suggestedRemark}\n\n[ADMIN FEEDBACK]: ${result.futureGuidance}`)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mooxy uppercase tracking-wider border border-emerald-500/20 transition-all active:scale-95"
                  >
                    <Send size={11} /> Deploy & Advise
                  </button>
                )}
              </div>
              <p className="text-emerald-100/70 font-mooxy text-[12px] leading-relaxed pr-2">
                "{result.suggestedRemark}"
              </p>
              <div className="mt-2 pt-2 border-t border-emerald-500/5 flex items-center gap-2">
                 <ArrowRight size={10} className="text-emerald-500/30" />
                 <p className="text-emerald-500/30 text-[9px] font-mooxy italic truncate">Guidance will be appended on apply</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mt-3 mb-4 bg-[#0B0F19] border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all hover:border-indigo-500/20">
      <button
        type="button"
        onClick={toggleOpen}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
            <Sparkles size={12} className="text-indigo-400" />
          </div>
          <span className="text-white/60 font-mooxy text-[11px] font-semibold tracking-wide uppercase">Institutional Policy Consultant</span>
        </div>
        <div className="flex items-center gap-3">
          {result && (
            <span className={`text-[10px] font-bold font-mooxy ${decisionConfig[result.decision]?.colorClass.split(" ")[0]} bg-white/5 px-2 py-0.5 rounded-md border border-current opacity-60`}>
              {result.decision}
            </span>
          )}
          {open ? (
            <ChevronUp size={14} className="text-white/20" />
          ) : (
            <ChevronDown size={14} className="text-white/20" />
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-white/5 bg-gradient-to-b from-indigo-500/[0.02] to-transparent">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default ApprovalAISuggestion;
;
