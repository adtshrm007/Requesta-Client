import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdvancedAnalytics } from "../utils/GETAdvancedAnalytics";
import { TrendingUp, FileText, ArrowLeft, Loader2, Users, Calendar, Activity, Database, PieChart as PieChartIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import Footer from "./Footer";
import logo from "../assets/logo.svg.png";
import gsap from "gsap";

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("adminaccessToken");
      if (!token) {
        navigate("/adminlogin");
        return;
      }
      
      const res = await getAdvancedAnalytics(token);
      if (res) {
        setData(res);
      } else {
        setError("Failed to load analytics data.");
      }
      setLoading(false);
    };
    
    fetchAnalytics();
  }, [navigate]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0D1117]/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl shadow-indigo-500/10 outline-none z-50">
          <p className="text-white/60 font-mooxy text-xs mb-2 pb-2 border-b border-white/10">{label}</p>
          {payload.map((p, i) => (
            <div key={i} className="flex items-center gap-3 mt-1.5" style={{ color: p.color }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
              <p className="font-growmajour text-lg mb-0 leading-none">
                {p.name}: <span className="text-white ml-1">{p.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827] flex flex-col">
      {/* Navbar */}
      <nav ref={navRef} className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/85 backdrop-blur-xl opacity-0">
        <div className="max-w-[1400px] mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <img src={logo} alt="Requesta" className="w-5 h-5" />
              </div>
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">REQUESTA</span>
            </div>
          </Link>

          <div>
            <Link to="/admindashboard">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
                <ArrowLeft size={14} /> Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div ref={contentRef} className="flex-1 max-w-[1400px] w-full mx-auto px-5 py-10 opacity-0">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mooxy mb-3">
            <Activity size={11} /> Platform Analytics
          </div>
          <h1 className="font-growmajour text-3xl sm:text-4xl text-white">Advanced Insights</h1>
          <p className="text-white/40 font-mooxy text-sm mt-2">Deep dive into request patterns and distributions.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={32} className="animate-spin text-indigo-500" />
            <p className="text-white/40 font-mooxy text-sm">Gathering analytics data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
            <p className="text-red-400 font-mooxy">{error}</p>
          </div>
        ) : data && (
          <div className="flex flex-col gap-8">
            
            {/* Top Row Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Monthly Trend Area Chart */}
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <TrendingUp size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-growmajour text-lg">Leave Approval Trends</h2>
                    <p className="text-white/40 font-mooxy text-xs">Last 6 months processing activity</p>
                  </div>
                </div>
                
                <div className="flex-1 min-h-[300px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'inherit'}} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'inherit'}} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '12px', opacity: 0.8 }} />
                      <Area type="monotone" dataKey="approved" name="Approved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorApproved)" />
                      <Area type="monotone" dataKey="rejected" name="Rejected" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorRejected)" />
                      <Area type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={2} fillOpacity={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Leave Reasons Bar Chart */}
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Database size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-growmajour text-lg">Leave Reasons</h2>
                    <p className="text-white/40 font-mooxy text-xs">Categorized by AI (Last 30 days)</p>
                  </div>
                </div>

                <div className="flex-1 min-h-[300px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data.leaveReasons} margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                      <XAxis type="number" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                      <YAxis type="category" dataKey="reason" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.8)', fontSize: 11}} width={100} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.02)'}} />
                      <Bar dataKey="count" name="Count" fill="#f97316" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Department Distribution (If applicable) */}
              {data.deptDistribution && data.deptDistribution.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col group hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PieChartIcon size={18} className="text-sky-400" />
                      </div>
                      <div>
                        <h2 className="text-white font-growmajour text-lg">By Department</h2>
                        <p className="text-white/40 font-mooxy text-xs">Overall leave volume</p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-sky-400 font-growmajour text-2xl">{data.deptDistribution.reduce((acc, curr) => acc + curr.count, 0)}</p>
                      <p className="text-white/30 font-mooxy text-[10px] uppercase tracking-wider">Total</p>
                    </div>
                  </div>

                  <div className="flex-1 mt-2 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[300px]">
                    {data.deptDistribution.map((d, i) => {
                      const total = data.deptDistribution.reduce((acc, curr) => acc + curr.count, 0);
                      const percentage = Math.round((d.count / (total || 1)) * 100);
                      return (
                        <div key={i} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-xs font-mooxy">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                              <span className="text-white/80">{d.department || "Unknown"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-white/40">{percentage}%</span>
                              <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md">{d.count}</span>
                            </div>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${percentage}%`, backgroundColor: COLORS[i % COLORS.length] }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Certificate Breakdown */}
              {data.certByType && data.certByType.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <FileText size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-white font-growmajour text-lg">Certificate Types</h2>
                      <p className="text-white/40 font-mooxy text-xs">Distribution of cert requests</p>
                    </div>
                  </div>

                  <div className="flex-1 min-h-[220px] w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.certByType} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="type" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 11}} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 11}} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.02)'}} />
                        <Bar dataKey="count" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Top Applicants list */}
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col h-full lg:col-span-1 border-t-4 border-t-red-500/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Users size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-growmajour text-lg">Frequent Applicants</h2>
                    <p className="text-white/40 font-mooxy text-xs">Top users (Last 30 days)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {data.frequentApplicants?.length > 0 ? (
                    data.frequentApplicants.map((applicant, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-mooxy text-xs font-bold">
                            #{i + 1}
                          </div>
                          <div>
                            <p className="text-white font-mooxy text-sm group-hover:text-red-300 transition-colors">
                              {applicant.name}
                            </p>
                            <p className="text-white/40 font-mooxy text-[10px] mt-0.5">
                              {applicant.regNumber} • {applicant.branch}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-red-400 font-growmajour text-xl leading-none">{applicant.count}</span>
                          <p className="text-white/30 font-mooxy text-[9px] uppercase tracking-wider">Requests</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-white/30 text-sm font-mooxy">No data available.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <Footer />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
