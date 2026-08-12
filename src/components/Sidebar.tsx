import { useState } from 'react';
import { AppState, specialtiesList } from '../types';
import { ChevronDown } from 'lucide-react';

interface SidebarProps {
  state: AppState;
  goToStep: (step: number) => void;
}

export default function Sidebar({ state, goToStep }: SidebarProps) {
  const reviewStepIndex = 3 + state.selectedSpecialties.length;
  const [expanded, setExpanded] = useState(false);

  const getSpecialtyLabel = (id: string) => specialtiesList.find(s => s.id === id)?.label || id;

  const steps: { title: string; stepIndex: number }[] = [
    { title: 'البيانات المشتركة', stepIndex: 1 },
    { title: 'تحديد التخصصات', stepIndex: 2 },
    ...state.selectedSpecialties.map((specId, index) => ({
      title: getSpecialtyLabel(specId),
      stepIndex: 3 + index,
    })),
  ];
  if (state.selectedSpecialties.length > 0) {
    steps.push({ title: 'المراجعة النهائية', stepIndex: reviewStepIndex });
  }

  const currentIndex = Math.max(0, steps.findIndex((s) => s.stepIndex === state.step));
  const currentTitle = steps[currentIndex]?.title || '';

  const renderSidebarItem = (title: string, stepIndex: number, currentStep: number) => {
    const isPast = currentStep > stepIndex;
    const isCurrent = currentStep === stepIndex;

    if (isPast) {
      return (
        <button
          onClick={() => { goToStep(stepIndex); setExpanded(false); }}
          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity text-right"
        >
          <span className="text-sm font-medium text-slate-700">{title}</span>
          <span className="text-emerald-500 text-xs font-bold">مكتمل</span>
        </button>
      );
    }

    if (isCurrent) {
      return (
        <div className="p-3 rounded-xl bg-[#1477af]/10 border border-[#1477af]/20 flex items-center justify-between ring-2 ring-[#1477af]/5">
          <span className="text-sm font-bold text-[#1477af]">{title}</span>
          <span className="w-2 h-2 rounded-full bg-[#1477af] animate-pulse"></span>
        </div>
      );
    }

    return (
      <button
        onClick={() => { goToStep(stepIndex); setExpanded(false); }}
        disabled={stepIndex > 2 && state.selectedSpecialties.length === 0}
        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors text-right disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm font-medium text-slate-600">{title}</span>
        <span className="text-slate-400 text-xs font-bold">قادم</span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile: compact horizontal progress + collapsible step list, so the
          question content isn't pushed below a tall step list on a small screen. */}
      <div className="md:hidden bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between"
        >
          <div className="text-right">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              خطوة {currentIndex + 1} من {steps.length}
            </p>
            <p className="text-sm font-bold text-[#1477af] font-tajawal">{currentTitle}</p>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        <div className="flex items-center gap-1.5 mt-3">
          {steps.map((s, i) => (
            <div
              key={s.stepIndex}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentIndex ? 'bg-[#1477af]' : 'bg-slate-150 bg-slate-200'}`}
            />
          ))}
        </div>
        {expanded && (
          <div className="mt-4 space-y-2">
            {steps.map((s) => (
              <div key={s.stepIndex}>{renderSidebarItem(s.title, s.stepIndex, state.step)}</div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: full vertical step list. */}
      <aside className="hidden md:flex w-64 bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex-col gap-4 shrink-0 h-fit max-h-full">
        <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">مسار النموذج</h3>
        <div className="space-y-2 overflow-y-auto pr-1">
          {steps.map((s) => (
            <div key={s.stepIndex}>{renderSidebarItem(s.title, s.stepIndex, state.step)}</div>
          ))}
        </div>
        <div className="mt-auto pt-4">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              يمكنك التنقل بين الأقسام المختارة، سيتم حفظ إجاباتك تلقائياً في كل خطوة.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
