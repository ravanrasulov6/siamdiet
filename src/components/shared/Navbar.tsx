"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Menu, X, ArrowUpRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Set initial hash
    setCurrentHash(window.location.hash);

    const handleScroll = () => {
      // 1. Scrolled state for header background
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Scroll Spy for active section highlight
      const packagesEl = document.getElementById("packages");
      if (packagesEl && pathname === "/") {
        const rect = packagesEl.getBoundingClientRect();
        // If packages section is in the viewport (near the top)
        if (rect.top <= 150 && rect.bottom >= 150) {
          setCurrentHash("#packages");
        } else {
          setCurrentHash("");
        }
      }
    };

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentHash("");
      window.history.pushState(null, "", "/");
    } else if (href === "/#packages" && pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("packages");
      if (el) {
        const yOffset = -100; // Leave 100px margin at top for fixed navbar
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setCurrentHash("#packages");
        window.history.pushState(null, "", "/#packages");
      }
    }
  };

  const navLinks = [
    { name: "Ana Səhifə", href: "/" },
    { name: "Paketlər", href: "/#packages" },
    { name: "Diyetoloqlar", href: "/coaches" },
    { name: "Kalori Ehtiyacını hesabla", href: "/calculator" },
  ];

  const waLink = getWhatsAppLink("Salam Siam Diet, Məhsullarınız barədə ətraflı məlumat almaq istəyirəm.");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-[0_4px_30px_rgba(123,198,126,0.03)]" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-display font-bold text-2xl tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SIAM DIET
          </span>
          <span className="bg-accent text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wider">
            AZ
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            let isActive = false;
            if (link.href === "/") {
              isActive = pathname === "/" && currentHash !== "#packages";
            } else if (link.href === "/#packages") {
              isActive = pathname === "/" && currentHash === "#packages";
            } else {
              isActive = pathname === link.href;
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-sans text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-text-primary/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn bg-whatsapp hover:bg-whatsapp/90 text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-full flex items-center space-x-2 shadow-[0_4px_15px_rgba(37,211,102,0.2)] transition-all transform hover:-translate-y-0.5"
          >
            <MessageSquare size={16} />
            <span>WhatsApp Sifariş</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-primary hover:text-primary focus:outline-none"
          aria-label="Menyu aç/bağla"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-accent py-6 px-6 shadow-lg z-40 flex flex-col space-y-4 animate-fade-in">
          {navLinks.map((link) => {
            let isActive = false;
            if (link.href === "/") {
              isActive = pathname === "/" && currentHash !== "#packages";
            } else if (link.href === "/#packages") {
              isActive = pathname === "/" && currentHash === "#packages";
            } else {
              isActive = pathname === link.href;
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setIsOpen(false);
                  handleLinkClick(e, link.href);
                }}
                className={`font-sans text-base font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-surface-secondary">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp hover:bg-whatsapp/90 text-white font-sans text-sm font-semibold py-3 rounded-full flex justify-center items-center space-x-2 w-full shadow-md"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Sifariş</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
