import { AppState } from '../types';

interface StartScreenProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
}

export default function StartScreen({ state, updateState, onNext }: StartScreenProps) {
  const isFormValid = state.doctorName.trim() !== '' && state.degree.trim() !== '' && state.date.trim() !== '';

  return (
    <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-5 sm:p-8 md:p-12 max-w-2xl mx-auto mt-4 sm:mt-8 flex flex-col">
      <div className="text-center mb-8">
        <img src="/logo.png" alt="PediaPro" className="h-40 sm:h-56 w-auto object-contain mx-auto mb-5" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 font-tajawal">ورقة تجهيز التخصصات</h2>
        <p className="text-sm font-semibold text-[#1477af] mb-4">ما الذي يجب أن تراه على شاشتك ولا تراه اليوم؟</p>
        <p className="text-base text-slate-500 leading-relaxed max-w-lg mx-auto">
          البرنامج اليوم يعرف الطفل: وزنه، طوله، تطعيماته، أدويته، حساسيته، منحنى نموه.
          ما لا يعرفه بعد هو ما الذي يتغيّر في هذه الورقة حين يكون الطبيب طبيب سكر لا طبيب أطفال عام.
          هذه الورقة تسأل عن ذلك وحده — لا شيء آخر. الصفحة المشتركة أربع دقائق، وصفحة تخصصك ست دقائق.
        </p>
      </div>

      <div className="mb-8 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-right">
        <ol className="space-y-2 text-sm text-slate-600 leading-relaxed">
          <li><span className="font-bold text-slate-800">١</span> — علّم أمام ما تستعمله فعلاً. المتروك بلا علامة سيُحذف من الشاشة، وهذا مقصود.</li>
          <li><span className="font-bold text-slate-800">٢</span> — لو لقيت سؤالاً خطأ أو زائدًا عن حاجتك، من فضلك اذكر ذلك في خانة «أضف» بنفس القسم. ملاحظتك أفيد لنا من مجرد العلامة.</li>
          <li><span className="font-bold text-slate-800">٣</span> — أضف الناقص في خانة «أضف» آخر كل قسم — القائمة اقتراح، وليست حصرًا.</li>
          <li><span className="font-bold text-slate-800">٤</span> — ما عليه <span className="text-rose-500 font-bold">★</span> لا نستطيع البدء بدونه. الباقي يحتمل التأجيل.</li>
        </ol>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label htmlFor="doctorName" className="block text-sm font-bold text-slate-700 mb-2">
            اسم الطبيب
          </label>
          <input
            type="text"
            id="doctorName"
            value={state.doctorName}
            onChange={(e) => updateState({ doctorName: e.target.value })}
            className="w-full text-sm p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1477af]/20 transition-colors"
            placeholder="د. ..."
          />
        </div>

        <div>
          <label htmlFor="degree" className="block text-sm font-bold text-slate-700 mb-2">
            الدرجة العلمية
          </label>
          <select
            id="degree"
            value={state.degree}
            onChange={(e) => updateState({ degree: e.target.value })}
            className="w-full text-sm p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1477af]/20 transition-colors bg-white appearance-none cursor-pointer"
          >
            <option value="" disabled>اختر الدرجة العلمية...</option>
            <option value="طبيب مقيم">طبيب مقيم</option>
            <option value="أخصائي">أخصائي</option>
            <option value="أخصائي أول">أخصائي أول</option>
            <option value="استشاري">استشاري</option>
            <option value="أستاذ مساعد">أستاذ مساعد</option>
            <option value="أستاذ">أستاذ</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-bold text-slate-700 mb-2">
            التاريخ
          </label>
          <input
            type="date"
            id="date"
            value={state.date}
            onChange={(e) => updateState({ date: e.target.value })}
            className="w-full text-sm p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1477af]/20 transition-colors text-left"
            dir="ltr"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="w-full sm:w-auto px-10 py-3.5 sm:py-3 rounded-xl bg-[#1e293b] text-white font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:shadow-none"
        >
          ابدأ ←
        </button>
      </div>
    </div>
  );
}
