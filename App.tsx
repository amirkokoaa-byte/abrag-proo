import React, { useState } from 'react';
import { Search, Info, Heart, Star, Calendar, Loader2, Sparkles, MoonStar, ArrowLeft } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import { ZodiacSign } from './types';
import { ZODIAC_DATA } from './constants';
import { calculateAge, getZodiacSign } from './utils/helpers';
import { getDailyHoroscope, getDeepSignAnalysis, getCompatibilityReport } from './services/geminiService';

enum Tab {
  FindSign = 'find',
  Details = 'details',
  Compatibility = 'match',
  Horoscope = 'luck',
  Age = 'age'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.FindSign);

  // State for Find Sign
  const [dob, setDob] = useState('');
  const [foundSign, setFoundSign] = useState<ZodiacSign | null>(null);

  // State for Age Calc
  const [ageResult, setAgeResult] = useState<{ years: number, months: number, days: number } | null>(null);

  // State for Details
  const [selectedDetailSign, setSelectedDetailSign] = useState<ZodiacSign>(ZodiacSign.Aries);
  const [detailContent, setDetailContent] = useState<string>('');
  const [loadingDetails, setLoadingDetails] = useState(false);

  // State for Compatibility
  const [signA, setSignA] = useState<ZodiacSign>(ZodiacSign.Aries);
  const [signB, setSignB] = useState<ZodiacSign>(ZodiacSign.Leo);
  const [compatibilityReport, setCompatibilityReport] = useState<string>('');
  const [loadingMatch, setLoadingMatch] = useState(false);

  // State for Horoscope
  const [horoscopeSign, setHoroscopeSign] = useState<ZodiacSign>(ZodiacSign.Aries);
  const [horoscopeText, setHoroscopeText] = useState<string>('');
  const [loadingHoroscope, setLoadingHoroscope] = useState(false);

  // Helpers
  const getArabicSign = (sign: string) => ZODIAC_DATA.find(z => z.name === sign)?.arabicName || sign;
  const getArabicElement = (sign: string) => ZODIAC_DATA.find(z => z.name === sign)?.arabicElement || '';

  // Feature A Logic
  const handleFindSign = () => {
    if (!dob) return;
    const date = new Date(dob);
    setFoundSign(getZodiacSign(date));
  };

  // Feature B Logic
  const handleFetchDetails = async () => {
    setLoadingDetails(true);
    setDetailContent('');
    const text = await getDeepSignAnalysis(selectedDetailSign);
    setDetailContent(text);
    setLoadingDetails(false);
  };

  // Feature C Logic
  const handleFetchCompatibility = async () => {
    setLoadingMatch(true);
    setCompatibilityReport('');
    const text = await getCompatibilityReport(signA, signB);
    setCompatibilityReport(text);
    setLoadingMatch(false);
  };

  // Feature D Logic
  const handleFetchHoroscope = async () => {
    setLoadingHoroscope(true);
    setHoroscopeText('');
    const text = await getDailyHoroscope(horoscopeSign);
    setHoroscopeText(text);
    setLoadingHoroscope(false);
  };

  // Feature E Logic
  const handleCalculateAge = () => {
    if (!dob) return;
    setAgeResult(calculateAge(new Date(dob)));
  };

  const TabButton: React.FC<{ tab: Tab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`glass-button flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-500 w-full md:w-auto flex-1 relative overflow-hidden group border
        ${activeTab === tab 
          ? 'bg-indigo-600/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-400' 
          : 'border-white/5 text-indigo-300 hover:text-white hover:bg-white/5'
        }`}
    >
      <div className={`mb-2 transition-transform duration-500 ${activeTab === tab ? 'scale-110 -translate-y-1' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className="text-xs md:text-sm font-bold tracking-wide">{label}</span>
      {activeTab === tab && (
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent pointer-events-none animate-pulse"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-cosmic-gold selection:text-black dir-rtl relative" dir="rtl">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 pb-20 relative z-10">
        
        {/* Navigation Tabs */}
        <nav className="flex flex-wrap md:flex-nowrap gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide px-2">
          <TabButton tab={Tab.FindSign} label="اكتشف برجك" icon={<Search className="w-6 h-6" />} />
          <TabButton tab={Tab.Details} label="صفات البرج" icon={<Info className="w-6 h-6" />} />
          <TabButton tab={Tab.Compatibility} label="توافق الأبراج" icon={<Heart className="w-6 h-6" />} />
          <TabButton tab={Tab.Horoscope} label="حظك اليوم" icon={<Star className="w-6 h-6" />} />
          <TabButton tab={Tab.Age} label="حساب العمر" icon={<Calendar className="w-6 h-6" />} />
        </nav>

        {/* Content Area */}
        <div className="glass-panel p-6 md:p-12 rounded-[2.5rem] shadow-2xl min-h-[600px] relative overflow-hidden backdrop-blur-xl border border-white/10">
          
          {/* Celestial Decoration Backgrounds */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          
          {/* Decorative Planet Circle */}
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full border border-white/5 opacity-50 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full border border-white/5 opacity-30 animate-float" style={{animationDelay: '1s'}}></div>

          {/* Feature A: Find Sign */}
          {activeTab === Tab.FindSign && (
            <div className="flex flex-col items-center justify-center space-y-12 animate-[fadeIn_0.6s_ease-out] py-10">
              <div className="text-center relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-cosmic-gold/10 blur-[50px] rounded-full"></div>
                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cosmic-gold to-orange-200 mb-4 drop-shadow-sm relative">من أنت فلكياً؟</h2>
                <p className="text-indigo-200 text-xl font-light">أدخل تاريخ ميلادك لنكشف لك عن حارسك السماوي</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg glass-panel p-3 rounded-2xl border border-white/10 shadow-lg">
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="bg-transparent border-none text-white focus:ring-0 w-full text-center px-4 py-3 text-lg outline-none placeholder-indigo-400/50"
                  style={{ colorScheme: 'dark' }}
                />
                <button 
                  onClick={handleFindSign}
                  className="bg-gradient-to-l from-cosmic-gold to-amber-500 hover:from-amber-400 hover:to-orange-500 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all shadow-lg whitespace-nowrap transform hover:scale-[1.02] active:scale-95"
                >
                  اظهر النتيجة
                </button>
              </div>

              {foundSign && (
                <div className="mt-8 text-center relative group w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-gold/20 to-transparent blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative glass-panel p-10 rounded-3xl border border-white/20 backdrop-blur-2xl transform transition-all hover:-translate-y-2">
                    <div className="text-indigo-300 uppercase tracking-widest text-sm mb-4 font-semibold">برجك هو</div>
                    <div className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      {getArabicSign(foundSign)}
                    </div>
                    <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full text-indigo-100 text-lg border border-white/10">
                      <span>العنصر:</span>
                      <span className="font-bold text-cosmic-gold">{getArabicElement(foundSign)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feature B: Detailed Info */}
          {activeTab === Tab.Details && (
            <div className="space-y-10 animate-[fadeIn_0.6s_ease-out]">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-4">
                  <MoonStar className="w-8 h-8 text-cosmic-gold" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">تحليل الشخصية العميق</span>
                </h2>
                <p className="text-indigo-300 mt-3 text-lg font-light">اكتشف أسرار النجوم وخبايا شخصيتك</p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 glass-panel p-2 rounded-2xl max-w-2xl mx-auto">
                <select 
                  value={selectedDetailSign}
                  onChange={(e) => {
                    setSelectedDetailSign(e.target.value as ZodiacSign);
                    setDetailContent(''); 
                  }}
                  className="bg-transparent border-none rounded-xl px-6 py-3 text-white focus:ring-0 text-lg w-full md:w-auto text-right appearance-none cursor-pointer hover:bg-white/5 transition-colors"
                >
                  {ZODIAC_DATA.map(sign => (
                    <option key={sign.name} value={sign.name} className="bg-slate-900 text-white">{sign.arabicName}</option>
                  ))}
                </select>
                <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                <button 
                  onClick={handleFetchDetails}
                  disabled={loadingDetails}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                >
                  {loadingDetails ? <Loader2 className="animate-spin w-5 h-5" /> : 'حلل الشخصية'}
                </button>
              </div>

              {detailContent && (
                <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cosmic-gold to-transparent opacity-50"></div>
                   <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                     <div className="p-2 bg-cosmic-gold/20 rounded-lg">
                        <Sparkles className="w-6 h-6 text-cosmic-gold" />
                     </div>
                     تحليل برج {getArabicSign(selectedDetailSign)}
                   </h3>
                   <div className="prose prose-lg prose-invert max-w-none text-indigo-100 leading-loose text-right whitespace-pre-line font-medium opacity-90">
                     {detailContent}
                   </div>
                </div>
              )}
            </div>
          )}

          {/* Feature C: Compatibility */}
          {activeTab === Tab.Compatibility && (
            <div className="space-y-12 animate-[fadeIn_0.6s_ease-out]">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-pink-300 drop-shadow-md">مقياس التوافق الفلكي</h2>
                <p className="text-indigo-200 mt-4 text-xl font-light">هل النجوم تدعم هذه العلاقة؟</p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 md:p-12 glass-panel rounded-[2rem] max-w-4xl mx-auto relative">
                
                {/* Sign A */}
                <div className="w-full md:w-1/3 text-center z-10">
                  <label className="block text-indigo-300 text-sm font-bold mb-4 uppercase tracking-wider">الطرف الأول</label>
                  <div className="relative group">
                    <select 
                        value={signA} 
                        onChange={(e) => setSignA(e.target.value as ZodiacSign)}
                        className="w-full bg-slate-900/50 border border-indigo-500/30 hover:border-pink-500/50 rounded-2xl p-4 text-white text-xl text-center appearance-none transition-colors cursor-pointer"
                    >
                        {ZODIAC_DATA.map(s => <option key={s.name} value={s.name} className="bg-slate-900">{s.arabicName}</option>)}
                    </select>
                    <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>
                  </div>
                </div>

                {/* Heart Icon */}
                <div className="relative z-10 -my-6 md:my-0">
                   <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full animate-pulse"></div>
                   <div className="relative bg-slate-900/50 p-4 rounded-full border border-pink-500/30 backdrop-blur-md">
                      <Heart className="w-12 h-12 text-pink-500 fill-pink-500 animate-pulse" />
                   </div>
                </div>

                {/* Sign B */}
                <div className="w-full md:w-1/3 text-center z-10">
                  <label className="block text-indigo-300 text-sm font-bold mb-4 uppercase tracking-wider">الطرف الثاني</label>
                  <div className="relative group">
                    <select 
                        value={signB} 
                        onChange={(e) => setSignB(e.target.value as ZodiacSign)}
                        className="w-full bg-slate-900/50 border border-indigo-500/30 hover:border-pink-500/50 rounded-2xl p-4 text-white text-xl text-center appearance-none transition-colors cursor-pointer"
                    >
                        {ZODIAC_DATA.map(s => <option key={s.name} value={s.name} className="bg-slate-900">{s.arabicName}</option>)}
                    </select>
                    <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={handleFetchCompatibility}
                  disabled={loadingMatch}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-16 rounded-2xl transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)] transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 text-lg"
                >
                   {loadingMatch ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> جاري قراءة النجوم...</span> : 'احسب نسبة التوافق'}
                </button>
              </div>

              {compatibilityReport && (
                <div className="mt-8 glass-panel p-8 rounded-3xl border border-pink-500/20 max-w-3xl mx-auto relative overflow-hidden animate-[slideUp_0.5s_ease-out]">
                  <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 opacity-80"></div>
                  <h3 className="text-2xl font-bold text-pink-200 mb-6 border-b border-pink-500/20 pb-4">
                    تقرير {getArabicSign(signA)} و {getArabicSign(signB)}
                  </h3>
                  <div className="prose prose-invert max-w-none text-indigo-50 leading-loose whitespace-pre-line text-lg font-medium">
                    {compatibilityReport}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feature D: Daily Horoscope */}
          {activeTab === Tab.Horoscope && (
            <div className="flex flex-col items-center space-y-12 animate-[fadeIn_0.6s_ease-out] py-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-cosmic-gold mb-4 drop-shadow-md">حظك اليوم</h2>
                <p className="text-indigo-200 text-xl font-light">رسالة من الكون ليوم <span className="font-bold text-white">{new Date().toLocaleDateString('ar-EG')}</span></p>
              </div>

              <div className="w-full max-w-md relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                  <Star className="h-6 w-6 text-cosmic-gold animate-pulse" />
                </div>
                <select 
                  value={horoscopeSign}
                  onChange={(e) => {
                    setHoroscopeSign(e.target.value as ZodiacSign);
                    setHoroscopeText('');
                  }}
                  className="w-full bg-slate-900/60 border border-indigo-500/40 rounded-2xl py-5 pl-12 pr-6 text-white text-xl text-right focus:ring-2 focus:ring-cosmic-gold appearance-none shadow-lg transition-all hover:bg-slate-900/80 cursor-pointer"
                >
                  {ZODIAC_DATA.map(s => <option key={s.name} value={s.name} className="bg-slate-900">{s.arabicName}</option>)}
                </select>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none"></div>
              </div>

              <button 
                onClick={handleFetchHoroscope}
                disabled={loadingHoroscope}
                className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cosmic-gold to-yellow-500 opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"></div>
                <span className="relative text-slate-900 font-bold text-lg flex items-center gap-2">
                   {loadingHoroscope ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                   {loadingHoroscope ? 'جاري الاتصال بالسماء...' : 'اطلب رسالتك الكونية'}
                </span>
              </button>

              {horoscopeText && (
                <div className="relative glass-panel p-10 md:p-14 rounded-[2rem] max-w-3xl text-center shadow-2xl animate-[fadeIn_0.8s_ease-out] border-t border-white/20">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 border-2 border-cosmic-gold rounded-full p-3 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                    <Sparkles className="w-8 h-8 text-cosmic-gold animate-pulse-slow" />
                  </div>
                  
                  <div className="mb-6 opacity-50">
                     <div className="mx-auto w-12 h-1 bg-gradient-to-r from-transparent via-cosmic-gold to-transparent"></div>
                  </div>

                  <p className="text-xl md:text-2xl text-white leading-relaxed font-serif font-medium drop-shadow-sm">
                    "{horoscopeText}"
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-white/5 text-sm text-cosmic-gold/80 flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    تم التحليل باستخدام الذكاء الاصطناعي بناءً على إحداثيات اليوم
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feature E: Age Calculator */}
          {activeTab === Tab.Age && (
            <div className="flex flex-col items-center justify-center space-y-12 animate-[fadeIn_0.6s_ease-out] py-10">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">آلة الزمن</h2>
                <p className="text-indigo-200 text-xl font-light">احسب دقات قلبك مع الزمن</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg glass-panel p-4 rounded-2xl border border-white/10 shadow-lg">
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="bg-transparent border border-white/10 rounded-xl px-6 py-3 text-white w-full text-center outline-none focus:border-cosmic-gold/50 transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
                <button 
                  onClick={handleCalculateAge}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg whitespace-nowrap min-w-[120px]"
                >
                  احسب
                </button>
              </div>

              {ageResult && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-8">
                  <div className="glass-panel p-8 rounded-3xl text-center group hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/20">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-300 mb-2 drop-shadow-sm">{ageResult.years}</div>
                    <div className="text-lg text-indigo-300 font-bold uppercase tracking-wider group-hover:text-white transition-colors">سنة</div>
                  </div>
                  <div className="glass-panel p-8 rounded-3xl text-center group hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/20">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-300 mb-2 drop-shadow-sm">{ageResult.months}</div>
                    <div className="text-lg text-indigo-300 font-bold uppercase tracking-wider group-hover:text-white transition-colors">شهر</div>
                  </div>
                  <div className="glass-panel p-8 rounded-3xl text-center group hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/20">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-300 mb-2 drop-shadow-sm">{ageResult.days}</div>
                    <div className="text-lg text-indigo-300 font-bold uppercase tracking-wider group-hover:text-white transition-colors">يوم</div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;