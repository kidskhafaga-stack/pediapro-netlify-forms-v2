import React from 'react';
import { specialtiesList } from '../types';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, ChevronLeft } from 'lucide-react';

interface SpecialtySelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function SpecialtySelector({ selected, onChange, onNext, onPrev }: SpecialtySelectorProps) {
  const toggleSpecialty = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const isFormValid = selected.length > 0;

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-md border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-5 py-4 sm:px-10 sm:py-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800">ما المجالات التي تمارسها فعليًا في طب الأطفال؟</h2>
        <p className="text-sm text-slate-500 mt-1">
          يمكنك اختيار أكثر من مجال إذا كنت تمارسه فعليًا.
        </p>
      </div>

      <div className="flex-1 p-5 sm:p-8 md:p-10 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialtiesList.map((spec) => (
            <div
              key={spec.id}
              className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                selected.includes(spec.id)
                  ? 'border-[#1477af] bg-[#1477af]/5'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => toggleSpecialty(spec.id)}
            >
              <Checkbox.Root
                className="bg-white w-6 h-6 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1477af]/50 data-[state=checked]:bg-[#1477af] data-[state=checked]:border-[#1477af] flex items-center justify-center transition-all"
                checked={selected.includes(spec.id)}
                onCheckedChange={() => toggleSpecialty(spec.id)}
                id={`spec-${spec.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox.Indicator className="text-white">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                className="text-slate-800 font-bold mr-4 cursor-pointer select-none flex-1 text-[15px] leading-snug"
                htmlFor={`spec-${spec.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                {spec.label}
              </label>
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
