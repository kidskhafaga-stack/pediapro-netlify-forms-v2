import React from 'react';
import { Thermometer, Stethoscope } from 'lucide-react';
import { AppState } from '../types';

interface SuccessScreenProps {
  state: AppState;
  onRestart: () => void;
}

export default function SuccessScreen({ state, onRestart }: SuccessScreenProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 max-w-3xl mx-auto mt-8 text-center animate-in zoom-in-95 fade-in duration-500 pb-16">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#1477af]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Decorative Vector Shapes */}
      <svg className="absolute top-0 right-0 w-48 h-48 opacity-20 pointer-events-none text-[#1477af] transform translate-x-12 -translate-y-8" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M47.7,-67.2C59.7,-59.1,65.8,-41,71.2,-23.5C76.6,-6,81.3,10.9,78,26C74.6,41,63.2,54.1,49.2,63.2C35.2,72.4,18.6,77.5,1,76C-16.6,74.5,-33.2,66.4,-47.9,56.5C-62.7,46.5,-75.6,34.7,-80.6,20.1C-85.7,5.4,-82.9,-12.1,-74.6,-26.8C-66.3,-41.6,-52.4,-53.6,-38.4,-61.1C-24.3,-68.5,-12.2,-71.4,2.9,-75C17.9,-78.5,35.8,-75.3,47.7,-67.2Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-56 h-56 opacity-20 pointer-events-none text-[#84cc16] transform -translate-x-16 translate-y-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M37.7,-55.8C52,-48.5,69.1,-43.3,76.5,-31C83.8,-18.6,81.4,-0.4,75.7,15.1C70,30.7,61.1,43.5,49,53.2C36.9,62.9,21.6,69.6,6.3,69.2C-9,68.8,-24,61.4,-38.5,52.8C-53.1,44.2,-67.2,34.5,-73.6,20.6C-80,6.7,-78.8,-11.5,-70.7,-25.6C-62.5,-39.8,-47.5,-49.9,-33.8,-57.4C-20.1,-64.8,-7.6,-69.5,3.3,-73.6C14.1,-77.7,23.3,-63.1,37.7,-55.8Z" transform="translate(100 100)" />
      </svg>
      
      {/* Abstract Circles/Dots */}
      <div className="absolute top-12 right-12 w-6 h-6 bg-[#84cc16] rounded-full opacity-80 shadow-md"></div>
      <div className="absolute top-24 right-8 w-3 h-3 bg-[#1477af] rounded-full opacity-50"></div>
      <div className="absolute bottom-20 left-10 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>

      {/* Floating Icons */}
      <Thermometer className="absolute top-1/3 left-8 w-14 h-14 text-slate-400 opacity-50 transform -rotate-45 hidden md:block" />
      <Stethoscope className="absolute bottom-1/3 right-8 w-16 h-16 text-[#1477af] opacity-30 transform rotate-12 hidden md:block" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 h-16">
          <img 
            src="/logo.png" 
            alt="PediaPro Logo" 
            className="h-full object-contain mx-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden h-12 px-6 bg-[#1477af] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
            PediaPro
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-4 leading-tight">
          🎉 شكراً جزيلاً يا دكتور، مساهمتك تصنع الفارق الحقيقي!
        </h2>
        
        {/* Subtitle */}
        <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
          وقتك الثمين الذي خصصته اليوم ليس مجرد إجابات في استبيان، بل هو حجر الأساس الهندسي والإكلينيكي لنظام PediaPro ليعكس طبيعة عملك الفعلي في العيادة دون أي إهدار للوقت.
        </p>

        {/* Offer Box (Conditional) */}
        {state.offerAccepted && (
          <div className="bg-[#f0fdf4] border-2 border-[#84cc16] rounded-2xl p-6 mb-8 w-full max-w-lg shadow-sm relative mt-4 mx-auto animate-in zoom-in duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#84cc16] text-white px-5 py-1.5 rounded-full font-bold shadow-md flex items-center gap-2 whitespace-nowrap">
              🎁 عرض الشراكة الترحيبي:
            </div>
            <p className="text-[#166534] font-bold text-lg mt-3 leading-relaxed">
              تم تسجيل بياناتك بنجاح، وتأكيد حصولك على:
              <br />
              <span className="text-xl">اشتراك مجاني بالكامل لمدة 3 أشهر</span>
              <br />
              <span className="text-sm font-medium">عند إطلاق النظام رسمياً.</span>
            </p>
          </div>
        )}

        {/* Signature Area */}
        <div className="flex flex-col items-center mt-6 pt-6 w-full max-w-sm">
          <p className="text-slate-600 mb-2 font-medium">مع خالص الاحترام والتقدير،</p>
          
          {/* Signature Image */}
          <div className="my-2 flex justify-center items-center h-24">
            <img 
              src="/signature.png" 
              alt="M. Khafaga Signature" 
              className="h-full object-contain mix-blend-multiply opacity-90"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback if image not found */}
            <span 
              className="hidden text-[#1477af] -rotate-6 transform opacity-90 drop-shadow-sm" 
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem', lineHeight: '1' }}
              dir="ltr"
            >
              M. Khafaga
            </span>
          </div>

          <p className="font-bold text-slate-800 text-lg">م. محمد خفاجه</p>
          <p className="text-sm text-slate-500">المدير التنفيذي لمشروع PediaPro</p>
        </div>
      </div>
      
      {/* Footer Text */}
      <div className="mt-8 text-xs text-slate-400 font-medium absolute bottom-4 left-0 right-0 text-center">
        © {new Date().getFullYear()} PediaPro | Smart Pediatrics Care Solution
      </div>
    </div>
  );
}
