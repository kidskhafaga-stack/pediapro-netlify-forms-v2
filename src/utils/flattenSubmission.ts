import { AppState, Question, specialtiesList } from '../types';
import { commonQuestions, specialtySections } from '../data/questions';

/**
 * Turns the nested app state into a flat { field_name: readable_text } object
 * so every question becomes its own column in the Netlify Forms CSV export
 * (and therefore in Excel), instead of one unreadable JSON blob.
 *
 * Field naming convention: common__<questionId>  /  spec_<specialtyId>__<questionId>
 * These MUST stay in sync with the hidden blueprint form declared in index.html,
 * otherwise Netlify will silently drop fields that weren't declared at build time.
 */

function answerToText(question: Question, value: any): string {
  if (value === undefined || value === null || value === '') return '';

  switch (question.type) {
    case 'radio': {
      const opt = question.options?.find((o) => o.id === value);
      return opt ? opt.label : String(value);
    }
    case 'checkbox': {
      const selected: string[] = Array.isArray(value?.selected) ? value.selected : [];
      const addValues: Record<string, string> = value?.addValues || {};
      if (selected.length === 0) return '';
      return selected
        .map((id) => {
          const opt = question.options?.find((o) => o.id === id);
          const label = opt ? opt.label : id;
          const extra = addValues[id];
          return extra ? `${label} (${extra})` : label;
        })
        .join('؛ ');
    }
    case 'text':
      return String(value);
    case 'text-multiple': {
      const arr: string[] = Array.isArray(value) ? value : [];
      return arr.filter(Boolean).join('؛ ');
    }
    case 'composite': {
      const inputs = question.compositeInputs || [];
      const obj = value || {};
      return inputs
        .filter((inp) => obj[inp.id] !== undefined && obj[inp.id] !== '')
        .map((inp) => `${inp.label}: ${obj[inp.id]}`)
        .join('؛ ');
    }
    default:
      return String(value);
  }
}

export function flattenSubmission(state: AppState): Record<string, string> {
  const flat: Record<string, string> = {};

  // --- Common section ---
  for (const q of commonQuestions) {
    flat[`common__${q.id}`] = answerToText(q, state.commonAnswers?.[q.id]);
  }

  // --- Selected specialties (readable labels) ---
  const specialtyLabels = state.selectedSpecialties
    .map((id) => specialtiesList.find((s) => s.id === id)?.label || id)
    .join('؛ ');
  flat['selected_specialties'] = specialtyLabels;

  // --- Each specialty's answers (only for specialties the doctor picked) ---
  for (const specId of state.selectedSpecialties) {
    const section = specialtySections[specId];
    if (!section) continue;
    const answers = state.specialtyAnswers?.[specId] || {};
    for (const q of section.questions) {
      flat[`spec_${specId}__${q.id}`] = answerToText(q, answers[q.id]);
    }
  }

  // --- Trial / offer qualification data ---
  const t = state.trialData || {};
  flat['trial__trial_choice'] = t.trialChoice || '';
  flat['trial__facility_type'] = t.facilityType || '';
  flat['trial__facility_type_other'] = t.facilityTypeOther || '';
  flat['trial__doctor_count'] = t.doctorCount || '';
  flat['trial__specialty_type'] = t.specialtyType || '';
  flat['trial__specialties'] = (t.specialties || []).join('؛ ');
  flat['trial__specialties_other'] = t.specialtiesOther || '';
  flat['trial__branch_count'] = t.branchCount || '';
  flat['trial__monthly_visits'] = t.monthlyVisits || '';
  flat['trial__current_system'] = t.currentSystem || '';
  flat['trial__current_system_name'] = t.currentSystemName || '';
  flat['trial__hosting_preference'] = t.hostingPreference || '';
  flat['trial__payment_preference'] = t.paymentPreference || '';
  flat['trial__monthly_budget'] = t.monthlyBudget || '';
  flat['trial__annual_budget'] = t.annualBudget || '';
  flat['trial__requested_features'] = (t.requestedFeatures || []).join('؛ ');
  flat['trial__requested_features_other'] = t.requestedFeaturesOther || '';
  flat['trial__purchase_timeline'] = t.purchaseTimeline || '';
  flat['trial__lead_score'] = t.leadScore || '';
  flat['trial__lead_segment'] = t.leadSegment || '';

  return flat;
}
