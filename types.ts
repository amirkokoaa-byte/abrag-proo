export enum ZodiacSign {
  Aries = "Aries",
  Taurus = "Taurus",
  Gemini = "Gemini",
  Cancer = "Cancer",
  Leo = "Leo",
  Virgo = "Virgo",
  Libra = "Libra",
  Scorpio = "Scorpio",
  Sagittarius = "Sagittarius",
  Capricorn = "Capricorn",
  Aquarius = "Aquarius",
  Pisces = "Pisces"
}

export interface SignData {
  name: ZodiacSign;
  arabicName: string;
  dateRange: string;
  element: string;
  arabicElement: string;
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
}