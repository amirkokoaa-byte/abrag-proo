import React, { useState, useEffect } from 'react';
import { Sparkles, Moon } from 'lucide-react';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <header className="w-full p-4 md:p-6 border-b border-indigo-500/30 bg-indigo-950/20 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <Moon className="text-cosmic-gold w-8 h-8 md:w-10 md:h-10 animate-pulse-slow" />
            <Sparkles className="absolute -top-1 -right-1 text-white w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-cosmic-gold to-white tracking-wide font-serif">
              القدر الكوني
            </h1>
            <p className="text-xs text-indigo-300 opacity-80">بوابتك لعالم الأبراج</p>
          </div>
        </div>

        {/* Date & Time Section */}
        <div className="flex flex-col items-center md:items-end bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-lg">
          <div className="text-sm font-medium text-cosmic-gold tracking-wide">
            {formatDate(currentDate)}
          </div>
          <div className="text-xl md:text-2xl font-mono text-white font-bold tabular-nums" dir="ltr">
            {formatTime(currentDate)}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;