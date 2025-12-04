import { ZodiacSign, SignData } from './types';

export const ZODIAC_DATA: SignData[] = [
  { name: ZodiacSign.Aries, arabicName: "الحمل", dateRange: "Mar 21 - Apr 19", element: "Fire", arabicElement: "ناري" },
  { name: ZodiacSign.Taurus, arabicName: "الثور", dateRange: "Apr 20 - May 20", element: "Earth", arabicElement: "أرضي" },
  { name: ZodiacSign.Gemini, arabicName: "الجوزاء", dateRange: "May 21 - Jun 20", element: "Air", arabicElement: "هوائي" },
  { name: ZodiacSign.Cancer, arabicName: "السرطان", dateRange: "Jun 21 - Jul 22", element: "Water", arabicElement: "مائي" },
  { name: ZodiacSign.Leo, arabicName: "الأسد", dateRange: "Jul 23 - Aug 22", element: "Fire", arabicElement: "ناري" },
  { name: ZodiacSign.Virgo, arabicName: "العذراء", dateRange: "Aug 23 - Sep 22", element: "Earth", arabicElement: "أرضي" },
  { name: ZodiacSign.Libra, arabicName: "الميزان", dateRange: "Sep 23 - Oct 22", element: "Air", arabicElement: "هوائي" },
  { name: ZodiacSign.Scorpio, arabicName: "العقرب", dateRange: "Oct 23 - Nov 21", element: "Water", arabicElement: "مائي" },
  { name: ZodiacSign.Sagittarius, arabicName: "القوس", dateRange: "Nov 22 - Dec 21", element: "Fire", arabicElement: "ناري" },
  { name: ZodiacSign.Capricorn, arabicName: "الجدي", dateRange: "Dec 22 - Jan 19", element: "Earth", arabicElement: "أرضي" },
  { name: ZodiacSign.Aquarius, arabicName: "الدلو", dateRange: "Jan 20 - Feb 18", element: "Air", arabicElement: "هوائي" },
  { name: ZodiacSign.Pisces, arabicName: "الحوت", dateRange: "Feb 19 - Mar 20", element: "Water", arabicElement: "مائي" },
];