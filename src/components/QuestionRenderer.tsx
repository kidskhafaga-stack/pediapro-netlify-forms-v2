import React, { useState } from 'react';
import { Question } from '../types';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, Info } from 'lucide-react';

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export default function QuestionRenderer({ question, value, onChange }: QuestionRendererProps) {
  const isRequired = question.required;
  const [showInfo, setShowInfo] = useState(true);

  const renderTitle = () => (
    <div className="mb-3">
      <div className="flex items-start gap-2">
        <label className="block text-[15px] sm:text-base font-bold text-slate-800 leading-snug">
          {question.title}
          {isRequired && <span className="text-rose-500 mr-1">*</span>}
        </label>
        {question.infoText && (
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="توضيح إضافي"
            aria-expanded={showInfo}
            className={`shrink-0 mt-0.5 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold transition-colors ${showInfo ? 'border-[#1477af]/20 bg-[#1477af]/[0.06] text-[#1477af]' : 'border-slate-200 bg-white text-slate-500 hover:text-[#1477af]'}`}
          >
            <span>معلومة</span>
            <Info className="w-[13px] h-[13px]" />
          </button>
        )}
      </div>
      {question.infoText && (
        <div
          className={`mt-2.5 overflow-hidden rounded-xl border border-[#1477af]/15 bg-[#1477af]/[0.06] p-3.5 text-[13.5px] leading-relaxed text-slate-600 transition-all duration-200 ${
            showInfo ? 'max-h-48 opacity-100 visible' : 'max-h-0 opacity-0 invisible p-0 border-transparent'
          }`}
        >
          {question.infoText}
        </div>
      )}
    </div>
  );

  if (question.type === 'radio') {
    return (
      <div className="space-y-4">
        {renderTitle()}
        <RadioGroup.Root
          className="grid grid-cols-1 gap-2.5"
          value={value || ''}
          onValueChange={onChange}
        >
          {question.options?.map((opt) => {
            const isSelected = value === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  isSelected ? 'border-[#1477af] bg-[#1477af]/[0.06]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <RadioGroup.Item
                  className="shrink-0 bg-white w-5 h-5 rounded-full border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1477af]/50 data-[state=checked]:border-[#1477af] flex items-center justify-center transition-all"
                  value={opt.id}
                  id={`${question.id}-${opt.id}`}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#1477af]" />
                </RadioGroup.Item>
                <span className={`text-[15px] leading-snug cursor-pointer select-none flex-1 ${isSelected ? 'font-bold text-slate-800' : 'font-medium text-slate-700'}`}>
                  {opt.label}
                </span>
              </label>
            );
          })}
        </RadioGroup.Root>
      </div>
    );
  }

  if (question.type === 'checkbox') {
    const selectedValues = Array.isArray(value?.selected) ? value.selected : [];
    const addValues = value?.addValues || {};

    const toggleCheckbox = (id: string) => {
      const isSelected = selectedValues.includes(id);
      const newSelected = isSelected
        ? selectedValues.filter((v: string) => v !== id)
        : [...selectedValues, id];
      
      onChange({ selected: newSelected, addValues });
    };

    const updateAddValue = (id: string, text: string) => {
      onChange({
        selected: selectedValues,
        addValues: { ...addValues, [id]: text }
      });
    };

    return (
      <div className="space-y-4">
        {renderTitle()}
        <div className="grid grid-cols-1 gap-2.5">
          {question.options?.map((opt) => {
            const isSelected = selectedValues.includes(opt.id);
            return (
              <div key={opt.id} className="flex flex-col gap-2">
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    isSelected ? 'border-[#1477af] bg-[#1477af]/[0.06]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Checkbox.Root
                    className="shrink-0 bg-white w-5 h-5 rounded-md border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1477af]/50 data-[state=checked]:bg-[#1477af] data-[state=checked]:border-[#1477af] flex items-center justify-center transition-all"
                    checked={isSelected}
                    onCheckedChange={() => toggleCheckbox(opt.id)}
                    id={`${question.id}-${opt.id}`}
                  >
                    <Checkbox.Indicator className="text-white">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className={`text-[15px] leading-snug cursor-pointer select-none flex-1 ${isSelected ? 'font-bold text-slate-800' : 'font-medium text-slate-700'}`}>
                    {opt.label}
                  </span>
                </label>
                {opt.hasAddInput && selectedValues.includes(opt.id) && (
                  <div className="mr-8">
                    <input
                      type="text"
                      value={addValues[opt.id] || ''}
                      onChange={(e) => updateAddValue(opt.id, e.target.value)}
                      className="w-full p-3 rounded-lg border border-dashed border-slate-300 focus:outline-none focus:border-[#1477af] text-[15px]"
                      placeholder="التفاصيل..."
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === 'text') {
    return (
      <div className="space-y-4">
        {renderTitle()}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder || 'اكتب هنا...'}
          className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1477af]/20 focus:border-[#1477af] transition-colors bg-white text-[15px] placeholder:text-slate-400"
        />
      </div>
    );
  }

  if (question.type === 'text-multiple') {
    const inputsCount = question.textInputsCount || 1;
    const labels = question.textInputsLabels || Array(inputsCount).fill('');
    const currentValues = Array.isArray(value) ? value : Array(inputsCount).fill('');

    const handleChange = (index: number, text: string) => {
      const newValues = [...currentValues];
      newValues[index] = text;
      onChange(newValues);
    };

    return (
      <div className="space-y-4">
        {renderTitle()}
        <div className="grid grid-cols-1 gap-2.5">
          {Array.from({ length: inputsCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              {labels[i] && (
                <span className="text-sm text-slate-500 font-bold w-8 text-left">{labels[i]}</span>
              )}
              <input
                type="text"
                value={currentValues[i] || ''}
                onChange={(e) => handleChange(i, e.target.value)}
                className="flex-1 p-3.5 rounded-xl border border-dashed border-slate-300 focus:outline-none focus:border-[#1477af] text-[15px] placeholder:text-slate-400"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'composite') {
    const inputs = question.compositeInputs || [];
    const currentValues = value || {};

    const handleChange = (id: string, val: string) => {
      onChange({ ...currentValues, [id]: val });
    };

    return (
      <div className="space-y-4">
        {renderTitle()}
        <div className="grid grid-cols-1 gap-2.5">
          {inputs.map((input) => (
            <div key={input.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <label htmlFor={`${question.id}-${input.id}`} className="text-[15px] font-medium text-slate-700 flex-1 leading-snug">
                {input.label}
              </label>
              <input
                type={input.type}
                id={`${question.id}-${input.id}`}
                value={currentValues[input.id] || ''}
                onChange={(e) => handleChange(input.id, e.target.value)}
                className="w-24 sm:w-32 p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#1477af] focus:ring-2 focus:ring-[#1477af]/20 text-[15px] text-center font-semibold"
                dir={input.type === 'number' ? 'ltr' : 'rtl'}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
