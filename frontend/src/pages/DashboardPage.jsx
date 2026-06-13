import { useState, useMemo } from 'react';
import { 
  AlertTriangle, MapPin, Activity, Clock, CheckCircle2, 
  FileText, Brain, Map, ArrowUpRight, ArrowDownRight, 
  MoreVertical, Lightbulb, TrendingUp, Sparkles, Layers, ShieldAlert,
  Search, X
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell 
} from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { useDashboard } from '../hooks/useDashboard';

const statusColors = {
  'OPEN': '#f59e0b',
  'IN_PROGRESS': '#3b82f6',
  'RESOLVED': '#10b981',
  'REJECTED': '#ef4444',
  'Open': '#f59e0b',
  'In Progress': '#3b82f6',
  'Resolved': '#10b981',
  'Rejected': '#ef4444'
};

const priorityOrder = {
  'CRITICAL': 1,
  'HIGH': 2,
  'MEDIUM': 3,
  'LOW': 4
};

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    stats,
    categories,
    statuses,
    daily,
    recentReports,
    criticalIncidents,
    departments,
    aiInsights,
    loading,
    error,
    refresh
  } = useDashboard();

  // Search, sorting, and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Line Chart Data conversion
  const lineData = useMemo(() => {
    if (!daily || daily.length === 0) return [];
    return daily.map(d => ({
      name: d.date,
      value: d.count
    }));
  }, [daily]);

  // 2. Bar Chart Data conversion
  const barData = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    return categories.map(c => ({
      name: c.category,
      value: c.count
    }));
  }, [categories]);

  // 3. Pie Chart Data conversion
  const pieData = useMemo(() => {
    if (!statuses || statuses.length === 0) return [];
    return statuses.map(s => {
      const formattedName = s.status === 'OPEN' ? 'Open' :
                            s.status === 'IN_PROGRESS' ? 'In Progress' :
                            s.status === 'RESOLVED' ? 'Resolved' :
                            s.status === 'REJECTED' ? 'Rejected' : s.status;
      return {
        name: formattedName,
        value: s.count,
        color: statusColors[s.status] || '#cbd5e1'
      };
    });
  }, [statuses]);

  const totalStatusReports = useMemo(() => {
    return pieData.reduce((acc, curr) => acc + curr.value, 0);
  }, [pieData]);

  // 4. Critical Incidents sorting by priority
  const sortedCriticalIncidents = useMemo(() => {
    if (!criticalIncidents) return [];
    const sorted = [...criticalIncidents].sort((a, b) => {
      const pA = priorityOrder[a.priority?.toUpperCase()] || 99;
      const pB = priorityOrder[b.priority?.toUpperCase()] || 99;
      return pA - pB;
    });

    return sorted.map(inc => {
      const dateObj = new Date(inc.createdAt);
      const timeStr = isNaN(dateObj.getTime()) ? inc.createdAt : dateObj.toLocaleDateString();
      return {
        id: `INC-${inc.id}`,
        title: inc.title,
        loc: inc.location,
        prio: inc.priority ? inc.priority.charAt(0) + inc.priority.slice(1).toLowerCase() : 'Unknown',
        status: inc.status === 'OPEN' ? 'Active' : inc.status,
        time: timeStr
      };
    });
  }, [criticalIncidents]);

  // 5. Department Performance mapping
  const mappedDepartments = useMemo(() => {
    if (!departments) return [];
    const colors = ['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500'];
    return departments.map((dept, index) => {
      const rate = dept.casesHandled > 0 ? Math.round((dept.resolvedCases / dept.casesHandled) * 100) : 0;
      return {
        name: dept.name,
        handled: dept.casesHandled,
        resolved: dept.resolvedCases,
        time: dept.responseTime,
        score: rate,
        color: colors[index % colors.length]
      };
    });
  }, [departments]);

  // 6. Recent Reports table processing
  const mappedRecentReports = useMemo(() => {
    if (!recentReports) return [];
    return recentReports.map(item => ({
      id: `#${item.id}`,
      title: item.title,
      cat: item.category,
      prio: item.priority ? item.priority.charAt(0) + item.priority.slice(1).toLowerCase() : 'Medium',
      status: item.status === 'IN_PROGRESS' ? 'In Progress' : (item.status ? item.status.charAt(0) + item.status.slice(1).toLowerCase() : 'Open'),
      dept: item.department,
      date: item.createdAt,
      rawDate: item.createdAt
    }));
  }, [recentReports]);

  // Search filtering
  const filteredReports = useMemo(() => {
    return mappedRecentReports.filter(report => {
      const search = searchTerm.toLowerCase();
      return (
        report.title.toLowerCase().includes(search) ||
        report.cat.toLowerCase().includes(search) ||
        report.prio.toLowerCase().includes(search) ||
        report.status.toLowerCase().includes(search) ||
        report.dept.toLowerCase().includes(search)
      );
    });
  }, [mappedRecentReports, searchTerm]);

  // Sorting
  const sortedReports = useMemo(() => {
    const sorted = [...filteredReports];
    sorted.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'date') {
        valA = new Date(a.rawDate).getTime();
        valB = new Date(b.rawDate).getTime();
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredReports, sortField, sortOrder]);

  // Pagination
  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedReports.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedReports, currentPage]);

  const totalPages = Math.ceil(sortedReports.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-8 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-rise" style={{ animationDelay: '0s' }}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20 tracking-wider">LIVE DASHBOARD</span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 text-xs font-bold border border-indigo-500/20 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI ACTIVE
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 tracking-tight  drop-shadow-sm">
            City Command Center
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-xl">
            Real-time monitoring of city incidents, AI-driven analytics, and department performance metrics.
          </p>
        </div>
        {user?.role === 'CITIZEN' && (
          <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-slate-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] flex items-center gap-2 transform hover:-translate-y-0.5">
            <Activity className="w-4 h-4 group-hover:animate-pulse" /> 
            Generate Report
          </button>
        )}
      </div>

      {/* ERROR ALERT DISPLAY */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-600 px-5 py-4 rounded-2xl flex items-center justify-between gap-3 text-sm animate-rise backdrop-blur-md" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            </div>
            <span><strong className="text-rose-300">Connection Interrupted:</strong> {error}. Ensure backend services are operational.</span>
          </div>
          <button onClick={refresh} className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold rounded-xl transition-colors">
            Retry Connection
          </button>
        </div>
      )}

      {/* SECTION 1: STATISTICS CARDS */}
      {loading && !stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard delay="0.1s" title="Total Reports" value={stats?.totalReports?.toLocaleString() ?? "0"} icon={Layers} trend="+12.5%" isUp desc="vs last month" color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" />
          <StatCard delay="0.15s" title="Open Incidents" value={stats?.openReports?.toLocaleString() ?? "0"} icon={Clock} trend="-5.2%" isUp={false} desc="needs attention" color="text-amber-600" bg="bg-amber-500/10" border="border-amber-500/20" />
          <StatCard delay="0.2s" title="Resolved Cases" value={stats?.resolvedReports?.toLocaleString() ?? "0"} icon={CheckCircle2} trend="+18.1%" isUp desc="successfully closed" color="text-emerald-600" bg="bg-emerald-500/10" border="border-emerald-500/20" />
          <StatCard delay="0.25s" title="Critical Alerts" value={stats?.criticalIncidents?.toLocaleString() ?? "0"} icon={ShieldAlert} trend="+2.4%" isUp desc="immediate action req." color="text-rose-600" bg="bg-rose-500/10" border="border-rose-500/20" glow />
        </div>
      )}

      {/* SECTION 2 & 3: CHARTS AND CRITICAL */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Area Chart */}
          {loading && !lineData.length ? (
            <ChartCardSkeleton />
          ) : (
            <ChartCard delay="0.3s" title="Incident Velocity (7 Days)" icon={<TrendingUp className="w-5 h-5 text-cyan-400" />}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(12px)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'}} 
                    itemStyle={{color: '#e2e8f0', fontWeight: 'bold'}} 
                  />
                  <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={4} fillOpacity={1} fill="url(#colorReports)" activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Bar Chart */}
          {loading && !barData.length ? (
            <ChartCardSkeleton />
          ) : (
            <ChartCard delay="0.35s" title="Category Breakdown" icon={<Layers className="w-5 h-5 text-indigo-600" />}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBars" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}}/>
                  <YAxis dataKey="name" type="category" stroke="#e2e8f0" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#cbd5e1'}} width={90} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                    contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(12px)'}} 
                  />
                  <Bar dataKey="value" fill="url(#colorBars)" radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </div>

        {/* SECTION 3: CRITICAL INCIDENTS */}
        {loading && !sortedCriticalIncidents.length ? (
          <CriticalIncidentsSkeleton />
        ) : (
          <div className="glass ai-glow rounded-3xl p-6 relative overflow-hidden flex flex-col animate-rise border-rose-500/20" style={{ animationDelay: '0.4s' }}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500 drop-shadow-sm" /> 
                Critical Incidents
              </h3>
              <span className="bg-rose-500/20 border border-rose-500/30 text-rose-600 text-xs px-3 py-1.5 rounded-full font-bold animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]">LIVE</span>
            </div>
            
            <div className="space-y-3 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {sortedCriticalIncidents.map((inc, i) => (
                <div key={inc.id} className="p-4 rounded-2xl border border-rose-500/20 bg-rose-50/50 hover:bg-rose-100 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_8px_20px_-5px_rgba(244,63,94,0.2)]">
                  <div className="flex justify-between items-start mb-2.5">
                    <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-rose-700 transition-colors max-w-[75%]">{inc.title}</h4>
                    <span className="text-[10px] font-bold text-rose-300 bg-rose-500/10 px-2 py-1 rounded-md">{inc.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-rose-500/10">
                    <span className="flex items-center gap-1.5 text-slate-600 bg-slate-50/50 px-2 py-1 rounded-md">
                      <MapPin className="w-3 h-3 text-rose-600" /> {inc.loc}
                    </span>
                    <span className="text-rose-600 font-extrabold uppercase tracking-widest flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                      {inc.status}
                    </span>
                  </div>
                </div>
              ))}
              {sortedCriticalIncidents.length === 0 && (
                <div className="text-center py-12 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <span className="text-slate-500 text-sm font-medium">All clear. No critical incidents.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MID SECTION: AI, MAP, DEPT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* SECTION 7: AI INSIGHTS */}
        <div className="glass ai-glow rounded-3xl p-6 relative overflow-hidden group animate-rise lg:col-span-1 border-indigo-500/20" style={{ animationDelay: '0.45s' }}>
          <div className="absolute -left-10 top-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/30 transition-all pointer-events-none"></div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
            <Brain className="w-6 h-6 text-indigo-600 drop-shadow-sm" /> 
            AI Analysis
          </h3>
          {loading && !aiInsights ? (
            <AiInsightsSkeleton />
          ) : (
            <div className="space-y-4 relative z-10">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-500/20 hover:bg-indigo-100 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 blur-xl rounded-full"></div>
                <p className="text-xs text-indigo-300 font-bold mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5"/> Trend Alert
                </p>
                <p className="text-sm text-slate-800 font-medium leading-relaxed">
                  Road damage reports increased by <span className="text-rose-600 font-bold px-1 py-0.5 bg-rose-500/10 rounded">{aiInsights?.weeklyTrend ?? "0%"}</span> this week.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 hover:bg-slate-100 transition-colors">
                  <p className="text-[10px] text-amber-600 font-bold mb-1 uppercase tracking-wider">Top Issue</p>
                  <p className="text-xs text-slate-900 font-semibold line-clamp-2">{aiInsights?.mostCommonIssue ?? "None"}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 hover:bg-slate-100 transition-colors">
                  <p className="text-[10px] text-rose-600 font-bold mb-1 uppercase tracking-wider">Risk Zone</p>
                  <p className="text-xs text-slate-900 font-semibold line-clamp-2">{aiInsights?.highestRiskArea ?? "None"}</p>
                </div>
              </div>

              <div className="mt-2 p-5 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 backdrop-blur-md relative overflow-hidden group/rec">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover/rec:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                <p className="text-xs text-indigo-300 font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-300"/> Action Plan
                </p>
                <p className="text-sm text-indigo-900 font-medium leading-relaxed">
                  {aiInsights?.recommendation ?? "No recommendation available."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: CITY MAP PREVIEW */}
        <div className="glass rounded-3xl p-1.5 relative overflow-hidden flex flex-col group animate-rise lg:col-span-2 xl:col-span-2 border-slate-200/50" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-white opacity-80 z-0"></div>
          <div className="absolute inset-0 opacity-30 z-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50 z-0"></div>
          
          <div className="relative z-10 flex-1 rounded-2xl bg-slate-50/60 border border-slate-200/50 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm min-h-[300px]">
            {/* Fake Map Markers */}
            <div className="absolute top-[25%] left-[35%] flex flex-col items-center animate-bounce" style={{animationDuration: '3s'}}>
              <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(244,63,94,1)] relative">
                 <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-75"></div>
              </div>
            </div>
            <div className="absolute top-[65%] left-[55%] flex flex-col items-center animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
              <div className="w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
            </div>
            <div className="absolute top-[40%] left-[70%] flex flex-col items-center animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
              <div className="w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 backdrop-blur-md flex flex-col items-center transform group-hover:scale-105 transition-transform duration-500 shadow-2xl">
              <div className="p-3 bg-blue-500/20 rounded-xl mb-4 border border-blue-500/30">
                <Map className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Live City Grid</h3>
              <p className="text-sm text-slate-600 mb-5 text-center font-medium">
                <span className="text-rose-600 font-bold">{sortedCriticalIncidents.length}</span> Active Alerts
              </p>
              <button className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-blue-600 hover:to-indigo-600 border border-slate-600 hover:border-blue-500 text-slate-900 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                Launch Map Viewer <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 6: DEPARTMENT PERFORMANCE */}
        {loading && !mappedDepartments.length ? (
          <DepartmentPerformanceSkeleton />
        ) : (
          <div className="glass rounded-3xl p-6 flex flex-col animate-rise lg:col-span-1 xl:col-span-1" style={{ animationDelay: '0.55s' }}>
            <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" /> Performance
            </h3>
            <div className="space-y-6 flex-1">
              {mappedDepartments.map(dept => (
                <div key={dept.name} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-700 font-bold">{dept.name}</span>
                    <span className="text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider border border-emerald-500/20">{dept.score}% SCORE</span>
                  </div>
                  <div className="w-full bg-slate-50 rounded-full h-2.5 mb-2.5 border border-slate-200/50 overflow-hidden">
                    <div className={`${dept.color} h-full rounded-full relative transition-all duration-1000 ease-out`} style={{width: `${dept.score}%`}}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>{dept.resolved} / {dept.handled} resolved</span>
                    <span className="text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {dept.time} avg</span>
                  </div>
                </div>
              ))}
              {mappedDepartments.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-sm">No department data.</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: TABLE & PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-rise" style={{ animationDelay: '0.6s' }}>
        
        {/* SECTION 4: RECENT REPORTS TABLE */}
        <div className="glass rounded-3xl p-6 lg:col-span-2 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" /> Recent Submissions
              </h3>
              <div className="flex items-center gap-3 bg-slate-50/50 p-1.5 rounded-xl border border-slate-200/50 backdrop-blur-md">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter reports..."
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-9 pr-8 py-2 rounded-lg bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500 focus:bg-white/50 transition-all w-48 sm:w-64"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 p-1 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-slate-200/50 bg-slate-50/30">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-slate-500 uppercase bg-white border-b border-slate-200/50 font-bold tracking-wider">
                  <tr>
                    <th className="px-5 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => handleSort('id')}>
                      <div className="flex items-center gap-1">ID {sortField === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
                    </th>
                    <th className="px-5 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => handleSort('title')}>
                      <div className="flex items-center gap-1">Details {sortField === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
                    </th>
                    <th className="px-5 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => handleSort('cat')}>
                      <div className="flex items-center gap-1">Category {sortField === 'cat' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
                    </th>
                    <th className="px-5 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => handleSort('prio')}>
                      <div className="flex items-center gap-1">Priority {sortField === 'prio' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
                    </th>
                    <th className="px-5 py-4 cursor-pointer hover:text-slate-900 transition-colors" onClick={() => handleSort('status')}>
                      <div className="flex items-center gap-1">Status {sortField === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}</div>
                    </th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                {loading && !recentReports.length ? (
                  <TableSkeleton />
                ) : (
                  <tbody className="divide-y divide-slate-200/50">
                    {paginatedReports.map(row => (
                      <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-5 py-4 text-slate-500 font-semibold">{row.id}</td>
                        <td className="px-5 py-4">
                          <div className="text-slate-900 font-bold group-hover:text-blue-300 transition-colors truncate max-w-[200px]">{row.title}</div>
                          <div className="text-[11px] text-slate-500 mt-1 font-medium flex items-center gap-1.5">
                            <Clock className="w-3 h-3" /> {row.date}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-md bg-white text-slate-600 text-xs font-medium border border-slate-200">{row.cat}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border tracking-wide uppercase ${row.prio === 'Critical' || row.prio === 'High' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' : row.prio === 'Medium' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                            {row.prio}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`flex items-center gap-2 text-xs font-bold w-max px-2.5 py-1 rounded-md border ${row.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : row.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-white/50 text-slate-600 border-slate-200'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Resolved' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : row.status === 'In Progress' ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-slate-400'}`}></div>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-slate-500 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors bg-white/50 border border-transparent hover:border-slate-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {sortedReports.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-slate-500 text-sm bg-slate-50/20">
                          <div className="flex flex-col items-center gap-2">
                            <Search className="w-8 h-8 text-slate-600" />
                            <span>No reports match your filters.</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200/50 relative z-10">
              <div className="text-xs font-medium text-slate-500">
                Showing <span className="text-slate-900">{Math.min(sortedReports.length, (currentPage - 1) * itemsPerPage + 1)}</span> to <span className="text-slate-900">{Math.min(sortedReports.length, currentPage * itemsPerPage)}</span> of <span className="text-slate-900">{sortedReports.length}</span> results
              </div>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reports by Status Chart */}
        <div className="glass rounded-3xl p-6 flex flex-col justify-between border-slate-200/50 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50/80 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" /> Resolution Status
            </h3>
            {loading && !pieData.length ? (
              <div className="h-64 flex items-center justify-center animate-pulse">
                <div className="w-40 h-40 rounded-full border-[10px] border-slate-300 border-t-slate-600"></div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center relative drop-shadow-xl">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie 
                      data={pieData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={75} 
                      outerRadius={95} 
                      paddingAngle={6} 
                      dataKey="value" 
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth={3}
                      cornerRadius={8}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(12px)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'}} 
                      itemStyle={{color: '#fff', fontWeight: 'bold'}} 
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">{totalStatusReports.toLocaleString()}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">Total</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/60 border border-slate-200/50 hover:bg-slate-100 transition-colors">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: d.color, boxShadow: `0 0 10px ${d.color}80`}}></div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{d.name}</div>
                  <div className="text-sm font-extrabold text-slate-900">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function StatCard({ title, value, icon: Icon, trend, isUp, desc, color, bg, border, glow, delay }) {
  return (
    <div className={`glass rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 animate-rise group hover:-translate-y-1 hover:shadow-2xl ${glow ? 'ai-glow border-rose-500/20 hover:border-rose-500/40' : 'border-slate-200/50 hover:border-cyan-500/30'}`} style={{ animationDelay: delay }}>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`${bg} ${color} p-3.5 rounded-2xl border ${border} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1.5 rounded-lg border shadow-sm ${isUp ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border-rose-500/20'}`}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</h4>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{value}</h2>
        <p className="text-[11px] text-slate-500 mt-2 font-semibold bg-slate-50/50 inline-block px-2 py-1 rounded-md">{desc}</p>
      </div>
    </div>
  );
}

function ChartCard({ title, icon, children, delay }) {
  return (
    <div className="glass rounded-3xl p-6 h-96 flex flex-col animate-rise border-slate-200/50 relative overflow-hidden" style={{ animationDelay: delay }}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none"></div>
      <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
        {icon} {title}
      </h3>
      <div className="flex-1 w-full min-h-0 relative z-10">
        {children}
      </div>
    </div>
  );
}

// Skeletons
function StatCardSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col justify-between animate-pulse border-slate-300">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white h-14 w-14 rounded-2xl"></div>
        <div className="bg-white h-6 w-16 rounded-lg"></div>
      </div>
      <div>
        <div className="bg-white h-3 w-24 rounded mb-3"></div>
        <div className="bg-white h-10 w-20 rounded-lg"></div>
        <div className="bg-white h-4 w-32 rounded mt-3"></div>
      </div>
    </div>
  );
}

function ChartCardSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 h-96 flex flex-col animate-pulse border-slate-300">
      <div className="h-6 bg-white w-1/3 rounded-lg mb-8"></div>
      <div className="flex-1 bg-slate-50 rounded-xl"></div>
    </div>
  );
}

function CriticalIncidentsSkeleton() {
  return (
    <div className="glass ai-glow rounded-3xl p-6 flex flex-col animate-pulse h-[400px] border-slate-300">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-white w-1/2 rounded-lg"></div>
        <div className="h-6 bg-white w-12 rounded-full"></div>
      </div>
      <div className="space-y-4 flex-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 rounded-2xl border border-slate-300 bg-slate-100 h-24"></div>
        ))}
      </div>
    </div>
  );
}

function AiInsightsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/50 h-20"></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 h-20"></div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/50 h-20"></div>
      </div>
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/50 h-24"></div>
    </div>
  );
}

function DepartmentPerformanceSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col animate-pulse h-[400px] border-slate-300">
      <div className="h-6 bg-white w-1/2 rounded-lg mb-8"></div>
      <div className="space-y-6 flex-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 bg-white w-1/3 rounded-md"></div>
              <div className="h-4 bg-white w-12 rounded-md"></div>
            </div>
            <div className="h-2.5 bg-white rounded-full"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-white w-1/4 rounded-md"></div>
              <div className="h-3 bg-white w-1/4 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <tbody className="divide-y divide-slate-200/50 animate-pulse">
      {[1, 2, 3, 4, 5].map(i => (
        <tr key={i}>
          <td className="px-5 py-4"><div className="h-4 bg-white rounded w-10"></div></td>
          <td className="px-5 py-4">
            <div className="h-4 bg-white rounded w-48 mb-2"></div>
            <div className="h-3 bg-white rounded w-24"></div>
          </td>
          <td className="px-5 py-4"><div className="h-5 bg-white rounded-md w-20"></div></td>
          <td className="px-5 py-4"><div className="h-5 bg-white rounded-md w-16"></div></td>
          <td className="px-5 py-4"><div className="h-5 bg-white rounded-md w-24"></div></td>
          <td className="px-5 py-4"><div className="h-6 bg-white rounded-lg w-6 ml-auto"></div></td>
        </tr>
      ))}
    </tbody>
  );
}
