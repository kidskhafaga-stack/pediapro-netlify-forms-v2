/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppState, specialtiesList } from './types';
import { commonQuestions, specialtySections } from './data/questions';

import StartScreen from './components/StartScreen';
import CommonSection from './components/CommonSection';
import SpecialtySelector from './components/SpecialtySelector';
import SpecialtySectionForm from './components/SpecialtySectionForm';
import ReviewScreen from './components/ReviewScreen';
import TrialQualificationScreen from './components/TrialQualificationScreen';
import SuccessScreen from './components/SuccessScreen';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Stethoscope, LayoutDashboard } from 'lucide-react';
import { flattenSubmission } from './utils/flattenSubmission';

const initialState: AppState = {
  step: 0,
  doctorName: '',
  degree: '',
  date: new Date().toISOString().split('T')[0],
  commonAnswers: {},
  selectedSpecialties: [],
  specialtyAnswers: {},
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [currentView, setCurrentView] = useState<'form' | 'dashboard'>('form');

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => updateState({ step: state.step + 1 });
  const prevStep = () => updateState({ step: state.step - 1 });
  const goToStep = (step: number) => updateState({ step });

  const handleFinalSubmit = async () => {
    updateState({ isSubmitting: true });
    
    const submissionData = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      state: state
    };

    try {
      // Keep a local copy so the built-in dashboard still works on the same browser.
      const stored = localStorage.getItem('pediapro_submissions');
      const submissions = stored ? JSON.parse(stored) : [];
      submissions.push(submissionData);
      localStorage.setItem('pediapro_submissions', JSON.stringify(submissions));

      // Central save: Netlify Forms (free on Netlify plans).
      // The form itself is declared in index.html so Netlify detects it at deploy time.
      // IMPORTANT: every field name posted here must also exist as a hidden input
      // in the blueprint form in index.html, or Netlify will silently drop it.
      const flat = flattenSubmission(state);

      const formData = new URLSearchParams();
      formData.append('form-name', 'pediapro-survey');
      formData.append('submission_id', submissionData.id);
      formData.append('submitted_at', submissionData.timestamp);
      formData.append('doctor_name', state.doctorName || '');
      formData.append('degree', state.degree || '');
      formData.append('visit_date', state.date || '');
      formData.append('email', state.offerEmail || '');
      formData.append('phone', state.offerPhone || '');
      Object.entries(flat).forEach(([key, value]) => {
        formData.append(key, value ?? '');
      });
      // Full JSON kept as a lossless backup copy — used later by the offline dashboard import tool.
      formData.append('payload', JSON.stringify(submissionData));
      // Honeypot must stay empty for legitimate submissions.
      formData.append('bot-field', '');

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`Netlify Forms submission failed: ${response.status}`);
      }
    } catch (e) {
      console.error("Failed to save submission centrally", e);
      alert("حدث خطأ أثناء إرسال الاستبيان. من فضلك حاول مرة أخرى.");
      updateState({ isSubmitting: false });
      return;
    }

    updateState({ isSubmitting: false });
    nextStep();
  };

  // Calculate total steps
  const specialtyStepsCount = state.selectedSpecialties.length;
  const reviewStepIndex = 3 + specialtyStepsCount;
  const trialQualificationStepIndex = reviewStepIndex + 1;
  const successStepIndex = (state.trialData?.trialChoice === 'YES' || state.trialData?.trialChoice === 'MORE_INFO') ? trialQualificationStepIndex + 1 : reviewStepIndex + 1;

  const renderStep = () => {
    if (state.step === 0) {
      return <StartScreen state={state} updateState={updateState} onNext={nextStep} />;
    }
    
    if (state.step === 1) {
      return (
        <CommonSection
          answers={state.commonAnswers}
          onChange={(answers) => updateState({ commonAnswers: answers })}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }
    
    if (state.step === 2) {
      return (
        <SpecialtySelector
          selected={state.selectedSpecialties}
          onChange={(selected) => updateState({ selectedSpecialties: selected })}
          onNext={nextStep}
          onPrev={prevStep}
        />
      );
    }

    if (state.step >= 3 && state.step < reviewStepIndex) {
      const specialtyIndex = state.step - 3;
      const specialtyId = state.selectedSpecialties[specialtyIndex];
      const sectionData = specialtySections[specialtyId];
      
      if (!sectionData) return null;

      const progress = {
        current: specialtyIndex + 1,
        total: specialtyStepsCount
      };

      return (
        <div key={specialtyId}>
          <SpecialtySectionForm
            section={sectionData}
            answers={state.specialtyAnswers[specialtyId] || {}}
            onChange={(answers) => {
              updateState({
                specialtyAnswers: {
                  ...state.specialtyAnswers,
                  [specialtyId]: answers,
                }
              });
            }}
            onNext={nextStep}
            onPrev={prevStep}
            progress={progress}
          />
        </div>
      );
    }

    if (state.step === reviewStepIndex) {
      return (
        <ReviewScreen
          state={state}
          updateState={updateState}
          onEditStep={goToStep}
          onSubmit={() => {
            if (state.trialData?.trialChoice === 'YES' || state.trialData?.trialChoice === 'MORE_INFO') {
              nextStep();
            } else {
              handleFinalSubmit();
            }
          }}
        />
      );
    }

    if ((state.trialData?.trialChoice === 'YES' || state.trialData?.trialChoice === 'MORE_INFO') && state.step === trialQualificationStepIndex) {
      return (
        <TrialQualificationScreen
          state={state}
          updateState={updateState}
          onPrev={prevStep}
          onSubmit={handleFinalSubmit}
        />
      );
    }

    if (state.step === successStepIndex) {
      return <SuccessScreen state={state} onRestart={() => setState(initialState)} />;
    }

    return null;
  };

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen flex flex-col bg-[#f4f7f9] text-[#2d3748] font-cairo" dir="rtl">
        <Dashboard onClose={() => setCurrentView('form')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9] text-[#2d3748] font-cairo" dir="rtl">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative h-8 sm:h-10 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo-header.png" 
                alt="PediaPro" 
                className="h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden h-8 sm:h-10 px-3 sm:px-4 bg-[#1477af] rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-xl absolute font-tajawal">PediaPro</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-left hidden sm:block">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">نموذج تجهيز التخصصات</p>
              {state.doctorName && (
                <p className="text-sm text-slate-700 font-medium">
                  {state.degree ? `${state.degree} / ` : ''} 
                  {state.doctorName}
                </p>
              )}
            </div>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="p-2 text-slate-400 hover:text-[#1477af] bg-slate-50 hover:bg-[#1477af]/10 rounded-lg transition-colors border border-slate-200"
              title="لوحة البيانات"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-4 md:gap-6 md:overflow-hidden">
        {state.step > 0 && state.step < successStepIndex && (
          <Sidebar state={state} goToStep={goToStep} />
        )}
        <div className="flex-1 flex flex-col md:overflow-hidden">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
