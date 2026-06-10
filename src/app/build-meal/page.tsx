"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Apple, Flame, Info } from "lucide-react";
import {
  useConfiguratorStore,
  PROTEINS,
  CARBS,
  VEGETABLES,
  DRINKS,
  IngredientOption,
} from "@/store/configuratorStore";
import { getWhatsAppLink, getCustomMealOrderMessage } from "@/lib/whatsapp";

// Dynamically import PlateScene to avoid SSR WebGL issues
const PlateScene = dynamic(() => import("@/components/3d/PlateScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-color-surface-secondary/40 rounded-3xl border border-color-accent/10">
      <div className="text-sm text-color-text-secondary font-medium animate-pulse">
        3D Boşqab strukturu yüklənir...
      </div>
    </div>
  ),
});

export default function BuildMealPage() {
  const {
    protein,
    carb,
    vegetable,
    drink,
    setProtein,
    setCarb,
    setVegetable,
    setDrink,
    resetSelection,
    getTotals,
  } = useConfiguratorStore();

  useEffect(() => {
    // Reset selection on mount
    resetSelection();
  }, [resetSelection]);

  const totals = getTotals();

  const waMessage = getCustomMealOrderMessage(
    protein.nameAz,
    carb.nameAz,
    vegetable.nameAz,
    totals.calories
  );
  
  const waLink = getWhatsAppLink(waMessage);

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-color-surface-secondary/20 to-transparent">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-color-text-secondary hover:text-color-primary transition-colors">
          <ArrowLeft size={14} />
          <span>Ana Səhifəyə Qayıt</span>
        </Link>

        {/* Title */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-color-text-primary">
            Boşqab Qurucu (Meal Builder)
          </h2>
          <p className="font-sans text-color-text-secondary text-sm">
            İstədiyiniz inqrediyentləri seçin, kalorini real vaxtda hesablayın və WhatsApp vasitəsilə təsdiqləyin.
          </p>
        </div>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Left Column: 3D Plate View */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-color-accent/30 shadow-sm flex flex-col justify-between min-h-[400px] lg:min-h-[550px]">
            <div className="text-left space-y-1">
              <h3 className="font-display font-bold text-base text-color-text-primary flex items-center space-x-2">
                <Apple size={16} className="text-color-primary" />
                <span>3D Boşqab İcmalı</span>
              </h3>
              <p className="text-color-text-secondary text-[11px]">
                Seçimlərinizi vizual olaraq izləmək üçün boşqabı döndərə və yaxınlaşdıra bilərsiniz.
              </p>
            </div>
            
            {/* 3D Scene Wrapper */}
            <div className="flex-grow w-full h-[300px] lg:h-[400px]">
              <PlateScene />
            </div>

            {/* Nutrients Aggregator */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-color-surface-secondary/60 rounded-2xl border border-color-accent/15 text-center">
              <div>
                <span className="text-[10px] font-semibold text-color-text-secondary block">Ümumi Kalori</span>
                <span className="font-display font-bold text-sm text-color-text-primary flex items-center justify-center gap-1 mt-0.5">
                  <Flame size={12} className="text-color-primary fill-color-primary" />
                  {totals.calories} Kcal
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-color-text-secondary block">Zülal (Protein)</span>
                <span className="font-display font-bold text-sm text-color-text-primary block mt-0.5">{totals.protein}g</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-color-text-secondary block">Karbohidrat</span>
                <span className="font-display font-bold text-sm text-color-text-primary block mt-0.5">{totals.carbs}g</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-color-text-secondary block">Yağ</span>
                <span className="font-display font-bold text-sm text-color-text-primary block mt-0.5">{totals.fat}g</span>
              </div>
            </div>
          </div>

          {/* Right Column: Configurator Panels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Selections container */}
            <div className="bg-white p-6 rounded-3xl border border-color-accent/30 shadow-sm space-y-6 text-left flex-grow">
              
              {/* Protein Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-color-text-primary block">1. Zülal (Protein) Mənbəyi</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROTEINS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setProtein(opt)}
                      className={`px-3 py-2.5 rounded-xl text-[11px] font-semibold border text-left transition-all ${
                        protein.id === opt.id
                          ? "bg-color-accent/40 border-color-primary text-color-primary"
                          : "bg-color-surface-secondary/20 border-color-accent/30 text-color-text-secondary hover:bg-color-surface-secondary/40"
                      }`}
                    >
                      <div>{opt.nameAz}</div>
                      <div className="text-[9px] text-color-text-secondary mt-0.5">+{opt.price} AZN | {opt.calories} Kcal</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Carb Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-color-text-primary block">2. Karbohidrat Mənbəyi</label>
                <div className="grid grid-cols-3 gap-2">
                  {CARBS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCarb(opt)}
                      className={`px-2 py-2.5 rounded-xl text-[10px] font-semibold border text-center transition-all ${
                        carb.id === opt.id
                          ? "bg-color-accent/40 border-color-primary text-color-primary"
                          : "bg-color-surface-secondary/20 border-color-accent/30 text-color-text-secondary hover:bg-color-surface-secondary/40"
                      }`}
                    >
                      <div className="truncate">{opt.nameAz}</div>
                      <div className="text-[8px] text-color-text-secondary mt-0.5">+{opt.price} AZN</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vegetable Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-color-text-primary block">3. Tərəvəz və Göyərti</label>
                <div className="grid grid-cols-3 gap-2">
                  {VEGETABLES.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setVegetable(opt)}
                      className={`px-2 py-2.5 rounded-xl text-[10px] font-semibold border text-center transition-all ${
                        vegetable.id === opt.id
                          ? "bg-color-accent/40 border-color-primary text-color-primary"
                          : "bg-color-surface-secondary/20 border-color-accent/30 text-color-text-secondary hover:bg-color-surface-secondary/40"
                      }`}
                    >
                      <div className="truncate">{opt.nameAz}</div>
                      <div className="text-[8px] text-color-text-secondary mt-0.5">+{opt.price} AZN</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Drink Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-color-text-primary block">4. Sağlam İçki</label>
                <div className="grid grid-cols-3 gap-2">
                  {DRINKS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDrink(opt)}
                      className={`px-2 py-2.5 rounded-xl text-[10px] font-semibold border text-center transition-all ${
                        drink.id === opt.id
                          ? "bg-color-accent/40 border-color-primary text-color-primary"
                          : "bg-color-surface-secondary/20 border-color-accent/30 text-color-text-secondary hover:bg-color-surface-secondary/40"
                      }`}
                    >
                      <div className="truncate">{opt.nameAz}</div>
                      <div className="text-[8px] text-color-text-secondary mt-0.5">+{opt.price} AZN</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar CTA Summary */}
            <div className="bg-white p-6 rounded-3xl border border-color-accent/30 shadow-sm text-left space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-color-text-secondary">Boşqab Qiyməti:</span>
                <span className="font-display font-extrabold text-3xl text-color-text-primary">
                  {totals.price.toFixed(2)} <span className="text-sm font-semibold">AZN</span>
                </span>
              </div>

              <div className="text-[10px] text-color-text-secondary flex items-start space-x-1.5 p-3 bg-color-surface-secondary rounded-xl">
                <Info size={12} className="text-color-primary mt-0.5 shrink-0" />
                <span>Bu qiymət yalnız bir boşqab üçün hesablanmışdır. WhatsApp-da çatdırılma gün sayını (həftəlik/aylıq) təyin edə bilərsiniz.</span>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn w-full bg-whatsapp hover:bg-whatsapp/90 text-white font-sans text-xs font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-transform transform hover:-translate-y-0.5"
              >
                <MessageSquare size={16} />
                <span>Bu menyunu diyetoloqa göndər</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
