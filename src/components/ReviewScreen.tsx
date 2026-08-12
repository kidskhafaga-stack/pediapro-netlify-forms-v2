import React from 'react';
import { AppState, specialtiesList } from '../types';
import { Check, Edit2 } from 'lucide-react';

interface ReviewScreenProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
}

export default function ReviewScreen({ state, updateState, onEditStep, onSubmit }: ReviewScreenProps) {
  const getSpecialtyLabel = (id: string) => {
    return specialtiesList.find((s) => s.id === id)?.label || id;
  };

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-md border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-5 py-4 sm:px-10 sm:py-6 border-b border-slate-100 bg-slate-50/50 text-center">
        <h2 className="text-2xl font-bold text-slate-800">المراجعة النهائية</h2>
        <p className="text-sm text-slate-500 mt-1">يرجى التأكد من صحة البيانات قبل الإرسال.</p>
      </div>

      <div className="flex-1 p-5 sm:p-8 md:p-10 overflow-auto">
        <div className="space-y-8 max-w-2xl mx-auto">
          {/* Doctor Info */}
          <section>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
              <h3 className="text-xl font-bold text-slate-800">بيانات الطبيب</h3>
              <button onClick={() => onEditStep(0)} className="text-[#1477af] hover:text-[#0f5c86]">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700">
              <div>
                <span className="font-bold block text-xs text-slate-400 uppercase tracking-widest mb-1">الاسم</span>
                {state.doctorName}
              </div>
              <div>
                <span className="font-bold block text-xs text-slate-400 uppercase tracking-widest mb-1">الدرجة العلمية</span>
                {state.degree}
              </div>
              <div>
                <span className="font-bold block text-xs text-slate-400 uppercase tracking-widest mb-1">التاريخ</span>
                <span dir="ltr">{state.date}</span>
              </div>
            </div>
          </section>

          {/* Selected Specialties */}
          <section>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
              <h3 className="text-xl font-bold text-slate-800">المجالات المختارة</h3>
              <button onClick={() => onEditStep(2)} className="text-[#1477af] hover:text-[#0f5c86]">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 font-medium">
              {state.selectedSpecialties.map((specId) => (
                <li key={specId} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-[#1477af]/10 text-[#1477af] flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-bold">{getSpecialtyLabel(specId)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#1477af]/5 to-slate-50 border border-[#1477af]/20 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-[#1477af]"></div>
          <h3 className="text-xl font-bold text-[#1477af] mb-3 flex items-center gap-2">
            عرض خاص وحصري!
          </h3>
          <p className="text-slate-700 mb-6 font-medium text-lg leading-relaxed">
            هل ترغب في الحصول على فترة تجريبية من PediaPro عند إطلاقه؟
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => updateState({ trialData: { ...state.trialData, trialChoice: 'YES' }, offerAccepted: true })}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 ${state.trialData?.trialChoice === 'YES' ? 'bg-[#1477af] text-white shadow-lg shadow-[#1477af]/30 border-2 border-[#1477af]' : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-[#1477af]/50 hover:bg-slate-50'}`}
            >
              نعم، أريد تجربة النظام
            </button>
            <button
              onClick={() => updateState({ trialData: { ...state.trialData, trialChoice: 'MORE_INFO' }, offerAccepted: null })}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 ${state.trialData?.trialChoice === 'MORE_INFO' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 border-2 border-amber-500' : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-amber-500/50 hover:bg-slate-50'}`}
            >
              أريد معرفة المزيد أولاً
            </button>
            <button
              onClick={() => updateState({ trialData: { ...state.trialData, trialChoice: 'NO' }, offerAccepted: false })}
              className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 ${state.trialData?.trialChoice === 'NO' ? 'bg-slate-500 text-white shadow-lg shadow-slate-500/30 border-2 border-slate-500' : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50'}`}
            >
              لا حالياً
            </button>
          </div>

          {(state.trialData?.trialChoice === 'YES' || state.trialData?.trialChoice === 'MORE_INFO') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف (للتواصل)</label>
                <input 
                  type="tel"
                  dir="ltr"
                  value={state.offerPhone || ''}
                  onChange={(e) => updateState({ offerPhone: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1477af]/20 focus:border-[#1477af] transition-all bg-white font-medium text-left"
                  placeholder="01xxxxxxxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني (اختياري)</label>
                <input 
                  type="email"
                  dir="ltr"
                  value={state.offerEmail || ''}
                  onChange={(e) => updateState({ offerEmail: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1477af]/20 focus:border-[#1477af] transition-all bg-white font-medium text-left"
                  placeholder="doctor@example.com"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-4 sm:p-6 flex justify-between items-center mt-auto safe-bottom">
        <button
          onClick={() => onEditStep(state.step - 1)}
          className="flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm sm:text-base"
        >
          رجوع
        </button>
        <button
          onClick={onSubmit}
          disabled={((state.trialData?.trialChoice === 'YES' || state.trialData?.trialChoice === 'MORE_INFO') && !state.offerPhone) || state.isSubmitting}
          className={`flex-1 sm:flex-none px-4 sm:px-10 py-3 rounded-xl font-bold transition-all flex items-center justify-center min-w-[120px] text-sm sm:text-base ${((state.trialData?.trialChoice === 'YES' || state.trialData?.trialChoice === 'MORE_INFO') && !state.offerPhone) || state.isSubmitting ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#1e293b] text-white shadow-lg shadow-slate-200 hover:bg-slate-800'}`}
        >
          {(state.trialData?.trialChoice === 'YES' || state.trialData?.trialChoice === 'MORE_INFO') ? 'التالي' : (state.isSubmitting ? 'جاري الإرسال...' : 'إرسال')}
        </button>
      </div>
    </div>
  );
}
