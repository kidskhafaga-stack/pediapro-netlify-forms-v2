import React from 'react';
import { SpecialtySection } from '../types';
import QuestionRenderer from './QuestionRenderer';
import { ChevronLeft } from 'lucide-react';

interface SpecialtySectionFormProps {
  section: SpecialtySection;
  answers: Record<string, any>;
  onChange: (answers: Record<string, any>) => void;
  onNext: () => void;
  onPrev: () => void;
  progress: {
    current: number;
    total: number;
  };
}

export default function SpecialtySectionForm({
  section,
  answers,
  onChange,
  onNext,
  onPrev,
  progress,
}: SpecialtySectionFormProps) {
  const handleQuestionChange = (questionId: string, value: any) => {
    onChange({ ...answers, [questionId]: value });
  };

  const isFormValid = section.questions
    .filter((q) => q.required)
    .every((q) => {
      const answer = answers[q.id];
      if (q.type === 'radio') return !!answer;
      if (q.type === 'checkbox') {
        const selected = answer?.selected;
        return Array.isArray(selected) && selected.length > 0;
      }
      if (q.type === 'composite') {
        // Just require at least one field to be filled for simplicity, 
        // or require all depending on logic. Let's say we need at least one field.
        if (!answer) return false;
        return Object.values(answer).some((val) => val && String(val).trim() !== '');
      }
      if (q.type === 'text-multiple') {
        if (!Array.isArray(answer)) return false;
        return answer.some((val) => val && val.trim() !== '');
      }
      return true;
    });

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-md border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="px-5 py-4 sm:px-10 sm:py-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800">{section.title}</h2>
        <p className="text-sm text-slate-500 mt-1">
          يرجى ملء تفاصيل هذا التخصص بناءً على طريقتك الفعلية.
        </p>
      </div>

      <div className="flex-1 p-5 sm:p-8 md:p-10 overflow-auto">
        <div className="space-y-6">
          {section.questions.map((q, i) => (
            <div key={q.id} className="flex gap-3 sm:gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
              <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 text-slate-500 text-xs sm:text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <QuestionRenderer
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => handleQuestionChange(q.id, val)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-4 sm:p-6 flex justify-between items-center mt-auto safe-bottom">
        <button
          onClick={onPrev}
          className="flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm sm:text-base"
        >
          السابق
        </button>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-slate-400">القسم {progress.current} من أصل {progress.total}</span>
          <button
            onClick={onNext}
            disabled={!isFormValid}
            className="flex-1 sm:flex-none px-4 sm:px-10 py-3 rounded-xl bg-[#1e293b] text-white font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {progress.current === progress.total ? 'المراجعة النهائية' : 'التالي'}
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
