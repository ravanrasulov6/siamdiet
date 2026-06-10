"use client";

import Link from "next/link";
import { Star, MessageSquare, ShieldCheck, Award, Heart, ArrowLeft } from "lucide-react";
import { getWhatsAppLink, getCoachContactMessage } from "@/lib/whatsapp";

interface Coach {
  id: string;
  name: string;
  title: string;
  experience: string;
  specialty: string;
  bio: string;
  rating: number;
  avatarBg: string;
  initials: string;
  certificates: string[];
}

export default function CoachesPage() {
  const coaches: Coach[] = [
    {
      id: "leyla_aliyeva",
      name: "Dr. Leyla Əliyeva",
      title: "Senior Dietitian & Qidalanma Mütəxəssisi",
      experience: "8 il təcrübə",
      specialty: "Çəki İtkisi, Ketogenik Pəhriz, Balanslı Qidalanma",
      bio: "Leyla xanım kliniki diyetologiya sahəsində zəngin təcrübəyə malikdir. Müştərilərin fərdi sağlamlıq göstəricilərinə əsasən sağlam çəki itirmə proqramları tərtib edir.",
      rating: 4.9,
      avatarBg: "bg-color-primary/20 text-color-primary",
      initials: "LƏ",
      certificates: ["Kliniki Diyetologiya Sertifikatı", "İnternational Nutrition Association (INA) üzvü"],
    },
    {
      id: "farid_mammadov",
      name: "Coach Fərid Məmmədov",
      title: "Sports Nutrition Coach & İdmançı Qidalanması",
      experience: "6 il təcrübə",
      specialty: "Əzələ Qazanmaq, İdmançı Qidalanması, Bədən Quruluşu",
      bio: "Fərid bəy peşəkar idmançılar və aktiv həyat tərzi sürənlər üçün protein yönümlü və yüksək enerjili qidalanma planları üzrə ixtisaslaşmışdır.",
      rating: 5.0,
      avatarBg: "bg-color-secondary/20 text-color-primary",
      initials: "FM",
      certificates: ["ISSA Sports Nutrition Specialist", "Fitness Nutrition Certification"],
    },
    {
      id: "aytan_gasimova",
      name: "Dr. Aytən Qasımova",
      title: "Therapeutic Dietitian & Vegan Eksperti",
      experience: "5 il təcrübə",
      specialty: "Vegan / Vegetarian Qidalanma, Allergiya və Pəhriz",
      bio: "Aytən xanım xüsusi qidalanma tələbləri olan, vegetarian və vegan həyat tərzinə keçmək istəyənlər üçün zərif və sağlam menyu planlaşdırılması təqdim edir.",
      rating: 4.8,
      avatarBg: "bg-color-accent/50 text-color-primary",
      initials: "AQ",
      certificates: ["Holistic Nutrition Certificate", "Certified Vegan Nutritionist"],
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-color-surface-secondary/20 to-transparent">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-color-text-secondary hover:text-color-primary transition-colors">
          <ArrowLeft size={14} />
          <span>Ana Səhifəyə Qayıt</span>
        </Link>

        {/* Headline */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-color-text-primary">
            Bizim qidalanma mütəxəssislərimiz
          </h2>
          <p className="font-sans text-color-text-secondary text-sm md:text-base">
            Paketlərimizdən hər hansı birini əldə edən hər bir şəxs üçün xüsusi qida rasionu hesablanacaq və hər gün səhər ünvana pulsuz çatdırılma təmin ediləcəkdir.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {coaches.map((coach) => {
            const contactMsg = getCoachContactMessage(coach.name, coach.specialty);
            const waLink = getWhatsAppLink(contactMsg);

            return (
              <div
                key={coach.id}
                className="rounded-3xl bg-white border border-color-accent/30 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                {/* Visual Header */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    {/* Avatar Placeholder */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl ${coach.avatarBg}`}>
                      {coach.initials}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-color-text-primary leading-tight">
                        {coach.name}
                      </h3>
                      <p className="text-color-primary font-semibold text-xs mt-1">
                        {coach.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs">
                    <span className="font-medium text-color-text-secondary bg-color-surface-secondary px-3 py-1 rounded-full">
                      {coach.experience}
                    </span>
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star size={12} className="fill-current mr-1" />
                      <span>{coach.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-color-text-secondary text-xs leading-relaxed">
                    {coach.bio}
                  </p>

                  {/* Specialty box */}
                  <div className="p-4 bg-color-surface-secondary/50 rounded-2xl border border-color-accent/10 space-y-2">
                    <h4 className="font-display font-semibold text-xs text-color-text-primary">
                      İxtisaslaşma:
                    </h4>
                    <p className="text-color-text-secondary text-[11px] leading-relaxed">
                      {coach.specialty}
                    </p>
                  </div>

                  {/* Certificates */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-1.5 text-xs text-color-text-primary font-semibold">
                      <Award size={14} className="text-color-primary" />
                      <span>Sertifikatlar</span>
                    </div>
                    <ul className="space-y-1.5 text-[10px] text-color-text-secondary">
                      {coach.certificates.map((cert) => (
                        <li key={cert} className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-color-primary shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-color-primary hover:bg-color-primary/95 text-white font-sans text-xs font-semibold py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-colors mt-8"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp-da Danış</span>
                </a>
              </div>
            );
          })}
        </div>
        
        {/* Banner */}
        <div className="bg-color-accent/20 border border-color-primary/10 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-12">
          <div className="space-y-2 text-left max-w-xl">
            <h3 className="font-display font-semibold text-lg text-color-text-primary flex items-center gap-2">
              <ShieldCheck className="text-color-primary" />
              <span>Etibarlı və Peşəkar Qərar</span>
            </h3>
            <p className="text-color-text-secondary text-xs leading-relaxed">
              Bütün məşqçilərimiz müvafiq lisenziyalara və sertifikatlara malikdir. Biz sizin sağlamlıq göstəricilərinizi və hədəflərinizi fərdi şəkildə dəyərləndiririk.
            </p>
          </div>
          <a
            href={getWhatsAppLink("Salam, Mənə ən uyğun diyetoloqu seçməkdə köməklik etməyinizi istəyirəm.")}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn bg-color-primary hover:bg-color-primary/95 text-white font-sans text-xs font-semibold px-8 py-3 rounded-full flex items-center space-x-2 shrink-0 transition-transform"
          >
            <MessageSquare size={14} />
            <span>Mənə Uyğun Diyetoloqu Tap</span>
          </a>
        </div>
      </div>
    </div>
  );
}
