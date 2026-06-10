"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Flame, ShieldAlert } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface Meal {
  id: string;
  name: string;
  description: string;
  category: "keto" | "balanced" | "protein" | "vegan";
  categoryLabel: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<"all" | "keto" | "balanced" | "protein" | "vegan">("all");

  const meals: Meal[] = [
    {
      id: "toyuq_sote",
      name: "Tərəvəzli Toyuq Sote & Basmati",
      description: "Təzə bibərlərlə qızardılmış şirəli toyuq filesi, buxarda bişmiş zərif basmati düyüsü ilə.",
      category: "balanced",
      categoryLabel: "Sağlam Balans",
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 6,
      price: 8.5,
    },
    {
      id: "beef_stroganoff",
      name: "Mal Əti Stroqanof & Makaron",
      description: "Qaymaqlı zərif sousda mal əti filesi dilimləri, tam taxıllı orqanik makaron ilə.",
      category: "balanced",
      categoryLabel: "Sağlam Balans",
      calories: 520,
      protein: 38,
      carbs: 42,
      fat: 12,
      price: 10.5,
    },
    {
      id: "salmon_firin",
      name: "Fırında Premium Qızılbalıq",
      description: "Omeqa-3 deposu qızılbalıq filesi, təzə qulançar (asparagus) və zeytun yağı sousu ilə.",
      category: "keto",
      categoryLabel: "Ketogenik",
      calories: 490,
      protein: 30,
      carbs: 4,
      fat: 22,
      price: 13.0,
    },
    {
      id: "toyuq_salati_keto",
      name: "Keto Toyuq & Avokado Salatı",
      description: "Toyuq filesi, yetişmiş avokado, qoz ləpəsi, ispanaq yarpaqları və sızma zeytun yağı.",
      category: "keto",
      categoryLabel: "Ketogenik",
      calories: 420,
      protein: 28,
      carbs: 3,
      fat: 18,
      price: 9.0,
    },
    {
      id: "protein_beef_bowl",
      name: "Protein Booster Beef Bowl",
      description: "Zərif dana əti tikələri, proteinli kinoa, buxarda brokoli və Siam özəl sousu.",
      category: "protein",
      categoryLabel: "Yüksək Protein",
      calories: 580,
      protein: 45,
      carbs: 40,
      fat: 14,
      price: 11.0,
    },
    {
      id: "tuna_greens",
      name: "İdmançı Tuna Salatası",
      description: "Konservləşdirilməmiş təbii tun balığı, qaynadılmış kənd yumurtası, kahı və şirin kartof.",
      category: "protein",
      categoryLabel: "Yüksək Protein",
      calories: 510,
      protein: 40,
      carbs: 35,
      fat: 8,
      price: 9.5,
    },
    {
      id: "merci_kotleti",
      name: "Mərci Kotletləri & Sweet Potato",
      description: "Qırmızı mərcidən hazırlanmış vegetarian kotletlər, zərif şirin kartof püresi ilə.",
      category: "vegan",
      categoryLabel: "Vegan / Vegetarian",
      calories: 380,
      protein: 16,
      carbs: 58,
      fat: 4,
      price: 7.0,
    },
    {
      id: "noxud_curry",
      name: "Noxudlu İspanaq Curry & Brown Rice",
      description: "Zəncəfilli Hind ədviyyatları ilə bişmiş noxud sotesi, qəhvəyi düyü ilə.",
      category: "vegan",
      categoryLabel: "Vegan / Vegetarian",
      calories: 410,
      protein: 15,
      carbs: 62,
      fat: 5,
      price: 7.5,
    },
  ];

  const filteredMeals = activeTab === "all" ? meals : meals.filter((m) => m.category === activeTab);

  const tabs = [
    { id: "all", name: "Hamısı" },
    { id: "balanced", name: "Balanslı" },
    { id: "keto", name: "Ketogenik" },
    { id: "protein", name: "Yüksək Protein" },
    { id: "vegan", name: "Vegan" },
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-color-surface-secondary/20 to-transparent">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-color-text-secondary hover:text-color-primary transition-colors">
          <ArrowLeft size={14} />
          <span>Ana Səhifəyə Qayıt</span>
        </Link>

        {/* Title */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-color-text-primary">
            Menyu Explorer
          </h2>
          <p className="font-sans text-color-text-secondary text-sm md:text-base">
            Hər gün diyetoloq təsdiqi ilə bişən təzə və sağlam pəhriz yeməklərimiz.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-color-accent/20 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border ${
                activeTab === tab.id
                  ? "bg-color-primary border-color-primary text-white shadow-sm"
                  : "bg-white border-color-accent/40 text-color-text-secondary hover:bg-color-surface-secondary"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredMeals.map((meal) => {
            const waMessage = `Salam, Mən Siam Diet saytında "${meal.name}" (${meal.price} AZN, ${meal.calories} Kcal) yeməyinə baxdım və bunu sifariş vermək istəyirəm.`;
            const waLink = getWhatsAppLink(waMessage);

            return (
              <div
                key={meal.id}
                className="rounded-3xl bg-white border border-color-accent/30 p-6 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  {/* Category tag */}
                  <span className="text-[10px] font-bold text-color-primary bg-color-accent/40 px-3 py-1 rounded-full uppercase tracking-wider">
                    {meal.categoryLabel}
                  </span>
                  
                  <div className="space-y-1 text-left">
                    <h3 className="font-display font-bold text-base text-color-text-primary">
                      {meal.name}
                    </h3>
                    <p className="text-color-text-secondary text-[11px] leading-relaxed">
                      {meal.description}
                    </p>
                  </div>

                  {/* Nutrition details */}
                  <div className="p-4 bg-color-surface-secondary/40 rounded-2xl border border-color-accent/10 grid grid-cols-4 gap-2 text-center">
                    <div>
                      <span className="text-[9px] font-semibold text-color-text-secondary block">Kalori</span>
                      <span className="font-display font-bold text-xs text-color-text-primary">{meal.calories}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold text-color-text-secondary block">Zülal</span>
                      <span className="font-display font-bold text-xs text-color-text-primary">{meal.protein}g</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold text-color-text-secondary block">Karbo</span>
                      <span className="font-display font-bold text-xs text-color-text-primary">{meal.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold text-color-text-secondary block">Yağ</span>
                      <span className="font-display font-bold text-xs text-color-text-primary">{meal.fat}g</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-1 pt-2">
                    <span className="font-display font-extrabold text-2xl text-color-text-primary">
                      {meal.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold text-color-text-secondary">AZN</span>
                  </div>
                </div>

                {/* WhatsApp button */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-color-primary hover:bg-color-primary/95 text-white font-sans text-xs font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-colors mt-6"
                >
                  <MessageSquare size={14} />
                  <span>Bu Yeməyi Sifariş Et</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
