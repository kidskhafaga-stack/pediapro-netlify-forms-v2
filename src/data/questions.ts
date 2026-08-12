import { Question, SpecialtySection } from '../types';

export const commonQuestions: Question[] = [
  {
    id: 'data_entry',
    title: 'من يُدخل البيانات؟',
    infoText: 'لماذا نسأل: لو التمريض يقيس ويكتب، نفصل «ورقة التمريض» عن «ورقة الطبيب» — الطبيب يفتح شاشته والقياسات مكتوبة بالفعل.',
    type: 'radio',
    required: true,
    options: [
      { id: 'doctor', label: 'الطبيب بنفسه أثناء الكشف' },
      { id: 'nurse', label: 'التمريض قبل دخول الطفل' },
      { id: 'secretary', label: 'السكرتارية من ورقة مكتوبة' },
      { id: 'parents', label: 'الأهل (من التطبيق أو جهاز البيت)' },
    ],
  },
  {
    id: 'visit_duration',
    title: 'الزيارة الواحدة عندك تأخذ كم دقيقة؟',
    infoText: 'هذا الرقم يحدد كم حقلاً نضع على الشاشة. شاشة فيها ٣٠ حقلاً في كشف مدته ٨ دقائق لن تُملأ، وستملأ نفسها بالفراغ.',
    type: 'radio',
    required: true,
    options: [
      { id: 'less_10', label: 'أقل من ١٠ دقائق' },
      { id: '10_20', label: '١٠ – ٢٠ دقيقة' },
      { id: '20_40', label: '٢٠ – ٤٠ دقيقة' },
      { id: 'more_40', label: 'أكثر من ٤٠ (زيارة أولى/تقييم)' },
    ],
  },
  {
    id: 'first_visit_diff',
    title: 'هل الزيارة الأولى تختلف عن المتابعة؟',
    type: 'radio',
    options: [
      { id: 'different', label: 'نعم، ورقتان مختلفتان تمامًا' },
      { id: 'same_longer', label: 'نفس الورقة، لكن الأولى أطول' },
      { id: 'one_enough', label: 'ورقة واحدة تكفي' },
    ],
  },
  {
    id: 'mandatory_save_fields',
    title: 'ما الذي يجب ألا يسمح البرنامج بحفظ الزيارة بدونه؟',
    type: 'text-multiple',
    required: true,
    textInputsCount: 3,
    textInputsLabels: ['١)', '٢)', '٣)'],
  },
  {
    id: 'current_paper',
    title: 'الورقة الورقية التي تستعملها الآن',
    infoText: 'نسخة واحدة من ورقتك تختصر علينا نصف هذه الأسئلة. صوّرها بالموبايل واتركها لنا.',
    type: 'radio',
    options: [
      { id: 'printed_copy', label: 'عندي ورقة مطبوعة — سأعطيكم نسخة' },
      { id: 'notebook', label: 'أكتب في دفتر بأسلوبي' },
      { id: 'excel_other', label: 'ملف إكسل / برنامج آخر' },
      { id: 'nothing', label: 'لا شيء مكتوب' },
    ],
  },
  {
    id: 'end_visit_output',
    title: 'ماذا يخرج مع الأهل في نهاية الزيارة؟',
    type: 'checkbox',
    options: [
      { id: 'prescription_only', label: 'الروشتة فقط' },
      { id: 'prescription_growth', label: 'الروشتة + منحنى النمو' },
      { id: 'labs_radiology', label: 'طلب تحاليل/أشعة' },
      { id: 'instructions', label: 'ورقة تعليمات للأهل' },
      { id: 'doses_table', label: 'جدول جرعات مطبوع' },
      { id: 'next_appointment', label: 'موعد المتابعة القادم مكتوبًا' },
    ],
  },
  {
    id: 'needed_report',
    title: 'التقرير الذي تحتاجه — للتحويل لزميل، أو لشركة التأمين، أو لملف الطفل',
    type: 'checkbox',
    options: [
      { id: 'summary_page', label: 'ملخص كل الزيارات في صفحة واحدة' },
      { id: 'growth_chart', label: 'منحنى قياس واحد عبر الزمن (رسم بياني)' },
      { id: 'labs_table', label: 'جدول التحاليل من أول متابعة حتى اليوم' },
      { id: 'meds_history', label: 'تاريخ الأدوية: بدأ متى، وقف متى، ولماذا' },
      { id: 'official_report', label: 'تقرير طبي رسمي بتوقيعي وختمي' },
    ],
  },
  {
    id: 'shared_patient',
    title: 'الطفل يتابع معك ومع طبيب آخر في نفس العيادة',
    infoText: 'الملف الطبي واحد للطفل — هذا ثابت. السؤال هو من يرى ماذا داخله، ومتى يُنَبَّه أحدكما إلى عمل الآخر.',
    type: 'checkbox',
    options: [
      { id: 'see_all', label: 'أريد أن أرى كل شيء كتبه الزميل' },
      { id: 'see_specific', label: 'يكفيني: التشخيصات + الأدوية + الحساسية' },
      { id: 'notify_med_change', label: 'أريد أن أُنَبَّه لو غيَّر دواءً يخصّ حالتي' },
      { id: 'hide_details', label: 'لا أريد أن يرى الزميل تفاصيل ورقتي' },
    ],
  },
];

export const specialtySections: Record<string, SpecialtySection> = {
  endocrinology: {
    id: 'endocrinology',
    title: 'الغدد الصماء والسكر',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'height', label: 'الطول سم' },
          { id: 'weight', label: 'الوزن كجم' },
          { id: 'bmi', label: 'معامل الكتلة BMI' },
          { id: 'growth_velocity', label: 'سرعة النمو سم/سنة' },
          { id: 'bp', label: 'ضغط الدم مم زئبق' },
          { id: 'tanner', label: 'مرحلة البلوغ Tanner' },
          { id: 'waist', label: 'محيط الخصر سم' },
          { id: 'bone_age', label: 'العمر العظمي سنة' },
          { id: 'insulin_dose', label: 'جرعة الأنسولين وحدة/كجم/يوم' },
          { id: 'hypo_episodes', label: 'نوبات الهبوط عدد/أسبوع' },
          { id: 'in_range', label: 'القراءات داخل المدى %' },
          { id: 'injection_sites', label: 'حالة أماكن الحقن' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ],
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 't1d', label: 'السكر النوع الأول' },
          { id: 't2d', label: 'السكر النوع الثاني' },
          { id: 'short_stature', label: 'قصر القامة / نقص هرمون النمو' },
          { id: 'hypothyroid', label: 'قصور الغدة الدرقية' },
          { id: 'hyperthyroid', label: 'نشاط الغدة الدرقية' },
          { id: 'puberty', label: 'البلوغ المبكر / المتأخر' },
          { id: 'obesity', label: 'السمنة ومقاومة الأنسولين' },
          { id: 'cah', label: 'تضخم الكظر الخلقي' },
          { id: 'rickets', label: 'الكساح ونقص فيتامين د' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ],
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة — الرقم الذي تعني به «الحالة مضبوطة»',
        infoText: 'سيقوم النظام بإصدار تنبيهات تلقائية عندما تتجاوز قراءات المريض هذه الأرقام.',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'hba1c_less', label: 'HbA1c أقل من %', type: 'number' },
          { id: 'hba1c_more', label: 'وفوق % اعتبره غير مضبوط', type: 'number' },
          { id: 'followup_dm', label: 'المتابعة الافتراضية: للسكر كل (شهر)', type: 'number' },
          { id: 'followup_endo', label: 'للغدة كل (شهر)', type: 'number' },
        ],
      },
      {
        id: 'charts',
        title: 'تحاليل وفحوص تريد رؤيتها كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'fbs', label: 'السكر الصائم' },
          { id: 'hba1c', label: 'HbA1c' },
          { id: 'vit_d', label: 'فيتامين د' },
          { id: 'tft', label: 'TSH و FT4' },
          { id: 'kft', label: 'وظائف الكلى' },
          { id: 'lipid', label: 'الدهون الكاملة' },
          { id: 'igf1', label: 'IGF-1' },
          { id: 'microalbumin', label: 'ميكروألبيومين البول' },
          { id: 'celiac_abs', label: 'أجسام السيلياك' },
        ],
      },
      {
        id: 'meds_response',
        title: 'أدوية تتابع استجابتها — وبماذا تقيس الاستجابة',
        type: 'checkbox',
        options: [
          { id: 'insulin', label: 'الأنسولين القاعدي/السريع ← HbA1c + الهبوط' },
          { id: 'metformin', label: 'الميتفورمين ← الوزن + السكر' },
          { id: 'thyroxine', label: 'الثيروكسين ← TSH' },
          { id: 'gh', label: 'هرمون النمو ← سرعة النمو سم/سنة' },
          { id: 'add', label: 'أضف (يُقاس بـ)', hasAddInput: true },
        ],
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        type: 'checkbox',
        options: [
          { id: 'hba1c_high', label: 'HbA1c فوق الرقم الذي كتبته في الخانة ٣' },
          { id: 'hypo_freq', label: 'هبوط شديد متكرر' },
          { id: 'growth_stop', label: 'الطول توقّف أو عبر منحنى النمو لأسفل' },
          { id: 'no_hba1c', label: 'لم يعمل HbA1c منذ ٦ أشهر' },
          { id: 'bp_high', label: 'ضغط الدم فوق الشريحة المئوية ٩٥' },
          { id: 'late', label: 'تأخّر عن موعد المتابعة' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ],
      },
    ]
  },
  cardiology: {
    id: 'cardiology',
    title: 'قلب الأطفال',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'wt_ht', label: 'الوزن والطول' },
          { id: 'bp_arms', label: 'ضغط الدم الذراعان' },
          { id: 'hr', label: 'النبض /دقيقة' },
          { id: 'rr', label: 'معدل التنفس' },
          { id: 'spo2', label: 'تشبّع الأكسجين %' },
          { id: 'nyha', label: 'درجة القصور NYHA / Ross' },
          { id: 'ef', label: 'كسر القذف EF %' },
          { id: 'lvedd', label: 'قطر البطين الأيسر LVEDD مم' },
          { id: 'defect_size', label: 'حجم الفتحة مم' },
          { id: 'gradient', label: 'فرق الضغط عبر الصمام مم زئبق' },
          { id: 'pap', label: 'ضغط الشريان الرئوي المقدَّر' },
          { id: 'coronary_z', label: 'قطر الشريان التاجي Z-score' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'vsd', label: 'فتحة بين البطينين VSD' },
          { id: 'asd', label: 'فتحة بين الأذينين ASD' },
          { id: 'pda', label: 'القناة الشريانية PDA' },
          { id: 'stenosis', label: 'ضيق الصمام الرئوي/الأورطي' },
          { id: 'tof', label: 'رباعية فالو بعد الإصلاح' },
          { id: 'cmp', label: 'اعتلال عضلة القلب' },
          { id: 'rhf', label: 'الحمّى الروماتيزمية' },
          { id: 'kd', label: 'مرض كاواساكي' },
          { id: 'arrhythmia', label: 'اضطراب النظم' },
          { id: 'htn', label: 'ارتفاع ضغط الدم' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'spo2_min', label: 'تشبّع الأكسجين لا يقلّ عن %', type: 'number' },
          { id: 'ef_min', label: 'و EF لا يقلّ عن %', type: 'number' },
          { id: 'followup_stable', label: 'المتابعة الافتراضية: الحالة المستقرة كل (شهر)', type: 'number' },
          { id: 'followup_postop', label: 'بعد الجراحة كل (أسبوع)', type: 'number' },
        ]
      },
      {
        id: 'charts',
        title: 'تحاليل وفحوص تريد رؤيتها كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'ntprobnp', label: 'NT-proBNP' },
          { id: 'hb', label: 'الهيموجلوبين' },
          { id: 'inr', label: 'INR' },
          { id: 'esr_asot', label: 'ASOT و ESR' },
          { id: 'qtc', label: 'QTc من رسم القلب' },
          { id: 'kft', label: 'وظائف الكلى' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية تتابع استجابتها — وبماذا تقيس الاستجابة',
        type: 'checkbox',
        options: [
          { id: 'diuretics', label: 'مدرّات البول ← الوزن + التورم' },
          { id: 'acei', label: 'مثبطات الإنزيم ← الضغط + وظائف الكلى' },
          { id: 'digoxin', label: 'الديجوكسين ← النبض' },
          { id: 'bb', label: 'حاصرات بيتا ← النبض + النوبات' },
          { id: 'warfarin', label: 'الوارفارين ← INR' },
          { id: 'penicillin', label: 'البنسلين الشهري ← تاريخ آخر حقنة' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        type: 'checkbox',
        options: [
          { id: 'spo2_low', label: 'تشبّع الأكسجين تحت الرقم الذي كتبته' },
          { id: 'wt_gain', label: 'زيادة وزن مفاجئة خلال أيام' },
          { id: 'ef_drop', label: 'EF هبط عن الزيارة السابقة' },
          { id: 'penicillin_late', label: 'حقنة البنسلين تأخّرت عن موعدها *' },
          { id: 'inr_out', label: 'INR خارج المدى' },
          { id: 'defect_grows', label: 'الفتحة تكبر بدل أن تصغر' },
        ]
      }
    ]
  },
  pulmonology: {
    id: 'pulmonology',
    title: 'الصدر والحساسية',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'wt_ht', label: 'الوزن والطول' },
          { id: 'rr', label: 'معدل التنفس' },
          { id: 'spo2', label: 'تشبّع الأكسجين %' },
          { id: 'fev1', label: 'وظائف التنفس FEV1 %' },
          { id: 'pef', label: 'أقصى تدفق زفيري PEF' },
          { id: 'attacks', label: 'نوبات هذا الشهر عدد' },
          { id: 'saba', label: 'استعمال الموسّع السريع /أسبوع' },
          { id: 'nights', label: 'ليالٍ يستيقظ فيها /أسبوع' },
          { id: 'absent', label: 'أيام الغياب عن المدرسة' },
          { id: 'act', label: 'درجة السيطرة ACT / c-ACT' },
          { id: 'technique', label: 'تقنية استعمال البخاخ' },
          { id: 'scorad', label: 'شدّة الأكزيما SCORAD' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'asthma', label: 'الربو' },
          { id: 'allergic_rhinitis', label: 'حساسية الأنف' },
          { id: 'eczema', label: 'الأكزيما' },
          { id: 'food_allergy', label: 'حساسية الطعام' },
          { id: 'urticaria', label: 'الشرى المزمن' },
          { id: 'pneumonia', label: 'الالتهاب الرئوي المتكرر' },
          { id: 'bronchiectasis', label: 'توسّع الشعب' },
          { id: 'osa', label: 'الشخير وانقطاع النفس' },
          { id: 'cf', label: 'التليّف الكيسي' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'act_min', label: 'ACT لا يقلّ عن', type: 'number' },
          { id: 'attacks_max', label: 'والنوبات لا تزيد عن (في الشهر)', type: 'number' },
          { id: 'followup_controlled', label: 'المتابعة الافتراضية: المسيطَر عليه كل (شهر)', type: 'number' },
          { id: 'followup_changed', label: 'بعد تغيير الجرعة بعد (أسبوع)', type: 'number' },
        ]
      },
      {
        id: 'charts',
        title: 'تحاليل وفحوص تريد رؤيتها كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'ige', label: 'IgE الكلي' },
          { id: 'skin_test', label: 'اختبار الحساسية الجلدي' },
          { id: 'eosinophils', label: 'الحمضات في صورة الدم' },
          { id: 'pft', label: 'وظائف التنفس' },
          { id: 'cxr', label: 'أشعة الصدر' },
          { id: 'sweat_test', label: 'اختبار العرق' },
          { id: 'vit_d', label: 'فيتامين د' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية تتابع استجابتها — وبماذا تقيس الاستجابة',
        type: 'checkbox',
        options: [
          { id: 'ics', label: 'الكورتيزون بالاستنشاق ← الجرعة ميكروجرام/يوم + الطول' },
          { id: 'montelukast', label: 'مونتيلوكاست ← الأعراض الليلية' },
          { id: 'laba', label: 'الموسّع طويل المفعول ← ACT' },
          { id: 'antihistamine', label: 'مضاد الهيستامين ← أعراض الأنف' },
          { id: 'immunotherapy', label: 'الحقن المناعي ← شهر البدء ومدة الخطة' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        infoText: 'آخر بند مبني على شيء موجود بالفعل: البرنامج يعرف حساسية الطفل وأدويته الحالية ويفحص التعارض قبل الطباعة. ما ينقصه هو أن يعرف أن الربو حالة مزمنة قائمة، لا شكوى انتهت.',
        type: 'checkbox',
        options: [
          { id: 'systemic_steroids', label: 'أكثر من دورتَي كورتيزون بالفم في السنة' },
          { id: 'er', label: 'دخل الطوارئ بسبب الصدر' },
          { id: 'control_loss', label: 'السيطرة تدهورت عن الزيارة السابقة' },
          { id: 'high_ics', label: 'على كورتيزون استنشاق عالٍ منذ فترة طويلة ← راجع الطول *' },
          { id: 'contraindicated', label: 'وُصف له دواء يُمنع مع الربو' },
        ]
      }
    ]
  },
  neurology: {
    id: 'neurology',
    title: 'المخ والأعصاب',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'hc', label: 'محيط الرأس في كل الأعمار' },
          { id: 'wt_ht', label: 'الوزن والطول' },
          { id: 'seizures_month', label: 'عدد النوبات /شهر' },
          { id: 'seizure_free', label: 'أطول فترة بلا نوبة يوم' },
          { id: 'seizure_type', label: 'نوع النوبة ومدتها' },
          { id: 'tone', label: 'التوتر العضلي' },
          { id: 'power', label: 'القوة العضلية MRC' },
          { id: 'gmfcs', label: 'درجة الحركة GMFCS' },
          { id: 'milestones', label: 'محطات التطور' },
          { id: 'headache', label: 'نوبات الصداع /شهر' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'epilepsy', label: 'الصرع' },
          { id: 'cp', label: 'الشلل الدماغي' },
          { id: 'migraine', label: 'الصداع النصفي' },
          { id: 'delay', label: 'التأخر التطوري' },
          { id: 'sma', label: 'الضمور العضلي' },
          { id: 'hydrocephalus', label: 'استسقاء الرأس' },
          { id: 'movement', label: 'الحركات اللاإرادية' },
          { id: 'febrile', label: 'التشنج الحراري المتكرر' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'seizures_max', label: '«مسيطَر عليه» = نوبة أو أقل خلال (شهر)', type: 'number' },
          { id: 'followup_stable', label: 'المتابعة الافتراضية: المستقر كل (شهر)', type: 'number' },
          { id: 'followup_changed', label: 'بعد تغيير الدواء بعد (أسبوع)', type: 'number' },
        ]
      },
      {
        id: 'charts',
        title: 'تحاليل وفحوص تريد رؤيتها كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'drug_level', label: 'مستوى الدواء في الدم' },
          { id: 'lft', label: 'وظائف الكبد' },
          { id: 'cbc', label: 'صورة الدم الكاملة' },
          { id: 'na', label: 'الصوديوم' },
          { id: 'vit_d', label: 'فيتامين د' },
          { id: 'eeg', label: 'رسم المخ EEG' },
          { id: 'mri', label: 'الرنين MRI' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية تتابع استجابتها — وبماذا تقيس الاستجابة',
        infoText: 'الجرعة هنا تتغيّر مع كل زيادة في الوزن. البرنامج يعرف وزن الطفل في كل زيارة — فيستطيع أن يريك مجم/كجم لا مجم فقط، وأن ينبّهك حين تخرج عن المدى بسبب النمو وحده.',
        type: 'checkbox',
        options: [
          { id: 'valproate', label: 'فالبروات ← النوبات + وظائف الكبد + الوزن' },
          { id: 'levetiracetam', label: 'ليفيتيراسيتام ← النوبات + السلوك' },
          { id: 'carbamazepine', label: 'كاربامازيبين ← النوبات + الصوديوم + صورة الدم' },
          { id: 'topiramate', label: 'توبيرامات ← النوبات + الشهية' },
          { id: 'baclofen', label: 'باكلوفين ← التوتر العضلي' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        type: 'checkbox',
        options: [
          { id: 'seizures_inc', label: 'النوبات زادت عن الشهر السابق' },
          { id: 'lost_skill', label: 'فقد الطفل مهارة كان قد اكتسبها *' },
          { id: 'hc_cross', label: 'محيط الرأس عبر منحنى النمو' },
          { id: 'lft_high', label: 'وظائف الكبد ارتفعت على دواء الصرع' },
          { id: 'dose_low', label: 'الجرعة صارت أقل من مجم/كجم بسبب زيادة الوزن' },
          { id: 'drug_level_old', label: 'لم يعمل مستوى الدواء منذ فترة' },
        ]
      }
    ]
  },
  developmental: {
    id: 'developmental',
    title: 'التطور والسلوك والنفسية',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'gross_motor', label: 'الحركة الكبرى' },
          { id: 'fine_motor', label: 'الحركة الدقيقة' },
          { id: 'speech', label: 'اللغة والكلام' },
          { id: 'social', label: 'التواصل الاجتماعي' },
          { id: 'mchat', label: 'مقياس التوحد M-CHAT' },
          { id: 'vanderbilt', label: 'مقياس فرط الحركة Vanderbilt' },
          { id: 'sleep', label: 'ساعات النوم' },
          { id: 'screen_time', label: 'وقت الشاشة ساعة/يوم' },
          { id: 'school', label: 'الأداء الدراسي' },
          { id: 'growth', label: 'الوزن والطول والشهية' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'asd', label: 'اضطراب طيف التوحد' },
          { id: 'adhd', label: 'فرط الحركة وتشتت الانتباه' },
          { id: 'speech_delay', label: 'تأخر الكلام' },
          { id: 'learning', label: 'صعوبات التعلم' },
          { id: 'anxiety', label: 'القلق والمخاوف' },
          { id: 'sleep_disorder', label: 'اضطراب النوم' },
          { id: 'enuresis', label: 'التبول اللاإرادي' },
          { id: 'behavior', label: 'مشكلات سلوكية' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'improvement', label: 'التحسّن يُقاس بـ (هدف الدرجة)', type: 'text' },
          { id: 'followup_stable', label: 'المتابعة الافتراضية: كل (شهر)', type: 'number' },
          { id: 'followup_med', label: 'وبعد بدء دواء بعد (أسبوع)', type: 'number' },
        ]
      },
      {
        id: 'charts',
        title: 'ما تريد رؤيته كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'score', label: 'درجة المقياس عبر الزيارات' },
          { id: 'growth_stims', label: 'الوزن والطول مع المنشّطات' },
          { id: 'milestones_age', label: 'محطات التطور مقابل العمر' },
          { id: 'school_report', label: 'تقرير المدرسة' },
          { id: 'tft', label: 'وظائف الغدة الدرقية' },
          { id: 'vit_d_iron', label: 'فيتامين د والحديد' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية وتدخلات تتابع استجابتها',
        type: 'checkbox',
        options: [
          { id: 'mph', label: 'ميثيل فينيديت ← الدرجة + الوزن + الشهية + النوم' },
          { id: 'atomoxetine', label: 'أتوموكسيتين ← الدرجة' },
          { id: 'speech_tx', label: 'جلسات التخاطب ← عدد الجلسات + التقدّم' },
          { id: 'risperidone', label: 'ريسبيريدون ← الوزن + الحركات' },
          { id: 'ot_aba', label: 'العلاج الوظيفي / السلوكي' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        infoText: 'الأسر هنا تنقطع أكثر من غيرها، والانقطاع نفسه معلومة إكلينيكية. البرنامج عنده بالفعل نظام استدعاء المرضى — نربطه بالحالة بدل أن يكون قائمة عامة.',
        type: 'checkbox',
        options: [
          { id: 'lost_skill', label: 'فقد مهارة كان قد اكتسبها *' },
          { id: 'wt_drop', label: 'الوزن هبط بعد بدء المنشّط' },
          { id: 'delay_age', label: 'تأخّر عن محطة تطوّر بحسب عمره' },
          { id: 'no_improvement', label: 'الدرجة لم تتحسّن بعد جلستين' },
          { id: 'lost_followup', label: 'انقطع عن المتابعة' },
        ]
      }
    ]
  },
  nephrology: {
    id: 'nephrology',
    title: 'الكلى والمسالك',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'bp_centile', label: 'ضغط الدم + الشريحة المئوية' },
          { id: 'wt_dry', label: 'الوزن ووزن الجفاف' },
          { id: 'ht', label: 'الطول' },
          { id: 'edema', label: 'وجود تورّم ومكانه' },
          { id: 'dipstick', label: 'بروتين البول بالشريط' },
          { id: 'urine_vol', label: 'كمية البول' },
          { id: 'relapses', label: 'عدد الانتكاسات' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'ns', label: 'المتلازمة الكلوية' },
          { id: 'uti', label: 'التهاب المسالك المتكرر' },
          { id: 'vur', label: 'الارتجاع البولي' },
          { id: 'ckd', label: 'القصور الكلوي المزمن' },
          { id: 'stones', label: 'الحصوات' },
          { id: 'enuresis', label: 'التبول اللاإرادي' },
          { id: 'htn', label: 'ارتفاع ضغط الدم' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'bp_max', label: 'الضغط لا يزيد عن الشريحة', type: 'number' },
          { id: 'pcr_max', label: 'والبروتين/الكرياتينين تحت', type: 'number' },
          { id: 'followup_stable', label: 'المتابعة الافتراضية: كل (شهر)', type: 'number' },
          { id: 'followup_relapse', label: 'وأثناء الانتكاسة كل (أسبوع)', type: 'number' },
        ]
      },
      {
        id: 'charts',
        title: 'تحاليل تريد رؤيتها كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'cr_egfr', label: 'الكرياتينين و eGFR' },
          { id: 'alb', label: 'الألبيومين' },
          { id: 'pcr', label: 'بروتين/كرياتينين البول' },
          { id: 'culture', label: 'مزرعة البول' },
          { id: 'electrolytes', label: 'الصوديوم والبوتاسيوم' },
          { id: 'hb', label: 'الهيموجلوبين' },
          { id: 'us', label: 'الموجات الصوتية' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية تتابع استجابتها — وبماذا تقيس الاستجابة',
        type: 'checkbox',
        options: [
          { id: 'steroids', label: 'بريدنيزولون ← الجرعة التراكمية + الطول + الضغط' },
          { id: 'immunosuppressants', label: 'ليفاميزول / سيكلوسبورين ← الانتكاسات' },
          { id: 'acei', label: 'مثبطات الإنزيم ← البروتين + الكرياتينين' },
          { id: 'prophylaxis', label: 'مضاد حيوي وقائي ← عدد الالتهابات' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        type: 'checkbox',
        options: [
          { id: 'bp_high', label: 'الضغط فوق الشريحة التي كتبتها' },
          { id: 'egfr_drop', label: 'eGFR يهبط عبر الزيارات' },
          { id: 'new_relapse', label: 'انتكاسة جديدة' },
          { id: 'steroid_toxicity', label: 'الكورتيزون التراكمي تجاوز الحد + الطول متأثر *' },
          { id: 'renal_dose', label: 'وُصف دواء يحتاج تعديلًا مع القصور الكلوي' },
        ]
      }
    ]
  },
  gastroenterology: {
    id: 'gastroenterology',
    title: 'الجهاز الهضمي والكبد والتغذية',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'wt_ht_bmi', label: 'الوزن والطول و BMI' },
          { id: 'muac', label: 'محيط منتصف الذراع' },
          { id: 'abd', label: 'محيط البطن' },
          { id: 'stool', label: 'عدد مرات الإخراج ونوعه' },
          { id: 'organomegaly', label: 'تضخم الكبد/الطحال سم' },
          { id: 'vomiting', label: 'القيء والارتجاع' },
          { id: 'diet', label: 'الالتزام بالحمية' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'celiac', label: 'حساسية القمح (سيلياك)' },
          { id: 'cmpa', label: 'حساسية بروتين اللبن' },
          { id: 'gerd', label: 'الارتجاع المريئي' },
          { id: 'constipation', label: 'الإمساك المزمن' },
          { id: 'ibd', label: 'التهاب الأمعاء IBD' },
          { id: 'ftt', label: 'فشل النمو' },
          { id: 'hepatitis', label: 'التهاب الكبد الفيروسي' },
          { id: 'fatty_liver', label: 'الكبد الدهني' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'wt_centile', label: 'الوزن لا يقلّ عن الشريحة', type: 'number' },
          { id: 'wt_gain', label: 'وزيادة الوزن لا تقلّ عن (جم/شهر)', type: 'number' },
          { id: 'followup', label: 'المتابعة الافتراضية: كل (شهر)', type: 'number' },
        ]
      },
      {
        id: 'charts',
        title: 'تحاليل تريد رؤيتها كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'ferritin', label: 'الفيريتين' },
          { id: 'iron', label: 'صورة الدم والحديد' },
          { id: 'alb', label: 'الألبيومين' },
          { id: 'lft', label: 'وظائف الكبد' },
          { id: 'calprotectin', label: 'الكالبروتكتين في البراز' },
          { id: 'ttg', label: 'أجسام السيلياك TTG' },
          { id: 'vit', label: 'فيتامين د و ب١٢' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية وتدخلات تتابع استجابتها',
        type: 'checkbox',
        options: [
          { id: 'gf_diet', label: 'الحمية الخالية من الجلوتين ← TTG + الوزن' },
          { id: 'laxatives', label: 'الملينات ← عدد مرات الإخراج' },
          { id: 'ppi', label: 'مثبطات الحمض ← الأعراض' },
          { id: 'supplements', label: 'مكمّلات غذائية ← منحنى الوزن' },
          { id: 'iron', label: 'الحديد ← الهيموجلوبين + الفيريتين' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        type: 'checkbox',
        options: [
          { id: 'wt_drop', label: 'الوزن عبر منحنى النمو لأسفل *' },
          { id: 'no_wt_gain', label: 'لم يزد وزنه منذ زيارتين' },
          { id: 'lft_high', label: 'وظائف الكبد ارتفعت' },
          { id: 'ttg_high', label: 'TTG لم ينزل رغم الحمية' },
          { id: 'gluten_rx', label: 'وُصف دواء يحتوي جلوتين/لاكتوز' },
        ]
      }
    ]
  },
  haematology: {
    id: 'haematology',
    title: 'أمراض الدم',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'wt_ht_puberty', label: 'الوزن والطول والبلوغ' },
          { id: 'spleen', label: 'تضخم الطحال سم' },
          { id: 'pallor', label: 'شحوب / يرقان' },
          { id: 'hb_pre', label: 'الهيموجلوبين قبل النقل' },
          { id: 'tx_interval', label: 'الفاصل بين النقلتين يوم' },
          { id: 'tx_count', label: 'عدد النقلات في السنة' },
          { id: 'pain', label: 'نوبات الألم /سنة' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'thalassemia', label: 'ثلاسيميا' },
          { id: 'scd', label: 'الأنيميا المنجلية' },
          { id: 'ida', label: 'أنيميا نقص الحديد' },
          { id: 'itp', label: 'نقص الصفائح ITP' },
          { id: 'hemophilia', label: 'الهيموفيليا' },
          { id: 'g6pd', label: 'نقص G6PD' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'hb_min', label: 'الهيموجلوبين قبل النقل لا يقلّ عن', type: 'number' },
          { id: 'ferritin_max', label: 'والفيريتين لا يزيد عن', type: 'number' },
          { id: 'followup', label: 'المتابعة الافتراضية: كل (أسبوع/شهر)', type: 'text' },
        ]
      },
      {
        id: 'charts',
        title: 'تحاليل تريد رؤيتها كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'ferritin', label: 'الفيريتين' },
          { id: 'hb', label: 'الهيموجلوبين' },
          { id: 'lft', label: 'وظائف الكبد' },
          { id: 'plt', label: 'الصفائح' },
          { id: 't2_star', label: 'T2* للقلب والكبد' },
          { id: 'tft_bs', label: 'وظائف الغدة الدرقية والسكر' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية تتابع استجابتها — وبماذا تقيس الاستجابة',
        type: 'checkbox',
        options: [
          { id: 'chelators', label: 'مخلّبات الحديد ← الفيريتين + الجرعة مجم/كجم' },
          { id: 'folic', label: 'حمض الفوليك' },
          { id: 'hydroxyurea', label: 'هيدروكسي يوريا ← نوبات الألم + صورة الدم' },
          { id: 'iron', label: 'الحديد ← الهيموجلوبين' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        infoText: 'آخر بند تحديدًا: قائمة الأدوية الممنوعة مع نقص G6PD ثابتة ومعروفة، والبرنامج يفحص التعارضات بالفعل قبل طباعة الروشتة. يكفي أن يعرف أن الطفل عنده النقص ليمنعها من نفسه.',
        type: 'checkbox',
        options: [
          { id: 'ferritin_high', label: 'الفيريتين تجاوز الحد الذي كتبته *' },
          { id: 'hb_low', label: 'الهيموجلوبين قبل النقل تحت الحد' },
          { id: 'tx_late', label: 'تأخّر عن موعد النقل' },
          { id: 'spleen_big', label: 'الطحال يكبر عبر الزيارات' },
          { id: 'g6pd_rx', label: 'وُصف دواء يُمنع مع نقص G6PD *' },
        ]
      }
    ]
  },
  neonatology: {
    id: 'neonatology',
    title: 'متابعة حديثي الولادة والخُدَّج',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'corrected_age', label: 'العمر المصحّح أسبوع' },
          { id: 'growth', label: 'الوزن والطول ومحيط الرأس' },
          { id: 'fenton', label: 'على منحنى الخُدَّج Fenton' },
          { id: 'feeding', label: 'الرضاعة مل/كجم/يوم' },
          { id: 'jaundice', label: 'الصفراء' },
          { id: 'spo2', label: 'تشبّع الأكسجين' },
          { id: 'milestones', label: 'التطور بالعمر المصحّح' },
          { id: 'rop', label: 'فحص الشبكية ROP' },
          { id: 'hearing', label: 'فحص السمع' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'prematurity', label: 'الخداج' },
          { id: 'lbw', label: 'انخفاض وزن الولادة' },
          { id: 'bpd', label: 'مرض الرئة المزمن' },
          { id: 'ivh', label: 'نزيف المخ' },
          { id: 'rop', label: 'اعتلال الشبكية' },
          { id: 'prolonged_jaundice', label: 'الصفراء الطويلة' },
          { id: 'gerd_feeding', label: 'الارتجاع وسوء الرضاعة' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'wt_gain', label: 'زيادة الوزن لا تقلّ عن (جم/يوم)', type: 'number' },
          { id: 'corrected_until', label: 'ونستعمل العمر المصحّح حتى سنّ (شهر)', type: 'number' },
          { id: 'followup_early', label: 'المتابعة الافتراضية: كل (أسبوع) حتى', type: 'text' },
          { id: 'followup_late', label: 'ثم كل', type: 'text' },
        ]
      },
      {
        id: 'charts',
        title: 'تحاليل وفحوص تريد رؤيتها كمنحنى',
        type: 'checkbox',
        options: [
          { id: 'jaundice', label: 'الصفراء' },
          { id: 'hb', label: 'الهيموجلوبين' },
          { id: 'ca_p', label: 'الكالسيوم والفوسفور' },
          { id: 'vit_d', label: 'فيتامين د' },
          { id: 'brain_us', label: 'موجات صوتية على المخ' },
          { id: 'rop_dates', label: 'مواعيد فحص الشبكية' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية ومكمّلات تتابع استجابتها',
        type: 'checkbox',
        options: [
          { id: 'iron', label: 'الحديد ← الهيموجلوبين' },
          { id: 'vit_d', label: 'فيتامين د ← المستوى' },
          { id: 'hifm', label: 'مقيّوات اللبن ← زيادة الوزن جم/يوم' },
          { id: 'caffeine', label: 'الكافيين ← نوبات توقف النفس' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        infoText: 'العمر المصحّح مثال على ما نعنيه بـ«شاشة تفهم التخصص»: نفس الطفل، نفس المنحنى، لكن التطعيم يُحسب بعمره الحقيقي والنمو يُقاس بعمره المصحّح. البرنامج يعرف تاريخ الميلاد — ينقصه أن يعرف أسابيع الحمل عند الولادة.',
        type: 'checkbox',
        options: [
          { id: 'low_wt', label: 'زيادة الوزن أقل من المطلوب *' },
          { id: 'rop_due', label: 'موعد فحص الشبكية اقترب أو فات *' },
          { id: 'wrong_vaccine', label: 'التطعيم يُحسب بالعمر الحقيقي لا المصحّح' },
          { id: 'hc_fast', label: 'محيط الرأس يزيد بسرعة غير طبيعية' },
          { id: 'no_hearing', label: 'فحص السمع لم يُعمل' },
        ]
      }
    ]
  },
  ophthalmology: {
    id: 'ophthalmology',
    title: 'عيون الأطفال',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'va', label: 'حدة الإبصار لكل عين 6/6' },
          { id: 'va_method', label: 'طريقة القياس Snellen / Lea / LogMAR' },
          { id: 'refraction', label: 'المقاس بعد التوسيع Sph / Cyl / Axis' },
          { id: 'iop', label: 'ضغط العين مم زئبق' },
          { id: 'strabismus_angle', label: 'زاوية الحول بريزم PD' },
          { id: 'eom', label: 'حركة عضلات العين' },
          { id: 'fundus', label: 'فحص قاع العين' },
          { id: 'axial_length', label: 'طول محور العين مم' },
          { id: 'glasses_compliance', label: 'التزام النظارة ساعة/يوم' },
          { id: 'patch_compliance', label: 'التزام الرقعة ساعة/يوم' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'refractive_errors', label: 'عيوب الإبصار الانكسارية' },
          { id: 'strabismus', label: 'الحول' },
          { id: 'amblyopia', label: 'كسل العين' },
          { id: 'progressive_myopia', label: 'قصر النظر التقدّمي' },
          { id: 'nlds', label: 'انسداد القناة الدمعية' },
          { id: 'rop', label: 'اعتلال شبكية الخُدَّج' },
          { id: 'congenital_cataract', label: 'المياه البيضاء الخلقية' },
          { id: 'congenital_glaucoma', label: 'المياه الزرقاء الخلقية' },
          { id: 'allergic_conjunctivitis', label: 'التهاب الملتحمة التحسسي' },
          { id: 'ptosis', label: 'تدلّي الجفن' },
          { id: 'nystagmus', label: 'ارتعاش العين' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'va_min', label: 'حدة الإبصار لا تقلّ عن', type: 'text' },
          { id: 'va_diff_max', label: 'والفرق بين العينين لا يزيد عن (سطر)', type: 'number' },
          { id: 'patch_hours', label: 'الرقعة (ساعة/يوم)', type: 'number' },
          { id: 'patch_weeks', label: 'لمدة (أسبوع) قبل إعادة التقييم', type: 'number' },
          { id: 'followup_default', label: 'المتابعة الافتراضية: كل (شهر)', type: 'number' },
        ]
      },
      {
        id: 'charts',
        title: 'ما تريد رؤيته كمنحنى عبر الزمن',
        type: 'checkbox',
        options: [
          { id: 'refraction_curve', label: 'المقاس (الانكسار)' },
          { id: 'va_curve', label: 'حدة الإبصار' },
          { id: 'iop_curve', label: 'ضغط العين' },
          { id: 'axial_length_curve', label: 'طول محور العين' },
          { id: 'strabismus_curve', label: 'زاوية الحول' },
          { id: 'fundus_photos', label: 'صور قاع العين' },
          { id: 'rop_schedule', label: 'مواعيد فحص شبكية الخُدَّج' },
        ]
      },
      {
        id: 'meds_response',
        title: 'أدوية وتدخلات تتابع استجابتها — وبماذا تقيس الاستجابة',
        type: 'checkbox',
        options: [
          { id: 'glasses', label: 'النظارة ← حدة الإبصار + الالتزام' },
          { id: 'patch_atropine', label: 'الرقعة / أتروبين للكسل ← حدة الإبصار' },
          { id: 'iop_drops', label: 'قطرات ضغط العين ← الضغط' },
          { id: 'allergy_drops', label: 'قطرات الحساسية ← الأعراض' },
          { id: 'myopia_control_drops', label: 'قطرات تثبيط قصر النظر ← المقاس + طول المحور' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        infoText: 'البندان اللذان عليهما * ليسا من عندك أصلاً: الأول يعرفه طبيب الحضانة، والثاني يعرفه طبيب الصدر أو الكلى الذي كتب الكورتيزون. الملف واحد، فالبرنامج يستطيع أن يقول لك ما لم يقله لك أحد.',
        type: 'checkbox',
        options: [
          { id: 'amblyopia_stuck', label: 'كسل العين لم يتحسّن بعد فترة الرقعة التي حدّدتها' },
          { id: 'refraction_fast', label: 'المقاس يتدهور بسرعة أكبر من المتوقع' },
          { id: 'preterm_rop_due', label: 'طفل خديج — ميعاد فحص الشبكية اقترب أو فات *' },
          { id: 'iop_high', label: 'ضغط العين فوق الحد' },
          { id: 'long_term_steroid', label: 'الطفل على كورتيزون طويل المدى ← افحص الضغط والعدسة *' },
          { id: 'never_examined', label: 'لم يُفحص نظره من قبل وعمره تعدّى السن التي حدّدتها' },
        ]
      }
    ]
  },
  dentistry: {
    id: 'dentistry',
    title: 'أسنان الأطفال',
    questions: [
      {
        id: 'measured_every_visit',
        title: 'يُقاس في كل زيارة',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'dmft', label: 'عدد المتسوّس/المحشو/المفقود dmft — DMFT' },
          { id: 'tooth_chart', label: 'خريطة الأسنان سن بسن' },
          { id: 'plaque_index', label: 'مؤشر اللويحة ونظافة الفم' },
          { id: 'gum_status', label: 'حالة اللثة' },
          { id: 'occlusion', label: 'الإطباق Class I / II / III' },
          { id: 'crowding', label: 'التزاحم والمسافات' },
          { id: 'night_feeding', label: 'الرضاعة الليلية' },
          { id: 'habits', label: 'مص الإصبع / التنفس من الفم' },
          { id: 'fluoride_source', label: 'مصدر الفلورايد' },
          { id: 'cooperation', label: 'تعاون الطفل Frankl' },
          { id: 'pain_swelling', label: 'ألم أو تورّم' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'long_term_conditions',
        title: 'الحالات التي تتابعها على المدى الطويل',
        type: 'checkbox',
        options: [
          { id: 'ecc', label: 'تسوّس الطفولة المبكر' },
          { id: 'gingivitis', label: 'التهاب اللثة' },
          { id: 'abscess', label: 'خراج أو عدوى سنّية' },
          { id: 'trauma', label: 'كسر أو خلع بعد رضّة' },
          { id: 'eruption_disorder', label: 'اضطراب التسنين' },
          { id: 'malocclusion', label: 'سوء الإطباق والتزاحم' },
          { id: 'mih', label: 'نقص تكلّس المينا MIH' },
          { id: 'bruxism', label: 'صرير الأسنان' },
          { id: 'tongue_tie', label: 'لجام اللسان' },
          { id: 'special_needs', label: 'احتياجات خاصة / علاج بتخدير' },
          { id: 'add', label: 'أضف', hasAddInput: true },
        ]
      },
      {
        id: 'control_number',
        title: 'رقم السيطرة وميعاد المتابعة',
        type: 'composite',
        required: true,
        compositeInputs: [
          { id: 'new_caries_max', label: 'سن جديد متسوّس «تحت السيطرة» = (سن أو أقل) بين الزيارتين', type: 'number' },
          { id: 'followup_default', label: 'المتابعة الافتراضية: كل (شهر)', type: 'number' },
          { id: 'followup_high_risk', label: 'وللطفل عالي الخطورة كل (شهر)', type: 'number' },
        ]
      },
      {
        id: 'charts',
        title: 'ما تريد رؤيته كمنحنى عبر الزمن',
        type: 'checkbox',
        options: [
          { id: 'caries_count_curve', label: 'عدد الأسنان المتسوّسة' },
          { id: 'tooth_chart_visits', label: 'خريطة الأسنان زيارة بزيارة' },
          { id: 'plaque_index_curve', label: 'مؤشر اللويحة' },
          { id: 'panoramic_xray', label: 'أشعة بانوراما' },
          { id: 'bitewing_xray', label: 'أشعة لدغة Bitewing' },
          { id: 'before_after_photos', label: 'صور قبل وبعد' },
        ]
      },
      {
        id: 'meds_response',
        title: 'تدخلات تتابع نتيجتها',
        type: 'checkbox',
        options: [
          { id: 'fluoride_varnish', label: 'طلاء الفلورايد ← تسوّس جديد + تاريخ آخر جلسة' },
          { id: 'sealants', label: 'الحافظات (سيلانت) ← سلامتها في الزيارة التالية' },
          { id: 'filling_pulp', label: 'الحشو / علاج العصب اللبني ← الألم + الأشعة' },
          { id: 'crown_extraction', label: 'التاج أو الخلع' },
          { id: 'space_maintainer', label: 'حافظ المسافة ← مكان السن الدائم' },
          { id: 'antibiotic', label: 'مضاد حيوي ← التورّم والحرارة' },
        ]
      },
      {
        id: 'alerts',
        title: 'متى ينبّهك البرنامج من نفسه؟',
        infoText: 'الثلاثة اللي عليهم * هي حجّة هذا البرنامج كله في جملة واحدة. طبيب الأسنان لا يعرف أن الطفل عنده فتحة في القلب ولا أنه على فينيتوين ولا أن عنده حساسية من البنسلين — إلا لو سأل الأم وتذكّرت. الملف واحد، وفحص التعارضات موجود بالفعل قبل طباعة الروشتة؛ ما ينقص هو أن تصل المعلومة إلى الكرسي.',
        type: 'checkbox',
        options: [
          { id: 'fluoride_due', label: 'ميعاد الفلورايد فات' },
          { id: 'new_caries_despite_followup', label: 'تسوّس جديد رغم انتظام المتابعة' },
          { id: 'heart_defect_prophylaxis', label: 'الطفل عنده عيب في القلب ← وقاية بمضاد حيوي قبل الخلع *' },
          { id: 'penicillin_allergy', label: 'حساسية من البنسلين قبل وصف المضاد الحيوي *' },
          { id: 'gum_hyperplasia_risk', label: 'على دواء يسبّب تضخّم اللثة أو شراب مُحلّى طويل المدى *' },
          { id: 'no_visit_since_one', label: 'لم يزر عيادة الأسنان منذ تجاوز السنة الأولى' },
        ]
      }
    ]
  },
  other: {
    id: 'other',
    title: 'تخصص آخر',
    questions: [
      {
        id: 'spec_name',
        title: 'اسم التخصص والوحدة',
        type: 'text-multiple',
        required: true,
        textInputsCount: 2,
        textInputsLabels: ['التخصص:', 'الوحدة/المجال:'],
      },
      {
        id: 'fields',
        title: 'ما الحقول الخاصة بتخصصك؟',
        type: 'text-multiple',
        textInputsCount: 3,
        textInputsLabels: ['١.', '٢.', '٣.'],
      },
      {
        id: 'measurements',
        title: 'ما الذي تقيسه؟',
        type: 'text-multiple',
        textInputsCount: 2,
        textInputsLabels: ['-', '-'],
      },
      {
        id: 'conditions',
        title: 'ما الحالات التي تتابعها؟',
        type: 'text-multiple',
        textInputsCount: 3,
        textInputsLabels: ['-', '-', '-'],
      },
      {
        id: 'labs',
        title: 'ما التحاليل أو الفحوص التي تحتاجها؟',
        type: 'text-multiple',
        textInputsCount: 2,
        textInputsLabels: ['-', '-'],
      },
      {
        id: 'meds',
        title: 'ما الأدوية أو التدخلات التي تتابع استجابتها؟',
        type: 'text-multiple',
        textInputsCount: 2,
        textInputsLabels: ['-', '-'],
      },
      {
        id: 'alerts',
        title: 'ما التنبيهات التي تريد من البرنامج أن يقوم بها؟',
        type: 'text-multiple',
        textInputsCount: 2,
        textInputsLabels: ['-', '-'],
      },
    ]
  }
};
