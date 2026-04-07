import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Loader2, AlertCircle, CheckCircle } from "lucide-react";

const inputCls =
  "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all";

/**
 * AIAssistantPanel — AI-powered request helper.
 *
 * Props:
 *   token     {string}   - auth token
 *   type      {string}   - "LEAVE" | "CERTIFICATE"
 *   onApply   {function} - called with { title, description } when user accepts AI output
 */
const AIAssistantPanel = ({ token, type = "LEAVE", onApply }) => {
  const [open, setOpen] = useState(false);
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!rawText.trim() || rawText.trim().length < 5) {
      setError("Please describe your request in at least a few words.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const BASE_URL = "https://requesta-server-3.onrender.com";
      const res = await fetch(`${BASE_URL}/api/ai/generate-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rawText, type }),
      });
      const data = await res.json();
      if (data) {
        setResult(data);
      } else {
        setError("AI assistant is not available. Please fill in the details manually.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not reach AI service. Please fill in the form manually.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (result && onApply) {
      onApply({ 
        subject: result.subject || result.title, 
        body: result.body || result.description,
        startDate: result.extractedStartDate,
        endDate: result.extractedEndDate
      });
      setOpen(false);
    }
  };

  const themes = {
    CERTIFICATE: {
      textMain: "text-purple-300",
      textSub: "text-purple-200",
      textFaded: "text-purple-400/60",
      bgSolid: "bg-purple-600 hover:bg-purple-500 shadow-purple-500/20",
      bgSoft: "bg-purple-500/5",
      bgSofter: "bg-purple-500/5 hover:bg-purple-500/5",
      bgLogo: "bg-purple-500/20",
      borderMain: "border-purple-500/15",
      borderSub: "border-purple-500/30",
      borderFaded: "border-purple-500/10",
    },
    LEAVE: {
      textMain: "text-indigo-300",
      textSub: "text-indigo-200",
      textFaded: "text-indigo-400/60",
      bgSolid: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20",
      bgSoft: "bg-indigo-500/5",
      bgSofter: "bg-indigo-500/5 hover:bg-indigo-500/5",
      bgLogo: "bg-indigo-500/20",
      borderMain: "border-indigo-500/15",
      borderSub: "border-indigo-500/30",
      borderFaded: "border-indigo-500/10",
    }
  };
  const theme = themes[type] || themes.LEAVE;

  return (
    <div className={`mb-5 ${theme.bgSoft} border ${theme.borderMain} rounded-2xl overflow-hidden`}>
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2.5 px-4 py-3 text-left ${theme.bgSofter} transition-all`}
      >
        <div className={`w-7 h-7 rounded-lg ${theme.bgLogo} border ${theme.borderSub} flex items-center justify-center`}>
          <Sparkles size={13} className={theme.textMain} />
        </div>
        <div className="flex-1">
          <p className={`${theme.textSub} font-mooxy text-sm font-medium`}>AI Request Assistant</p>
          <p className={`${theme.textFaded} font-mooxy text-xs`}>
            Describe your request in plain language — AI will formalize it
          </p>
        </div>
        {open ? (
          <ChevronUp size={14} className={theme.textFaded} />
        ) : (
          <ChevronDown size={14} className={theme.textFaded} />
        )}
      </button>

      {open && (
        <div className={`px-4 pb-4 border-t ${theme.borderFaded}`}>
          <div className="mt-3">
            <label className="text-white/50 font-mooxy text-xs mb-1.5 block">
              Describe your request in plain language
            </label>
            <textarea
              rows={3}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={
                type === "CERTIFICATE"
                  ? "e.g. I need certificate for applying to a job..."
                  : "e.g. I'm sick and need a few days off for rest..."
              }
              className={`${inputCls} resize-none`}
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className={`mt-2.5 flex items-center gap-2 px-4 py-2 rounded-xl ${theme.bgSolid} disabled:opacity-50 text-white text-sm font-mooxy transition-all shadow-lg`}
          >
            {loading ? (
              <><Loader2 size={13} className="animate-spin" /> Generating…</>
            ) : (
              <><Sparkles size={13} /> Generate with AI</>
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300 font-mooxy text-xs">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-3 bg-white/[0.03] border border-white/8 rounded-xl p-4">
              <div className="mb-3">
                <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-1">
                  Generated Title
                </p>
                <p className="text-white font-mooxy text-sm font-semibold">{result.subject || result.title}</p>
              </div>

              <div className="mb-3">
                <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-1">
                  Formal Description
                </p>
                <p className="text-white/70 font-mooxy text-sm leading-relaxed">
                  {result.body || result.description}
                </p>
              </div>

              {result.suggestions && result.suggestions.length > 0 && (
                <div className="mb-3">
                  <p className="text-white/35 font-mooxy text-[11px] uppercase tracking-wider mb-2">
                    Suggestions
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400/15 border border-amber-400/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-amber-300 text-[8px] font-bold">{i + 1}</span>
                        </div>
                        <p className="text-amber-200/60 font-mooxy text-xs">{s}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.error && (
                <p className="text-amber-300/60 font-mooxy text-xs mb-3 italic">{result.error}</p>
              )}

              <button
                type="button"
                onClick={handleApply}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/25 border border-green-500/25 text-green-300 text-xs font-mooxy transition-all"
              >
                <CheckCircle size={11} /> Apply to Form
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAssistantPanel;
