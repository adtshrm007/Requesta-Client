import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, RefreshCw, Loader2, ArrowRight } from "lucide-react";
import { getSystemInsights } from "../utils/GETSystemInsights";

/**
 * SystemInsightsPanel — AI system-wide insights for Admin Dashboard
 */
const SystemInsightsPanel = ({ token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    const res = await getSystemInsights(token);
    if (!res) {
      setError("Failed to generate system insights.");
    } else {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [token]);

  return (
    <div className="mt-10 lg:mt-12 bg-gradient-to-br from-indigo-500/[0.05] to-purple-500/[0.02] border border-indigo-500/20 rounded-2xl overflow-hidden relative shadow-xl shadow-indigo-500/5">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="p-6 sm:p-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Sparkles size={20} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="font-growmajour text-2xl text-white">AI System Insights</h2>
              <p className="text-indigo-300/60 font-mooxy text-xs mt-0.5">
                Automated analysis of the last 30 days
              </p>
            </div>
          </div>

          <button
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-mooxy transition-all disabled:opacity-50 w-fit"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Refresh Insights
          </button>
        </div>

        {loading && !data && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-indigo-300/60">
            <Loader2 size={24} className="animate-spin text-indigo-400" />
            <p className="font-mooxy text-sm">Analyzing system patterns...</p>
          </div>
        )}

        {error && !data && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-mooxy text-sm flex items-center gap-2">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trends */}
            <div className="bg-[#0B0F19]/50 border border-white/5 rounded-xl p-5 hover:border-indigo-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <TrendingUp size={16} className="text-sky-400" />
                </div>
                <h3 className="text-sky-100 font-mooxy font-semibold text-sm uppercase tracking-wider">Observed Trends</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {data.trends?.length > 0 ? (
                  data.trends.map((t, i) => (
                    <li key={i} className="flex gap-2 text-white/60 font-mooxy text-sm leading-relaxed">
                      <span className="text-sky-500 mt-1 flex-shrink-0">›</span> {t}
                    </li>
                  ))
                ) : (
                  <p className="text-white/30 text-xs italic">No significant trends detected.</p>
                )}
              </ul>
            </div>

            {/* Alerts */}
            <div className="bg-[#0B0F19]/50 border border-white/5 rounded-xl p-5 hover:border-red-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-400" />
                </div>
                <h3 className="text-red-100 font-mooxy font-semibold text-sm uppercase tracking-wider">Actionable Alerts</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {data.alerts?.length > 0 ? (
                  data.alerts.map((a, i) => (
                    <li key={i} className="flex gap-2 text-white/60 font-mooxy text-sm leading-relaxed">
                      <span className="text-red-500 mt-1 flex-shrink-0">›</span> {a}
                    </li>
                  ))
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <p className="text-white/40 text-sm font-mooxy">All systems nominal. No alerts.</p>
                  </div>
                )}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="bg-[#0B0F19]/50 border border-white/5 rounded-xl p-5 hover:border-amber-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Lightbulb size={16} className="text-amber-400" />
                </div>
                <h3 className="text-amber-100 font-mooxy font-semibold text-sm uppercase tracking-wider">AI Suggestions</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {data.suggestions?.length > 0 ? (
                  data.suggestions.map((s, i) => (
                    <li key={i} className="flex gap-2 text-white/60 font-mooxy text-sm leading-relaxed">
                      <span className="text-amber-500 mt-1 flex-shrink-0">›</span> {s}
                    </li>
                  ))
                ) : (
                  <p className="text-white/30 text-xs italic">No suggestions available.</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemInsightsPanel;
