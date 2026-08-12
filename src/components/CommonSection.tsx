import React from 'react';
import { commonQuestions } from '../data/questions';
import QuestionRenderer from './QuestionRenderer';
import { ChevronLeft } from 'lucide-react';

interface CommonSectionProps {
  answers: Record<string, any>;
  onChange: (answers: Record<string, any>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CommonSection({ answers, onChange, onNext, onPrev }: CommonSectionProps) {
  const handleQuestionChange = (questionId: string, value: any) => {
    onChange({ ...answers, [questionId]: value });
  };

  const visibleQuestions = commonQuestions.filter((q) => {
    if (!q.dependsOn) return true;
    return answers[q.dependsOn.questionId] === q.dependsOn.value;
  });

  const isFormValid = visibleQuestions
    .filter((q) => q.required)
    .every((q) => {
      const answer = answers[q.id];
      if (q.type === 'radio') return !!answer;
      if (q.type === 'text') return !!answer && answer.trim() !== '';
      if (q.type === 'text-multiple') {
        if (!Array.isArray(answer)) return false;
        return answer.some((val) => val && val.trim() !== '');
      }
      return true;
    });

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-md border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-5 py-4 sm:px-10 sm:py-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800">الجزء الأول: الصفحة المشتركة</h2>
        <p className="text-sm text-slate-500 mt-1">
          ثمانية أسئلة تُملأ مرة واحدة مهما كان تخصصك. إجابتها تحدّد شكل الشاشة نفسها.
        </p>
      </div>

      <div className="flex-1 p-5 sm:p-8 md:p-10 overflow-auto">
        <div className="space-y-6">
          {visibleQuestions.map((q, i) => (
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
          رجوع
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="flex-1 sm:flex-none px-4 sm:px-10 py-3 rounded-xl bg-[#1e293b] text-white font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          التالي
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
