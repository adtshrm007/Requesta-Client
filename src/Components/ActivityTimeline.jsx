import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, ArrowRight, FileText, User } from "lucide-react";

const actionConfig = {
  REQUEST_CREATED: { label: "Request Created", icon: FileText, color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
  REQUEST_FORWARDED: { label: "Forwarded", icon: ArrowRight, color: "text-sky-400 bg-sky-400/10 border-sky-400/20" },
  REQUEST_APPROVED: { label: "Approved", icon: CheckCircle, color: "text-green-400 bg-green-400/10 border-green-400/20" },
  REQUEST_REJECTED: { label: "Rejected", icon: XCircle, color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

/**
 * ActivityTimeline — displays the audit log history for a request.
 * @param {Array} logs - array of AuditLog documents
 * @param {boolean} loading
 */
const ActivityTimeline = ({ logs = [], loading = false }) => {
  if (loading) {
    return (
      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-white/30 font-mooxy text-xs animate-pulse">Loading activity…</p>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-white/25 font-mooxy text-xs">No activity recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      <p className="text-white/40 font-mooxy text-[11px] uppercase tracking-wider mb-3">
        Activity Timeline
      </p>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[13px] top-1 bottom-1 w-px bg-white/8" />

        <div className="flex flex-col gap-3">
          {logs.map((log, idx) => {
            const cfg = actionConfig[log.action] || actionConfig.REQUEST_CREATED;
            const Icon = cfg.icon;
            return (
              <div key={log._id || idx} className="flex items-start gap-3 relative">
                {/* Icon node */}
                <div className={`w-7 h-7 rounded-full border flex-shrink-0 flex items-center justify-center relative z-10 ${cfg.color}`}>
                  <Icon size={12} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mooxy border ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    <span className="text-white/25 font-mooxy text-[10px]">
                      {new Date(log.createdAt).toLocaleString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">
                    <User size={10} className="text-white/30" />
                    <span className="text-white/50 font-mooxy text-xs">
                      {log.performedByName}
                    </span>
                    <span className="text-white/20 font-mooxy text-[10px]">
                      ({log.role})
                    </span>
                  </div>

                  {log.remarks && (
                    <p className="text-white/35 font-mooxy text-xs mt-1 italic">
                      "{log.remarks}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
