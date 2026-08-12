import React, { useState } from 'react';
import { AppState, TrialData } from '../types';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface TrialQualificationScreenProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const facilityTypes = [
  'عيادة شخصية / عيادة طبيب واحد',
  'عيادة مشتركة',
  'مركز طبي',
  'مركز أطفال',
  'مجمع عيادات / Polyclinic',
  'مستشفى',
  'مستشفى أطفال',
  'قسم أطفال داخل مستشفى',
  'مجموعة طبية / Medical Group',
  'أخرى'
];

const doctorCounts = [
  'طبيب واحد',
  '2–3 أطباء',
  '4–10 أطباء',
  '11–25 طبيبًا',
  '26–50 طبيبًا',
  'أكثر من 50 طبيبًا'
];

const specialtyTypes = [
  'تخصص واحد فقط',
  'أكثر من تخصص',
  'تخصصات أطفال متعددة',
  'أطفال + تخصصات أخرى'
];

const specialtiesList = [
  'طب أطفال عام',
  'قلب أطفال',
  'غدد وسكر',
  'صدر وحساسية',
  'مخ وأعصاب',
  'تطور وسلوك ونفسية',
  'كلى ومسالك',
  'جهاز هضمي وكبد وتغذية',
  'أمراض دم',
  'حديثي الولادة والخدج',
  'أسنان',
  'أنف وأذن',
  'أخرى'
];

const branchCounts = [
  'فرع واحد',
  '2–3 فروع',
  '4–10 فروع',
  'أكثر من 10 فروع'
];

const monthlyVisitsList = [
  'أقل من 100',
  '100–300',
  '301–500',
  '501–1,000',
  '1,001–3,000',
  'أكثر من 3,000',
  'لا أعرف'
];

const currentSystems = [
  'لا، نعمل يدويًا',
  'Excel',
  'برنامج محلي على الكمبيوتر',
  'نظام Cloud',
  'أكثر من نظام',
  'نظام آخر'
];

const hostingPreferences = [
  'Cloud — أريد الوصول للنظام من أي مكان',
  'Local — على أجهزة المنشأة / السيرفر الداخلي',
  'Cloud + Local',
  'لا أعرف وأحتاج نصيحة'
];

const paymentPreferences = [
  'اشتراك شهري',
  'اشتراك سنوي',
  'اشتراك سنوي مع خصم',
  'ترخيص طويل المدى',
  'لا أعرف وأريد معرفة الخيارات'
];

const monthlyBudgets = [
  'أقل من 500 جنيه',
  '500–1,000 جنيه',
  '1,001–2,500 جنيه',
  '2,501–5,000 جنيه',
  '5,001–10,000 جنيه',
  'أكثر من 10,000 جنيه',
  'أفضل معرفة السعر أولًا'
];

const annualBudgets = [
  'أقل من 5,000 جنيه',
  '5,000–10,000 جنيه',
  '10,001–25,000 جنيه',
  '25,001–50,000 جنيه',
  '50,001–100,000 جنيه',
  'أكثر من 100,000 جنيه',
  'أفضل معرفة السعر أولًا'
];

const requestedFeaturesList = [
  'الملف الطبي الإلكتروني',
  'إدارة العيادة',
  'المواعيد والحجوزات',
  'متابعة نمو الأطفال',
  'التطعيمات',
  'الوصفات والأدوية',
  'المختبر',
  'الأشعة والفحوص',
  'الحسابات والكاشير',
  'التقارير والإحصائيات',
  'التواصل مع المرضى',
  'WhatsApp',
  'تطبيق للأهل',
  'إدارة عدة أطباء',
  'إدارة عدة فروع',
  'الذكاء الاصطناعي',
  'أخرى'
];

const purchaseTimelines = [
  'أريد البدء الآن',
  'خلال هذا الشهر',
  'خلال 1–3 أشهر',
  'خلال 3–6 أشهر',
  'أبحث حاليًا فقط'
];

// Lead Scoring Function
const calculateLeadScore = (data: TrialData): { score: string; segment: string } => {
  let score = 0;

  if (data.doctorCount && data.doctorCount !== 'طبيب واحد') score += 2;
  if (
    data.specialtyType &&
    (data.specialtyType === 'أكثر من تخصص' ||
      data.specialtyType === 'تخصصات أطفال متعددة' ||
      data.specialtyType === 'أطفال + تخصصات أخرى')
  ) score += 1;
  if (data.branchCount && data.branchCount !== 'فرع واحد') score += 2;
  if (
    data.monthlyVisits &&
    (data.monthlyVisits.includes('1,001') ||
      data.monthlyVisits.includes('أكثر من 3,000'))
  ) score += 2;
  if (
    data.purchaseTimeline &&
    (data.purchaseTimeline === 'أريد البدء الآن' ||
      data.purchaseTimeline === 'خلال هذا الشهر')
  )
    score += 3;
  if (data.purchaseTimeline && data.purchaseTimeline === 'خلال 1–3 أشهر')
    score += 1;

  if (data.requestedFeatures && data.requestedFeatures.length >= 4) score += 2;

  let segment = 'Unknown';
  if (score >= 8) segment = 'High Potential';
  else if (score >= 4) segment = 'Medium Potential';
  else if (
    data.purchaseTimeline === 'أبحث حاليًا فقط' ||
    data.purchaseTimeline === 'خلال 3–6 أشهر'
  )
    segment = 'Research / Not Ready';
  else segment = 'Small Practice';

  return { score: score.toString(), segment };
};

export default function TrialQualificationScreen({
  state,
  updateState,
  onPrev,
  onSubmit
}: TrialQualificationScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const data = state.trialData || {};

  const updateTrialData = (updates: Partial<TrialData>) => {
    updateState({
      trialData: { ...data, ...updates }
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      const { score, segment } = calculateLeadScore(data);
      updateState({
        trialData: {
          ...data,
          leadScore: score,
          leadSegment: segment
        }
      });
      setTimeout(() => onSubmit(), 50);
    }
  };

  const renderRadioGroup = (
    label: string,
    options: string[],
    field: keyof TrialData,
    otherField?: keyof TrialData
  ) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-3">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
              data[field] === opt
                ? 'border-[#1477af] bg-[#1477af]/5'
                : 'border-slate-200 hover:border-[#1477af]/30 bg-white'
            }`}
          >
            <input
              type="radio"
              className="hidden"
              name={String(field)}
              value={opt}
              checked={data[field] === opt}
              onChange={() => {
                const updates: Partial<TrialData> = {
                  [field]: opt
                };

                if (opt !== 'أخرى' && otherField) {
                  updates[otherField] = '';
                }

                updateTrialData(updates);
              }}
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${
                data[field] === opt
                  ? 'border-[#1477af]'
                  : 'border-slate-300'
              }`}
            >
              {data[field] === opt && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#1477af]"></div>
              )}
            </div>
            <span className="font-medium text-slate-700">{opt}</span>
          </label>
        ))}
      </div>

      {data[field] === 'أخرى' && otherField && (
        <input
          type="text"
          placeholder="يرجى التوضيح..."
          value={(data[otherField] as string) || ''}
          onChange={(e) =>
            updateTrialData({ [otherField]: e.target.value })
          }
          className="mt-3 w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1477af]/20 focus:border-[#1477af] transition-all"
        />
      )}
    </div>
  );

  const renderCheckboxGroup = (
    label: string,
    options: string[],
    field: 'specialties' | 'requestedFeatures',
    otherField?: keyof TrialData
  ) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-3">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const selectedList = data[field] || [];
          const isSelected = selectedList.includes(opt);

          return (
            <label
              key={opt}
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#1477af] bg-[#1477af]/5'
                  : 'border-slate-200 hover:border-[#1477af]/30 bg-white'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => {
                  let newList = [...selectedList];

                  if (isSelected) {
                    newList = newList.filter((item) => item !== opt);
                  } else {
                    newList.push(opt);
                  }

                  const updates: Partial<TrialData> = {
                    [field]: newList
                  };

                  if (isSelected && opt === 'أخرى' && otherField) {
                    updates[otherField] = '';
                  }

                  updateTrialData(updates);
                }}
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ml-3 ${
                  isSelected
                    ? 'bg-[#1477af] border-[#1477af]'
                    : 'border-slate-300'
                }`}
              >
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="font-medium text-slate-700">{opt}</span>
            </label>
          );
        })}
      </div>

      {(data[field] || []).includes('أخرى') && otherField && (
        <input
          type="text"
          placeholder="يرجى التوضيح..."
          value={(data[otherField] as string) || ''}
          onChange={(e) =>
            updateTrialData({ [otherField]: e.target.value })
          }
          className="mt-3 w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1477af]/20 focus:border-[#1477af] transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-md border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl w-full mx-auto">
      <div className="px-5 py-4 sm:px-10 sm:py-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">
          {state.trialData?.trialChoice === 'YES'
            ? 'ممتاز! دعنا نجهز لك التجربة المناسبة'
            : 'خلينا نفهم احتياجاتك أكتر'}
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6">
          بعض المعلومات البسيطة لضبط إعدادات النظام لتناسب طبيعة عملك تماماً.
        </p>

        <div className="flex items-center justify-between gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  i + 1 <= currentStep ? 'bg-[#1477af]' : 'bg-transparent'
                }`}
                style={{
                  width:
                    i + 1 < currentStep
                      ? '100%'
                      : i + 1 === currentStep
                      ? '100%'
                      : '0%'
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className="text-xs font-bold text-slate-400 text-center mt-2">
          الخطوة {currentStep} من {totalSteps}
        </div>
      </div>

      <div className="flex-1 p-8 sm:p-10 overflow-auto">
        <div
          className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300"
          key={currentStep}
        >
          {currentStep === 1 && (
            <div>
              {renderRadioGroup(
                'ما نوع المنشأة التي تعمل بها؟',
                facilityTypes,
                'facilityType',
                'facilityTypeOther'
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              {renderRadioGroup(
                'كم طبيبًا يعمل حاليًا في المنشأة؟',
                doctorCounts,
                'doctorCount'
              )}
              {renderRadioGroup(
                'هل تعملون بتخصص واحد أم عدة تخصصات؟',
                specialtyTypes,
                'specialtyType'
              )}
              {renderCheckboxGroup(
                'ما التخصصات الموجودة في منشأتك؟ (يمكن اختيار أكثر من تخصص)',
                specialtiesList,
                'specialties',
                'specialtiesOther'
              )}
              {renderRadioGroup(
                'كم فرعًا للمنشأة؟',
                branchCounts,
                'branchCount'
              )}
              {renderRadioGroup(
                'تقريبًا، كم عدد زيارات المرضى شهريًا؟',
                monthlyVisitsList,
                'monthlyVisits'
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              {renderRadioGroup(
                'هل تستخدم حاليًا نظامًا لإدارة العيادة أو المركز؟',
                currentSystems,
                'currentSystem'
              )}
              {data.currentSystem &&
                !data.currentSystem.includes('يدويًا') && (
                  <div className="mt-4">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      اسم النظام الحالي (اختياري)
                    </label>
                    <input
                      type="text"
                      value={data.currentSystemName || ''}
                      onChange={(e) =>
                        updateTrialData({
                          currentSystemName: e.target.value
                        })
                      }
                      className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1477af]/20 focus:border-[#1477af] transition-all bg-white font-medium text-right"
                      placeholder="اسم النظام..."
                    />
                  </div>
                )}
            </div>
          )}

          {currentStep === 4 && (
            <div>
              {renderRadioGroup(
                'أين تفضل تشغيل PediaPro؟',
                hostingPreferences,
                'hostingPreference'
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-8">
              {renderRadioGroup(
                'ما نموذج الدفع الذي تفضله؟',
                paymentPreferences,
                'paymentPreference'
              )}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-slate-600 mb-4 font-medium">
                  الميزانية المتوقعة لنظام إدارة العيادة/المركز (احفظ الإجابات مستقلة):
                </p>
                {renderRadioGroup(
                  'الميزانية الشهرية المناسبة',
                  monthlyBudgets,
                  'monthlyBudget'
                )}
                {renderRadioGroup(
                  'الميزانية السنوية المناسبة',
                  annualBudgets,
                  'annualBudget'
                )}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-8">
              {renderCheckboxGroup(
                'ما أكثر الأشياء التي تبحث عنها في النظام؟',
                requestedFeaturesList,
                'requestedFeatures',
                'requestedFeaturesOther'
              )}
              {renderRadioGroup(
                'متى تخطط لاستخدام نظام جديد؟',
                purchaseTimelines,
                'purchaseTimeline'
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-4 sm:p-6 flex justify-between items-center mt-auto safe-bottom">
        <button
          onClick={() => {
            if (currentStep > 1) setCurrentStep(currentStep - 1);
            else onPrev();
          }}
          className="px-6 sm:px-8 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <ChevronRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>

        <button
          onClick={handleNext}
          disabled={state.isSubmitting}
          className="px-8 sm:px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 bg-[#1e293b] text-white shadow-lg shadow-slate-200 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
        >
          <span>
            {currentStep === totalSteps
              ? state.isSubmitting
                ? 'جاري الإرسال...'
                : 'تأكيد وإرسال'
              : 'التالي'}
          </span>
          {currentStep < totalSteps && <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
