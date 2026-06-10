"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Check, MessageSquare, Play, HelpCircle, Star, Plus } from "lucide-react";
import SplashIntro from "@/components/ui/SplashIntro";
import { getWhatsAppLink, getPackageOrderMessage, getCoachContactMessage } from "@/lib/whatsapp";
import { useState } from "react";

// Dynamic import of 3D Canvas to bypass Server-Side Rendering (SSR) issues
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center bg-color-surface-secondary/40 rounded-3xl border border-color-accent/10">
      <div className="text-sm text-color-text-secondary font-medium animate-pulse">
        3D Premium Ekosistem yüklənir...
      </div>
    </div>
  ),
});

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"WEEKLY" | "MONTHLY">("WEEKLY");

  const packages = [
    {
      name: "SlimFit",
      description: "Çəki itirmək və fit bədənə qovuşmaq üçün zərif balanslaşdırılmış pəhriz.",
      calories: "1200 - 1500 Kcal / Gün",
      weeklyPrice: 90,
      monthlyPrice: 320,
      features: [
        "Diyetoloq təsdiqli menyu",
        "Hər gün təzə çatdırılma",
        "İstənilməyən inqrediyentlərin çıxarılması",
        "Gündəlik 3 əsas yemək + 2 qəlyanaltı",
        "Həftəlik çəki və tərəqqi təhlili",
      ],
      tag: "Ən Populyar",
    },
    {
      name: "DailyBalance",
      description: "Gün boyu yüksək enerji və sağlam həyat üçün balanslı qidalanma.",
      calories: "1600 - 2000 Kcal / Gün",
      weeklyPrice: 105,
      monthlyPrice: 380,
      features: [
        "Premium təbii qidalar",
        "Yüksək lifli tərəvəzlər və meyvələr",
        "Ofisə və ya evə çatdırılma",
        "Gündəlik 3 əsas yemək + 1 sağlam desert",
        "Gözəl dad və çeşid zəmanəti",
      ],
      tag: "Balanslı",
    },
    {
      name: "PowerGain",
      description: "Əzələ kütləsini artırmaq və idman performansını maksimuma çatdırmaq üçün protein deposu.",
      calories: "2200 - 3000 Kcal / Gün",
      weeklyPrice: 120,
      monthlyPrice: 440,
      features: [
        "Yüksək protein (min 130g zülal)",
        "Premium ət, toyuq və salmon",
        "Karbohidrat balansı",
        "Gündəlik 4 əsas yemək + 1 protein shake",
        "İdmançıya uyğun fərdiləşdirilmə",
      ],
      tag: "Performans",
    },
  ];

  const faqItems = [
    {
      question: "Yeməklər necə və harada hazırlanır?",
      answer: "Yeməklərimiz gigiyenik tələblərə tam cavab verən premium mətbəximizdə, peşəkar aşpazlar və diyetoloqlar tərəfindən hər gün təzə olaraq hazırlanır. Heç bir konservantdan istifadə olunmur.",
    },
    {
      question: "Çatdırılma necə və hansı saatlarda baş verir?",
      answer: "Çatdırılma hər gün səhər tezdən xüsusi soyuduculu çantalarımızla həyata keçirilir. Siz özünüz üçün iki vaxt aralığından birini seçə bilərsiniz: Səhər 07:00 - 09:00 və ya 09:00 - 11:00.",
    },
    {
      question: "Ödənişi və sifarişi necə rəsmiləşdiririk?",
      answer: "Bütün sifarişlər sayt üzərindən istədiyiniz paketi və ya kalorini seçib menecerlərimizlə WhatsApp-a keçid etdikdən sonra təsdiqlənir. Ödəniş WhatsApp üzərindən göndərilən linklə, bank köçürməsi və ya qapıda kartla/nağd şəkildə edilə bilər.",
    },
    {
      question: "Bəyənmədiyim və ya allergiyam olan qidaları çıxara bilərəmmi?",
      answer: "Bəli! Sifariş zamanı allergiyanız olan və ya dadını bəyənmədiyiniz qidaları (məsələn: soğan, göbələk) qeyd edirsiniz və aşpazlarımız həmin inqrediyentləri sizin menyunuzdan tamamilə çıxarır.",
    },
  ];

  return (
    <>
      <SplashIntro />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-12 overflow-hidden bg-gradient-to-b from-color-surface-secondary/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines */}
          <div className="lg:col-span-6 space-y-8 text-left z-10">

            <h2 className="font-display font-bold text-4xl md:text-6xl text-color-text-primary leading-[1.1] tracking-tight">
              Sağlamlığınız üçün <span className="bg-gradient-to-r from-color-primary to-color-secondary bg-clip-text text-transparent">Premium Yemək</span> Xidməti
            </h2>
            
            <p className="font-sans text-color-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
              Kalorini hesabla. Menyunu qur. Sağlam qidalan. Biz çatdıraq. Qapınıza qədər gələn ləzzətli və diyetoloq təsdiqli sağlamlıq.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/calculator"
                className="glow-btn bg-color-primary hover:bg-color-primary/95 text-white font-sans text-sm font-semibold px-8 py-4 rounded-full flex items-center justify-center space-x-2 shadow-[0_8px_25px_rgba(123,198,126,0.25)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Planını Qur</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/menu"
                className="bg-white hover:bg-color-surface-secondary text-color-text-primary font-sans text-sm font-semibold px-8 py-4 rounded-full border border-color-accent/40 flex items-center justify-center space-x-2 shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                <span>Menyuya Bax</span>
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-color-accent/10 flex items-center space-x-6 text-xs text-color-text-secondary">
              <div className="flex -space-x-2">
                <span className="w-8 h-8 rounded-full bg-color-primary/20 border-2 border-white flex items-center justify-center font-bold text-[10px] text-color-primary">L</span>
                <span className="w-8 h-8 rounded-full bg-color-secondary/20 border-2 border-white flex items-center justify-center font-bold text-[10px] text-color-primary">A</span>
                <span className="w-8 h-8 rounded-full bg-color-accent/50 border-2 border-white flex items-center justify-center font-bold text-[10px] text-color-primary">T</span>
              </div>
              <div>
                <div className="flex text-amber-400 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-current" />
                  ))}
                </div>
                <p className="font-semibold text-color-text-primary">200+ Razı müştərilər</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Ecosystem */}
          <div className="lg:col-span-6 h-[400px] md:h-[600px] w-full relative">
            <HeroScene />
          </div>
        </div>
      </section>

      {/* Why Siam Diet Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4 max-w-xl mx-auto">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-color-text-primary">
              Niyə Siam Diet?
            </h3>
            <p className="font-sans text-color-text-secondary text-sm md:text-base">
              Hər gün sağlamlığınızı dəqiqliklə və qayğı ilə qoruyuruq.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-color-background/50 border border-color-accent/10 space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-color-accent flex items-center justify-center text-color-primary font-bold text-xl">
                🥗
              </div>
              <h4 className="font-display font-semibold text-lg text-color-text-primary">Mütəxəssis Diyetoloq Təsdiqi</h4>
              <p className="text-color-text-secondary text-sm leading-relaxed">
                Menyularımız sadəcə yemək deyil, hər bir inqrediyenti diqqətlə ölçülmüş tibbi sağlamlıq formullarıdır.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-color-background/50 border border-color-accent/10 space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-color-accent flex items-center justify-center text-color-primary font-bold text-xl">
                👩‍🍳
              </div>
              <h4 className="font-display font-semibold text-lg text-color-text-primary">Gurme Aşpaz Ləzzəti</h4>
              <p className="text-color-text-secondary text-sm leading-relaxed">
                Sağlam yeməklərin darıxdırıcı olduğunu kim dedi? Hər boşqabımız damaq dadınızı oxşayacaq şəkildə hazırlanır.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-color-background/50 border border-color-accent/10 space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-color-accent flex items-center justify-center text-color-primary font-bold text-xl">
                🚀
              </div>
              <h4 className="font-display font-semibold text-lg text-color-text-primary">Hər Səhər Qapınızda</h4>
              <p className="text-color-text-secondary text-sm leading-relaxed">
                Gündəlik qidalarınız xüsusi temperatur rejimi qorunan qutularda hər səhər təyin etdiyiniz saatda çatdırılır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-color-surface-secondary/40">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4 max-w-xl mx-auto">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-color-text-primary">
              Necə İşləyir?
            </h3>
            <p className="font-sans text-color-text-secondary text-sm md:text-base">
              Sağlam həyata başlamaq cəmi 3 addım qədər asandır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="space-y-4 relative">
              <span className="text-7xl font-display font-extrabold text-color-primary/15 block">01</span>
              <h4 className="font-display font-semibold text-lg text-color-text-primary">Kalorini Hesabla</h4>
              <p className="text-color-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                Pulsuz kalkulyatorumuz vasitəsilə boy, çəki və hədəfinizə uyğun gündəlik kalorini tapın.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-7xl font-display font-extrabold text-color-primary/15 block">02</span>
              <h4 className="font-display font-semibold text-lg text-color-text-primary">Planını və Paketini Seç</h4>
              <p className="text-color-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                Həftəlik və ya aylıq pəhriz paketlərini müəyyən edin. İstəmədiyiniz inqrediyentləri çıxarın.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-7xl font-display font-extrabold text-color-primary/15 block">03</span>
              <h4 className="font-display font-semibold text-lg text-color-text-primary">WhatsApp ilə Sifariş Et</h4>
              <p className="text-color-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                Dinamik sifariş linkinə klikləyib birbaşa menecerimizə yazın. Çatdırılmanı başladaq!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diet Packages Section */}
      <section id="packages" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-6 max-w-xl mx-auto">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-color-text-primary">
              Diet Paketlərimiz
            </h3>
            <p className="font-sans text-color-text-secondary text-sm md:text-base">
              İstəyinizə və kalori tələbinizə uyğun hazırlanmış premium diet paketləri.
            </p>

            {/* Billing cycle switcher */}
            <div className="inline-flex p-1 bg-color-surface-secondary rounded-full">
              <button
                onClick={() => setBillingCycle("WEEKLY")}
                className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === "WEEKLY" ? "bg-color-primary text-white shadow-sm" : "text-color-text-secondary"
                }`}
              >
                Həftəlik Plan
              </button>
              <button
                onClick={() => setBillingCycle("MONTHLY")}
                className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === "MONTHLY" ? "bg-color-primary text-white shadow-sm" : "text-color-text-secondary"
                }`}
              >
                Aylıq Plan (Böyük Qənaət)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const price = billingCycle === "WEEKLY" ? pkg.weeklyPrice : pkg.monthlyPrice;
              const orderMessage = getPackageOrderMessage(pkg.name);
              const link = getWhatsAppLink(orderMessage);

              return (
                <div
                  key={pkg.name}
                  className="rounded-3xl bg-white border border-color-accent/30 p-8 text-left space-y-6 flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
                >
                  {pkg.tag && (
                    <span className="absolute top-4 right-4 bg-color-accent text-color-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {pkg.tag}
                    </span>
                  )}
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-xl text-color-text-primary">{pkg.name}</h4>
                    <p className="text-color-text-secondary text-xs leading-relaxed">{pkg.description}</p>
                    <div className="text-xs font-semibold text-color-primary bg-color-accent/30 inline-block px-3 py-1 rounded-lg">
                      {pkg.calories}
                    </div>
                    
                    {/* Price display */}
                    <div className="pt-4 flex items-baseline space-x-2">
                      <span className="font-display font-extrabold text-4xl text-color-text-primary">{price}</span>
                      <span className="text-sm font-semibold text-color-text-secondary">AZN / {billingCycle === "WEEKLY" ? "həftə" : "ay"}</span>
                    </div>

                    <div className="border-t border-color-accent/10 pt-6 space-y-3">
                      {pkg.features.map((feat) => (
                        <div key={feat} className="flex items-center space-x-2 text-xs text-color-text-primary">
                          <Check size={14} className="text-color-primary font-bold" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-color-primary hover:bg-color-primary/95 text-white font-sans text-xs font-semibold py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-colors mt-6"
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp ilə Sifariş</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coach Showcase Section */}
      <section className="py-24 bg-color-surface-secondary/20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4 max-w-xl mx-auto">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-color-text-primary">
              Bizim qidalanma mütəxəssislərimiz
            </h3>
            <p className="font-sans text-color-text-secondary text-sm md:text-base">
              Paketlərimizdən hər hansı birini əldə edən hər bir şəxs üçün xüsusi qida rasionu hesablanacaq və hər gün səhər ünvana pulsuz çatdırılma təmin ediləcəkdir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coach 1 */}
            <div className="bg-white p-8 rounded-3xl border border-color-accent/30 text-left flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-color-primary/20 text-color-primary flex items-center justify-center font-display font-bold">LƏ</div>
                  <div>
                    <h4 className="font-display font-bold text-base text-color-text-primary">Dr. Leyla Əliyeva</h4>
                    <p className="text-[10px] text-color-primary font-semibold">Senior Dietitian</p>
                  </div>
                </div>
                <p className="text-color-text-secondary text-xs leading-relaxed">
                  Çəki itkisi və ketogenik pəhriz proqramları üzrə 8 illik klinik təcrübəyə malik peşəkar mütəxəssis.
                </p>
                <div className="text-[10px] text-color-text-secondary flex items-center gap-1 bg-color-surface-secondary px-3 py-1 rounded-full w-fit">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold">4.9</span>
                  <span>(120+ rəy)</span>
                </div>
              </div>
              <a
                href={getWhatsAppLink(getCoachContactMessage("Dr. Leyla Əliyeva", "Çəki İtkisi, Ketogenik Pəhriz"))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-color-primary hover:bg-color-primary/95 text-white text-center font-sans text-xs font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 mt-6"
              >
                <MessageSquare size={14} />
                <span>Məsləhət Al</span>
              </a>
            </div>

            {/* Coach 2 */}
            <div className="bg-white p-8 rounded-3xl border border-color-accent/30 text-left flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-color-secondary/20 text-color-primary flex items-center justify-center font-display font-bold">FM</div>
                  <div>
                    <h4 className="font-display font-bold text-base text-color-text-primary">Coach Fərid Məmmədov</h4>
                    <p className="text-[10px] text-color-primary font-semibold">Sports Nutrition Coach</p>
                  </div>
                </div>
                <p className="text-color-text-secondary text-xs leading-relaxed">
                  İdmançı qidalanması və əzələ kütləsinin artırılması üzrə 6 illik təcrübə, ISSA sertifikatlı.
                </p>
                <div className="text-[10px] text-color-text-secondary flex items-center gap-1 bg-color-surface-secondary px-3 py-1 rounded-full w-fit">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold">5.0</span>
                  <span>(95+ rəy)</span>
                </div>
              </div>
              <a
                href={getWhatsAppLink(getCoachContactMessage("Coach Fərid Məmmədov", "Əzələ Qazanmaq, İdmançı Qidalanması"))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-color-primary hover:bg-color-primary/95 text-white text-center font-sans text-xs font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 mt-6"
              >
                <MessageSquare size={14} />
                <span>Məsləhət Al</span>
              </a>
            </div>

            {/* Coach 3 */}
            <div className="bg-white p-8 rounded-3xl border border-color-accent/30 text-left flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-color-accent/50 text-color-primary flex items-center justify-center font-display font-bold">AQ</div>
                  <div>
                    <h4 className="font-display font-bold text-base text-color-text-primary">Dr. Aytən Qasımova</h4>
                    <p className="text-[10px] text-color-primary font-semibold">Therapeutic Dietitian</p>
                  </div>
                </div>
                <p className="text-color-text-secondary text-xs leading-relaxed">
                  Vegan/Vegetarian qidalanma, allergiyası olanlar üçün pəhriz üzrə 5 illik təcrübə, Holistic ekspert.
                </p>
                <div className="text-[10px] text-color-text-secondary flex items-center gap-1 bg-color-surface-secondary px-3 py-1 rounded-full w-fit">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold">4.8</span>
                  <span>(80+ rəy)</span>
                </div>
              </div>
              <a
                href={getWhatsAppLink(getCoachContactMessage("Dr. Aytən Qasımova", "Vegan / Vegetarian Qidalanma, Allergiyalar"))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-color-primary hover:bg-color-primary/95 text-white text-center font-sans text-xs font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 mt-6"
              >
                <MessageSquare size={14} />
                <span>Məsləhət Al</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/coaches"
              className="bg-white hover:bg-color-surface-secondary text-color-text-primary font-sans text-xs font-semibold px-8 py-3.5 rounded-full border border-color-accent/40 shadow-sm transition-all"
            >
              Bütün Diyetoloqlarımıza Bax
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Transformations (Social Proof) */}
      <section className="py-24 bg-color-surface-secondary/40">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4 max-w-xl mx-auto">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-color-text-primary">
              Müştəri Nəticələrimiz
            </h3>
            <p className="font-sans text-color-text-secondary text-sm md:text-base">
              Siam Diet ilə xəyallarındakı bədənə qovuşan bəzi müştərilərimizin hekayəsi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-color-accent/30 flex flex-col md:flex-row items-center gap-8 text-left">
              <div className="w-24 h-24 rounded-full bg-color-accent/50 flex items-center justify-center font-display font-bold text-color-primary text-3xl shrink-0">
                LM
              </div>
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <h4 className="font-display font-semibold text-lg text-color-text-primary">Leyla M. (Bank İşçisi)</h4>
                <div className="text-xs font-bold text-color-primary bg-color-accent px-3 py-1 rounded-full inline-block">
                  1 ayda -7.5 kq
                </div>
                <p className="text-color-text-secondary text-xs leading-relaxed">
                  \"Hər gün saatlarla yemək hazırlamaqdan canım qurtardı. Həm arıqladım, həm də işdə özümü daha enerjili və fokuslanmış hiss edirəm. Yeməklər çox ləzzətlidir!\"
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-color-accent/30 flex flex-col md:flex-row items-center gap-8 text-left">
              <div className="w-24 h-24 rounded-full bg-color-accent/50 flex items-center justify-center font-display font-bold text-color-primary text-3xl shrink-0">
                AS
              </div>
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <h4 className="font-display font-semibold text-lg text-color-text-primary">Anar S. (İT Mütəxəssis / İdmançı)</h4>
                <div className="text-xs font-bold text-color-primary bg-color-accent px-3 py-1 rounded-full inline-block">
                  3 ayda +5 kq Təmiz Əzələ
                </div>
                <p className="text-color-text-secondary text-xs leading-relaxed">
                  \"İdmanla məşğul oluram və PowerGain paketi mənim üçün xilasedici oldu. Kalori və zülal (protein) dəyərlərinin dəqiq qeyd olunması tərəqqimi çox asanlaşdırır.\"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-color-text-primary">
              Tez-tez Verilən Suallar
            </h3>
            <p className="font-sans text-color-text-secondary text-sm md:text-base">
              Ağlınızdakı bütün suallara aydın və səmimi cavablar.
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-color-surface-secondary/50 border border-color-accent/15 space-y-3"
              >
                <div className="flex items-start space-x-3 text-color-text-primary">
                  <HelpCircle size={18} className="text-color-primary mt-0.5 shrink-0" />
                  <h4 className="font-display font-semibold text-base leading-snug">{item.question}</h4>
                </div>
                <p className="text-color-text-secondary text-xs leading-relaxed pl-7">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent to-color-surface-secondary/40 text-center">
        <div className="max-w-4xl mx-auto px-6 p-12 rounded-3xl bg-color-accent/20 border border-color-primary/10 space-y-8 relative overflow-hidden">
          {/* Decorative floating blur inside box */}
          <div className="absolute w-64 h-64 rounded-full bg-color-primary/10 blur-[80px] -top-12 -left-12" />
          <div className="absolute w-64 h-64 rounded-full bg-color-secondary/10 blur-[80px] -bottom-12 -right-12" />
          
          <div className="relative space-y-4">
            <h3 className="font-display font-bold text-3xl md:text-5xl text-color-text-primary">
              Sağlamlığınızı Bu Gün Dəyişdirin
            </h3>
            <p className="font-sans text-color-text-secondary text-sm md:text-base max-w-lg mx-auto">
              Sualınız var, yoxsa sifariş vermək istəyirsiniz? WhatsApp düyməsinə klikləyin, menecerimiz dərhal sizə kömək etsin.
            </p>
          </div>

          <div className="relative flex justify-center pt-2">
            <a
              href={getWhatsAppLink("Salam Siam Diet, Mən pəhriz paketləriniz barədə ətraflı məsləhət almaq istəyirəm.")}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn bg-color-primary hover:bg-color-primary/95 text-white font-sans text-sm font-semibold px-10 py-4 rounded-full flex items-center space-x-3 shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              <MessageSquare size={18} />
              <span>Menecerlə Əlaqə saxla</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
