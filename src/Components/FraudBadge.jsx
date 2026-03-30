import { useState, useEffect } from "react";
import { ShieldAlert, Shield, ShieldCheck, Loader2 } from "lucide-react";
import { getFraudCheck } from "../utils/GETFraudCheck";

const riskConfig = {
  Low: { icon: ShieldCheck, colorClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25" },
  Medium: { icon: Shield, colorClass: "text-amber-400 bg-amber-400/10 border-amber-400/25" },
  High: { icon: ShieldAlert, colorClass: "text-red-400 bg-red-400/10 border-red-400/25 animate-pulse" },
};

/**
 * FraudBadge — Fetches risk level for a student and displays a small badge.
 * Designed to be placed next to a student's name in admin tables.
 */
const FraudBadge = ({ studentId, token, expanded = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId || !token) return;
    
    let isMounted = true;
    const fetchRisk = async () => {
      setLoading(true);
      const res = await getFraudCheck(studentId, token);
      if (isMounted && res) {
        setData(res);
      }
      if (isMounted) setLoading(false);
    };

    fetchRisk();
    return () => { isMounted = false; };
  }, [studentId, token]);

  if (loading) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-white/5 bg-white/[0.02]">
        <Loader2 size={10} className="animate-spin text-white/30" />
      </span>
    );
  }

  if (!data) return null;

  const cfg = riskConfig[data.riskLevel] || riskConfig.Low;
  const Icon = cfg.icon;

  if (!expanded) {
    // Just the small pill
    return (
      <span 
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border ${cfg.colorClass} cursor-help`}
        title={data.flagReason}
      >
        <Icon size={10} strokeWidth={2.5} /> {data.riskLevel} RISK
      </span>
    );
  }

  // Expanded version (for request cards or profile views)
  return (
    <div className={`mt-2 p-3 rounded-xl border ${cfg.colorClass.replace("animate-pulse", "")} bg-opacity-5 flex items-start gap-3`}>
      <Icon size={16} className={`mt-0.5 flex-shrink-0 ${cfg.colorClass.split(" ")[0]}`} />
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold uppercase tracking-wider ${cfg.colorClass.split(" ")[0]}`}>
            {data.riskLevel} Risk Profile
          </span>
          <span className="text-white/30 text-[10px]">({data.stats?.total || 0} recent requests)</span>
        </div>
        <p className={`text-xs leading-relaxed ${cfg.colorClass.split(" ")[0].replace("400", "200")}`}>
          {data.flagReason}
        </p>
      </div>
    </div>
  );
};

export default FraudBadge;
