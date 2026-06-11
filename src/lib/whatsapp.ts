export const WHATSAPP_NUMBER = "994501234567"; // Siam Diet əlaqə nömrəsi

/**
 * Generates a WhatsApp API link with encoded text
 */
export function getWhatsAppLink(text: string): string {
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
}

/**
 * V3 pre-filled message for specific diet package
 */
export function getPackageOrderMessage(packageName: string, planType: string, price: number): string {
  return `Salam.

Mən Siam Diet saytında "${packageName}" (${planType} plan, ${price} AZN) proqramına baxdım.

Əlavə məlumat almaq istəyirəm.

Boy: 
Çəki: 
Məqsəd: 

Təşəkkürlər.`;
}

/**
 * V3 pre-filled message for calculated calories from Nutrition Calculator
 */
export function getCalculatorOrderMessage(calories: number, bmi: number, category: string): string {
  return `Salam.

Mən Siam Diet saytında kalori kalkulyatorunu tamamladım.

Nəticələrim:
Gündəlik kalori tələbatı: ${calories} Kcal
BMI: ${bmi} (${category})

Bu nəticələrə əsasən məsləhət almaq istəyirəm.`;
}

/**
 * V3 pre-filled message for custom built meal (Build Your Meal)
 */
export function getCustomMealOrderMessage(
  protein: string,
  carb: string,
  vegetable: string,
  drink: string,
  calories: number
): string {
  return `Salam.

Siam Diet Meal Builder-də aşağıdakı menyunu qurdum.

Protein: ${protein}
Karbohidrat: ${carb}
Tərəvəz: ${vegetable}
İçki: ${drink}
Kalori: ${calories} Kcal

Bu menyu mənim üçün uyğundur?`;
}

/**
 * V3 pre-filled message for contacting a specific Coach (dietitian)
 */
export function getCoachContactMessage(coachName: string, specialty: string): string {
  return `Salam.

Mən Siam Diet saytında diyetoloq ${coachName} (${specialty}) profilinə baxdım.

Diyetoloqumuzla WhatsApp-da söhbətə başlamaq və qidalanma proqramı haqqında məsləhət almaq istəyirəm.`;
}
