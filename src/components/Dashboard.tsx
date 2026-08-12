import React, { useMemo, useState } from 'react';
import { Download, Users, BarChart3, AlertCircle, Phone, Check, Activity, Target, Database } from 'lucide-react';
import { Submission, specialtiesList } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  onClose: () => void;
}

const COLORS = ['#1477af', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function Dashboard({ onClose }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'survey' | 'trial'>('trial');
  const [filterSegment, setFilterSegment] = useState<string>('All');
  const [filterFacility, setFilterFacility] = useState<string>('All');
  
  const submissions: Submission[] = useMemo(() => {
    try {
      const stored = localStorage.getItem('pediapro_submissions');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }, []);

  const totalSubmissions = submissions.length;

  const handleExportSurvey = () => {
    if (submissions.length === 0) return;

    const headers = [
      'التاريخ',
      'الاسم',
      'الدرجة العلمية',
      'التخصصات المختارة',
      'طلب العرض (3 أشهر)',
      'رقم الهاتف',
      'البريد الإلكتروني',
      'الإجابات (JSON)'
    ].join(',');

    const rows = submissions.map(sub => {
      const { state } = sub;
      const specs = state.selectedSpecialties.map(id => specialtiesList.find(s => s.id === id)?.label || id).join(' | ');
      
      const allAnswers = {
        common: state.commonAnswers,
        specialties: state.specialtyAnswers
      };

      const row = [
        new Date(sub.timestamp).toLocaleString('ar-EG'),
        `"${state.doctorName}"`,
        `"${state.degree}"`,
        `"${specs}"`,
        state.offerAccepted ? 'نعم' : 'لا',
        `"${state.offerPhone || ''}"`,
        `"${state.offerEmail || ''}"`,
        `"${JSON.stringify(allAnswers).replace(/"/g, '""')}"` // Escape quotes for CSV
      ];
      return row.join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pediapro_survey_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportTrial = () => {
    const trialLeads = submissions.filter(s => s.state.trialData?.trialChoice === 'YES');
    if (trialLeads.length === 0) return;

    const headers = [
      'التاريخ', 'الاسم', 'الهاتف', 'البريد الإلكتروني', 'قرار التجربة',
      'نوع المنشأة', 'عدد الأطباء', 'تعدد التخصصات', 'التخصصات',
      'عدد الفروع', 'زيارات المرضى', 'النظام الحالي', 'استضافة النظام',
      'طريقة الدفع', 'الميزانية الشهرية', 'الميزانية السنوية',
      'الخصائص المطلوبة', 'توقيت الشراء', 'Lead Score', 'Lead Segment'
    ].join(',');

    const rows = trialLeads.map(sub => {
      const { state } = sub;
      const t = state.trialData || {};
      
      const row = [
        new Date(sub.timestamp).toLocaleString('ar-EG'),
        `"${state.doctorName}"`,
        `"${state.offerPhone || ''}"`,
        `"${state.offerEmail || ''}"`,
        `"${t.trialChoice || ''}"`,
        `"${t.facilityType || ''} ${t.facilityTypeOther ? `(${t.facilityTypeOther})` : ''}"`,
        `"${t.doctorCount || ''}"`,
        `"${t.specialtyType || ''}"`,
        `"${(t.specialties || []).join(' | ')} ${t.specialtiesOther ? `(${t.specialtiesOther})` : ''}"`,
        `"${t.branchCount || ''}"`,
        `"${t.monthlyVisits || ''}"`,
        `"${t.currentSystem || ''} ${t.currentSystemName ? `(${t.currentSystemName})` : ''}"`,
        `"${t.hostingPreference || ''}"`,
        `"${t.paymentPreference || ''}"`,
        `"${t.monthlyBudget || ''}"`,
        `"${t.annualBudget || ''}"`,
        `"${(t.requestedFeatures || []).join(' | ')} ${t.requestedFeaturesOther ? `(${t.requestedFeaturesOther})` : ''}"`,
        `"${t.purchaseTimeline || ''}"`,
        `"${t.leadScore || ''}"`,
        `"${t.leadSegment || ''}"`
      ];
      return row.join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pediapro_trial_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Survey Data Processing ---
  const specialtyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    specialtiesList.forEach(s => counts[s.id] = 0);
    submissions.forEach(sub => {
      sub.state.selectedSpecialties.forEach(spec => {
        if (counts[spec] !== undefined) counts[spec]++;
      });
    });
    return counts;
  }, [submissions]);

  const gapSpecialties = useMemo(() => {
    return specialtiesList.filter(s => specialtyCounts[s.id] === 0);
  }, [specialtyCounts]);

  const offerAcceptedCount = submissions.filter(s => s.state.offerAccepted).length;
  const offerPercentage = totalSubmissions > 0 ? Math.round((offerAcceptedCount / totalSubmissions) * 100) : 0;

  // --- Trial Data Processing ---
  const allTrialLeads = useMemo(() => submissions.filter(s => s.state.trialData?.trialChoice === 'YES'), [submissions]);
  const moreInfoLeads = useMemo(() => submissions.filter(s => s.state.trialData?.trialChoice === 'MORE_INFO'), [submissions]);

  const trialLeads = useMemo(() => {
    return allTrialLeads.filter(lead => {
      const matchSegment = filterSegment === 'All' || lead.state.trialData?.leadSegment === filterSegment;
      const matchFacility = filterFacility === 'All' || lead.state.trialData?.facilityType === filterFacility;
      return matchSegment && matchFacility;
    });
  }, [allTrialLeads, filterSegment, filterFacility]);

  const totalTrialLeads = trialLeads.length;

  const facilityTypesList = useMemo(() => {
    const types = new Set(allTrialLeads.map(l => l.state.trialData?.facilityType).filter(Boolean));
    return Array.from(types) as string[];
  }, [allTrialLeads]);

  const facilityTypeChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    trialLeads.forEach(s => {
      const type = s.state.trialData?.facilityType || 'غير محدد';
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [trialLeads]);

  const requestedFeaturesChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    trialLeads.forEach(s => {
      (s.state.trialData?.requestedFeatures || []).forEach(feat => {
        counts[feat] = (counts[feat] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
  }, [trialLeads]);

  const leadSegmentsData = useMemo(() => {
    const counts: Record<string, number> = {};
    trialLeads.forEach(s => {
      const segment = s.state.trialData?.leadSegment || 'Unknown';
      counts[segment] = (counts[segment] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [trialLeads]);


  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BarChart3 className="text-[#1477af]" />
          Dashboard & Market Intelligence
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300 transition-colors"
          >
            العودة للنموذج
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-0">
        <button
          onClick={() => setActiveTab('trial')}
          className={`px-6 py-3 font-bold text-sm rounded-t-xl transition-all ${activeTab === 'trial' ? 'bg-white text-[#1477af] border-t border-l border-r border-slate-200 shadow-[0_4px_0_0_white]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Trial & Market Intelligence
          </div>
        </button>
        <button
          onClick={() => setActiveTab('survey')}
          className={`px-6 py-3 font-bold text-sm rounded-t-xl transition-all ${activeTab === 'survey' ? 'bg-white text-[#1477af] border-t border-l border-r border-slate-200 shadow-[0_4px_0_0_white]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Survey Results
          </div>
        </button>
      </div>

      <div className="mt-2 relative">
        {/* Trial & Market Intelligence Tab */}
        {activeTab === 'trial' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">تحليل طلبات الفترة التجريبية (Leads)</h3>
              <button
                onClick={handleExportTrial}
                className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg font-bold hover:bg-[#059669] transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                تصدير العملاء (CSV)
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Lead Segment</label>
                <select 
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                  value={filterSegment}
                  onChange={e => setFilterSegment(e.target.value)}
                >
                  <option value="All">الكل (All)</option>
                  <option value="High Potential">High Potential</option>
                  <option value="Medium Potential">Medium Potential</option>
                  <option value="Small Practice">Small Practice</option>
                  <option value="Research / Not Ready">Research / Not Ready</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">نوع المنشأة</label>
                <select 
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                  value={filterFacility}
                  onChange={e => setFilterFacility(e.target.value)}
                >
                  <option value="All">الكل (All)</option>
                  {facilityTypesList.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold mb-1">إجمالي طلبات Trial</p>
                <p className="text-3xl font-black text-[#1477af]">{totalTrialLeads}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold mb-1">مهتم بمعرفة المزيد</p>
                <p className="text-3xl font-black text-amber-500">{moreInfoLeads.length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold mb-1">High Potential Leads</p>
                <p className="text-3xl font-black text-emerald-500">
                  {trialLeads.filter(l => l.state.trialData?.leadSegment === 'High Potential').length}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold mb-1">Trial Conversion Rate</p>
                <p className="text-3xl font-black text-slate-800">
                  {totalSubmissions > 0 ? Math.round((totalTrialLeads / totalSubmissions) * 100) : 0}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Facility Types Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="text-md font-bold text-slate-700 mb-6 text-center">نوع المنشأة</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={facilityTypeChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {facilityTypeChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Lead Segments Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="text-md font-bold text-slate-700 mb-6 text-center">Lead Segments</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadSegmentsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                      <RechartsTooltip cursor={{ fill: '#f1f5f9' }} />
                      <Bar dataKey="value" fill="#1477af" radius={[4, 4, 0, 0]}>
                        {leadSegmentsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                            entry.name === 'High Potential' ? '#10b981' : 
                            entry.name === 'Medium Potential' ? '#3b82f6' : 
                            entry.name === 'Small Practice' ? '#8b5cf6' : '#94a3b8'
                          } />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Requested Features */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h4 className="text-md font-bold text-slate-700 mb-6">أهم الخصائص المطلوبة (Top Features)</h4>
              <div className="space-y-4">
                {requestedFeaturesChartData.map((feat, index) => {
                  const percentage = Math.round((feat.value / Math.max(totalTrialLeads, 1)) * 100);
                  return (
                    <div key={feat.name} className="flex items-center gap-4">
                      <div className="w-8 text-center text-sm font-bold text-slate-400">{index + 1}</div>
                      <div className="w-48 text-sm font-bold text-slate-700 truncate">{feat.name}</div>
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
                        <div 
                          className="h-full rounded-full bg-[#1477af]" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-16 text-left text-sm font-black text-slate-600">{feat.value} ({percentage}%)</div>
                    </div>
                  );
                })}
                {requestedFeaturesChartData.length === 0 && (
                  <p className="text-center text-slate-400 py-4">لا توجد بيانات كافية</p>
                )}
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h4 className="font-bold text-slate-800">أحدث طلبات Trial</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-4">الاسم</th>
                      <th className="p-4">رقم الهاتف</th>
                      <th className="p-4">Segment</th>
                      <th className="p-4">المنشأة</th>
                      <th className="p-4">التوقيت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialLeads.slice(0, 10).map((lead) => (
                      <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-800">{lead.state.doctorName}</td>
                        <td className="p-4 text-slate-600" dir="ltr">{lead.state.offerPhone}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            lead.state.trialData?.leadSegment === 'High Potential' ? 'bg-emerald-100 text-emerald-700' :
                            lead.state.trialData?.leadSegment === 'Medium Potential' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {lead.state.trialData?.leadSegment}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600 truncate max-w-[150px]">{lead.state.trialData?.facilityType}</td>
                        <td className="p-4 text-slate-600">{lead.state.trialData?.purchaseTimeline}</td>
                      </tr>
                    ))}
                    {trialLeads.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">لا توجد طلبات بعد</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Survey Tab */}
        {activeTab === 'survey' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">بيانات الاستبيان الإكلينيكي</h3>
              <button
                onClick={handleExportSurvey}
                className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg font-bold hover:bg-[#059669] transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                تصدير الإجابات (CSV)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-slate-500 font-bold mb-1">إجمالي المشاركين</h3>
                <p className="text-4xl font-black text-slate-800">{totalSubmissions}</p>
              </div>

              {/* Offer Interest Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-3">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-slate-500 font-bold mb-1">المهتمين بالعرض (إجمالي)</h3>
                <p className="text-4xl font-black text-slate-800">{offerAcceptedCount} <span className="text-lg text-emerald-500 font-bold">({offerPercentage}%)</span></p>
              </div>

              {/* Gap Analysis Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center border-l-4 border-l-rose-500">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-slate-500 font-bold mb-1">تخصصات لم تُغطى (Gap)</h3>
                <p className="text-4xl font-black text-rose-600">{gapSpecialties.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              {/* Breakdown */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">توزيع التخصصات (Specialty Breakdown)</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pl-2">
                  {specialtiesList.map(spec => {
                    const count = specialtyCounts[spec.id] || 0;
                    const max = Math.max(...(Object.values(specialtyCounts) as number[]), 1);
                    const percentage = Math.round((count / max) * 100);
                    
                    return (
                      <div key={spec.id} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-bold text-slate-700 truncate" title={spec.label}>{spec.label}</div>
                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${count > 0 ? 'bg-[#1477af]' : 'bg-transparent'}`} 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="w-8 text-left text-sm font-black text-slate-600">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gap List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">التخصصات الناقصة (تحتاج تسويق)</h3>
                {gapSpecialties.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-emerald-500">
                    <Check className="w-12 h-12 mb-2 opacity-50" />
                    <p className="font-bold">رائع! تم تغطية جميع التخصصات.</p>
                  </div>
                ) : (
                  <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                    {gapSpecialties.map(spec => (
                      <li key={spec.id} className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 rounded-xl font-medium text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {spec.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
