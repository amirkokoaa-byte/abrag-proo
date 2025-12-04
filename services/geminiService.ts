import { GoogleGenAI } from "@google/genai";
import { ZodiacSign } from "../types";
import { ZODIAC_DATA } from "../constants";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check if API key exists to prevent crashes
const isApiReady = () => !!apiKey;

const getArabicName = (sign: ZodiacSign) => {
    return ZODIAC_DATA.find(z => z.name === sign)?.arabicName || sign;
}

export const getDailyHoroscope = async (sign: ZodiacSign): Promise<string> => {
  if (!isApiReady()) return "الرجاء ضبط مفتاح API للحصول على التوقعات.";

  try {
    const arabicSign = getArabicName(sign);
    // Get current date in Arabic locale for the prompt context
    const today = new Date().toLocaleDateString('ar-EG', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `ابحث عن توقعات برج ${arabicSign} لليوم ${today} على الإنترنت.
      بناءً على نتائج البحث، قم بصياغة "حظك اليوم" بطريقة مشوقة وغامضة.
      
      المطلوب:
      - تلخيص أهم التوقعات المهنية، العاطفية، والصحية لهذا اليوم.
      - تقديم نصيحة فلكية واحدة مستندة إلى حركة الكواكب الحالية المذكورة في النتائج.
      - لا تنسخ النصوص حرفياً، بل أعد صياغتها بأسلوب أدبي جذاب باللغة العربية.
      - اجعل النص لا يقل عن 80 كلمة.`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    let text = response.text || "النجوم محجوبة اليوم. حاول مرة أخرى لاحقاً.";
    
    // Extract search sources if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
        const sources = chunks
            .map((c: any) => c.web?.uri)
            .filter((u: string) => u)
            .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index) // Unique
            .slice(0, 3) // Limit to 3 sources
            .map((u: string) => `• ${u}`)
            .join('\n');
            
        if (sources) {
            text += `\n\nالمصادر:\n${sources}`;
        }
    }

    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ في الاتصال بالكون. الرجاء المحاولة مجدداً.";
  }
};

export const getDeepSignAnalysis = async (sign: ZodiacSign): Promise<string> => {
  if (!isApiReady()) return "الرجاء ضبط مفتاح API للكشف عن الحقائق العميقة.";

  try {
    const arabicSign = getArabicName(sign);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `قدم تحليلاً فلكياً عميقاً ومفصلاً لشخصية برج ${arabicSign} باللغة العربية.
      المطلوب:
      1. السمات الشخصية الجوهرية (الإيجابية والسلبية).
      2. نقاط القوة الخفية.
      3. الطبيعة العاطفية وكيف يحب.
      اكتب ما لا يقل عن 10 أسطر. لا تستخدم نقاط رؤوس أقلام بسيطة، بل اكتب فقرات مترابطة بأسلوب أدبي وعميق.`,
    });
    return response.text || "التحليل غير متاح حالياً.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "لم نتمكن من استرجاع بيانات النجوم.";
  }
};

export const getCompatibilityReport = async (sign1: ZodiacSign, sign2: ZodiacSign): Promise<string> => {
  if (!isApiReady()) return "الرجاء ضبط مفتاح API لحساب التوافق.";

  try {
    const s1 = getArabicName(sign1);
    const s2 = getArabicName(sign2);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `حلل التوافق العاطفي والروحي بين برج ${s1} وبرج ${s2} باللغة العربية.
      قدم تقريراً شاملاً يغطي:
      1. الرابط العاطفي.
      2. أسلوب التفاهم والتواصل.
      3. التحديات المحتملة.
      4. نسبة توافق تقديرية في نهاية النص.
      اكتب بأسلوب سردي ممتع ومفصل.`,
    });
    return response.text || "تقرير التوافق غير متاح.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "النجوم لا يمكنها محاذاة هذا الطلب الآن.";
  }
};