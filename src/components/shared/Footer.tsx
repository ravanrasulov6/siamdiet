import Link from "next/link";
import { MessageSquare, Heart, Sparkles } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const waLink = getWhatsAppLink("Salam Siam Diet, Məhsullarınız və qiymət paketləriniz barədə soruşmaq istəyirəm.");

  return (
    <footer className="bg-surface-secondary border-t border-accent/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display font-bold text-2xl tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SIAM DIET
            </span>
            <span className="bg-accent text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wider">
              PREMIUM
            </span>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            Bakının yeni nəsil premium sağlam qidalanma, diet meal və fitness nutrition platforması. 
            Elmin dəqiqliyi və təbiətin gücü ilə hər gum qapınızda.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com/siamdiet" // Placeholder
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-instagram hover:bg-instagram hover:text-white transition-all shadow-sm border border-accent/20"
              aria-label="Instagram səhifəmiz"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-whatsapp hover:bg-whatsapp hover:text-white transition-all shadow-sm border border-accent/20"
              aria-label="WhatsApp əlaqə"
            >
              <MessageSquare size={18} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-display font-semibold text-sm text-text-primary tracking-wider uppercase mb-6">
            Səhifələr
          </h4>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <Link href="/#packages" className="text-text-secondary hover:text-primary transition-colors">
                Diet Paketləri
              </Link>
            </li>
            <li>
              <Link href="/menu" className="text-text-secondary hover:text-primary transition-colors">
                Menyu Explorer
              </Link>
            </li>
            <li>
              <Link href="/build-meal" className="text-text-secondary hover:text-primary transition-colors">
                Boşqab Qurucu (3D)
              </Link>
            </li>
            <li>
              <Link href="/calculator" className="text-text-secondary hover:text-primary transition-colors">
                Kalori Kalkulyatoru
              </Link>
            </li>
          </ul>
        </div>

        {/* E-E-A-T Trust & Medical Statement */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-sm text-text-primary tracking-wider uppercase">
            Tibb və Diyetoloji Zəmanət
          </h4>
          <div className="p-4 bg-white rounded-2xl border border-accent/30 space-y-3">
            <div className="flex items-center space-x-2 text-primary font-semibold text-xs">
              <Heart size={14} className="fill-primary" />
              <span>Diyetoloq Təsdiqli</span>
            </div>
            <p className="text-text-secondary text-[11px] leading-relaxed">
              Bütün qida paketlərimiz və fərdi inqrediyentlər sertifikatlı dietoloq və tibbi mütəxəssislər tərəfindən 
              arıqlama və əzələ qazanma elmi normalarına uyğun olaraq təsdiqlənmişdir.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-accent/20 flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary space-y-4 md:space-y-0">
        <div>
          © {currentYear} Siam Diet. Bütün hüquqlar qorunur.
        </div>
        <div className="flex items-center space-x-1">
          <span>Designed with</span>
          <Sparkles size={12} className="text-primary fill-primary" />
          <span>for Premium Healthy Living in Baku</span>
        </div>
      </div>
    </footer>
  );
}
