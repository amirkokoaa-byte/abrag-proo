import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-6 mt-12 border-t border-indigo-900/50 bg-slate-950/80 backdrop-blur-sm text-center relative z-10">
      <p className="text-indigo-200 font-medium text-lg tracking-wide dir-ltr">
        Developed by <span className="text-cosmic-gold font-bold">Programmer Amir Lamay</span>
      </p>
    </footer>
  );
};

export default Footer;