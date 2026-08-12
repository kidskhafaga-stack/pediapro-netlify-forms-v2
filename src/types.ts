export type QuestionType = 'radio' | 'checkbox' | 'text' | 'text-multiple' | 'composite';

export interface QuestionOption {
  id: string;
  label: string;
  hasAddInput?: boolean;
}

export interface Question {
  id: string;
  title: string;
  infoText?: string;
  type: QuestionType;
  required?: boolean;
  options?: QuestionOption[];
  textInputsCount?: number;
  textInputsLabels?: string[];
  placeholder?: string;
  compositeInputs?: {
    id: string;
    label: string;
    type: 'text' | 'number';
    placeholder?: string;
  }[];
  dependsOn?: {
    questionId: string;
    value: any;
  };
}

export interface SpecialtySection {
  id: string;
  title: string;
  questions: Question[];
}

export interface AppState {
  step: number;
  doctorName: string;
  degree: string;
  date: string;
  commonAnswers: Record<string, any>;
  selectedSpecialties: string[];
  specialtyAnswers: Record<string, Record<string, any>>;
  offerAccepted?: boolean | null;
  offerPhone?: string;
  offerEmail?: string;
  trialData?: TrialData;
  isSubmitting?: boolean;
}

export interface TrialData {
  trialChoice?: 'YES' | 'MORE_INFO' | 'NO' | null;
  facilityType?: string;
  facilityTypeOther?: string;
  doctorCount?: string;
  specialtyType?: string;
  specialties?: string[];
  specialtiesOther?: string;
  branchCount?: string;
  monthlyVisits?: string;
  currentSystem?: string;
  currentSystemName?: string;
  hostingPreference?: string;
  paymentPreference?: string;
  monthlyBudget?: string;
  annualBudget?: string;
  requestedFeatures?: string[];
  requestedFeaturesOther?: string;
  purchaseTimeline?: string;
  leadScore?: string;
  leadSegment?: string;
}

export interface Submission {
  id: string;
  timestamp: string;
  state: AppState;
}

export const specialtiesList = [
  { id: 'endocrinology', label: 'الغدد الصماء والسكر' },
  { id: 'cardiology', label: 'قلب الأطفال' },
  { id: 'pulmonology', label: 'الصدر والحساسية' },
  { id: 'neurology', label: 'المخ والأعصاب' },
  { id: 'developmental', label: 'التطور والسلوك والنفسية' },
  { id: 'nephrology', label: 'الكلى والمسالك' },
  { id: 'gastroenterology', label: 'الجهاز الهضمي والكبد والتغذية' },
  { id: 'haematology', label: 'أمراض الدم' },
  { id: 'neonatology', label: 'متابعة حديثي الولادة والخُدَّج' },
  { id: 'ophthalmology', label: 'عيون الأطفال' },
  { id: 'dentistry', label: 'أسنان الأطفال' },
  { id: 'other', label: 'تخصص آخر' },
];
