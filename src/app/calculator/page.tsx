"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, MessageSquare, Activity, CheckCircle2 } from "lucide-react";
import { useCalculatorStore, Gender, ActivityLevel, Goal } from "@/store/calculatorStore";
import { getWhatsAppLink, getCalculatorOrderMessage } from "@/lib/whatsapp";

export default function CalculatorPage() {
  const {
    gender,
    height,
    weight,
    age,
    activityLevel,
    goal,
    results,
    setGender,
    setHeight,
    setWeight,
    setAge,
    setActivityLevel,
    setGoal,
    calculate,
    resetCalculator,
  } = useCalculatorStore();

  useEffect(() => {
    // Reset calculator on mount to avoid stale results
    resetCalculator();
  }, [resetCalculator]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  const getGoalLabel = (g: Goal) => {
    if (g === "loss") return "Arıqlamaq (Çəki İtkisi)";
    if (g === "gain") return "Əzələ Qazanmaq (Çəki Artımı)";
    return "Çəkini Qorumaq (Balans)";
  };

  const getRecommendedPackage = (g: Goal) => {
    if (g === "loss") return "SlimFit (Çəki İtkisi)";
    if (g === "gain") return "PowerGain (Əzələ Yığmaq)";
    return "DailyBalance (Sağlam Balans)";
  };

  const waMessageText = results
    ? getCalculatorOrderMessage(results.targetCalories, results.bmi, results.bmiCategory)
    : "";

  const waLink = getWhatsAppLink(waMessageText);

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-color-surface-secondary/20 to-transparent">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold text-color-text-secondary hover:text-color-primary transition-colors">
          <ArrowLeft size={14} />
          <span>Ana Səhifəyə Qayıt</span>
        </Link>

        {/* Title */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-color-text-primary">
            Kalori Kalkulyatoru
          </h2>
          <p className="font-sans text-color-text-secondary text-sm">
            Məqsədinizə uyğun gündəlik kalori tələbatınızı saniyələr içində hesablayın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
          {/* Input Form */}
          <div className="md:col-span-6 bg-white p-8 rounded-3xl border border-color-accent/30 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-lg text-color-text-primary flex items-center space-x-2">
              <Calculator size={18} className="text-color-primary" />
              <span>Göstəriciləriniz</span>
            </h3>

            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Gender */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-color-text-primary">Cinsiyyət</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-3 rounded-xl text-xs font-semibold border transition-all ${
                      gender === "male"
                        ? "bg-color-accent/50 border-color-primary text-color-primary"
                        : "bg-color-surface-secondary/30 border-color-accent/40 text-color-text-secondary"
                    }`}
                  >
                    Kişi
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-3 rounded-xl text-xs font-semibold border transition-all ${
                      gender === "female"
                        ? "bg-color-accent/50 border-color-primary text-color-primary"
                        : "bg-color-surface-secondary/30 border-color-accent/40 text-color-text-secondary"
                    }`}
                  >
                    Qadın
                  </button>
                </div>
              </div>

              {/* Height, Weight, Age */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-color-text-primary">Boy (sm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min={100}
                    max={250}
                    required
                    className="w-full bg-color-surface-secondary/40 border border-color-accent/30 rounded-xl px-3 py-2.5 text-xs text-color-text-primary focus:outline-none focus:border-color-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-color-text-primary">Çəki (kq)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    min={30}
                    max={250}
                    required
                    className="w-full bg-color-surface-secondary/40 border border-color-accent/30 rounded-xl px-3 py-2.5 text-xs text-color-text-primary focus:outline-none focus:border-color-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-color-text-primary">Yaş</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    min={10}
                    max={100}
                    required
                    className="w-full bg-color-surface-secondary/40 border border-color-accent/30 rounded-xl px-3 py-2.5 text-xs text-color-text-primary focus:outline-none focus:border-color-primary"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-color-text-primary">Gündəlik Aktivlik</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full bg-color-surface-secondary/40 border border-color-accent/30 rounded-xl px-3 py-3 text-xs text-color-text-primary focus:outline-none focus:border-color-primary"
                >
                  <option value="sedentary">Az Hərəkətli (Ofis işi, idmansız)</option>
                  <option value="light">Yüngül Aktiv (Həftədə 1-3 gün yüngül idman)</option>
                  <option value="moderate">Orta Aktiv (Həftədə 3-5 gün idman)</option>
                  <option value="active">Yüksək Aktiv (Hər gün ağır idman)</option>
                </select>
              </div>

              {/* Goal */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-color-text-primary">Əsas Hədəf</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as Goal)}
                  className="w-full bg-color-surface-secondary/40 border border-color-accent/30 rounded-xl px-3 py-3 text-xs text-color-text-primary focus:outline-none focus:border-color-primary"
                >
                  <option value="loss">Arıqlamaq (Çəki İtkisi)</option>
                  <option value="maintain">Çəkini Qorumaq (Sağlam Balans)</option>
                  <option value="gain">Əzələ Qazanmaq (Kütlə Artımı)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-color-primary hover:bg-color-primary/95 text-white font-sans text-xs font-bold py-3.5 rounded-xl transition-all shadow-sm transform hover:-translate-y-0.5 mt-2"
              >
                Hesabla
              </button>
            </form>
          </div>

          {/* Results Column */}
          <div className="md:col-span-6">
            {results ? (
              <div className="bg-white p-8 rounded-3xl border border-color-accent/30 shadow-sm space-y-6 animate-fade-in text-left">
                <h3 className="font-display font-bold text-lg text-color-text-primary flex items-center space-x-2">
                  <Activity size={18} className="text-color-primary" />
                  <span>Hesabat Nəticəniz</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-color-surface-secondary/50 rounded-2xl border border-color-accent/10">
                    <p className="text-[10px] text-color-text-secondary font-semibold uppercase tracking-wider">
                      Bədən Kütlə İndeksi (BMI)
                    </p>
                    <p className="font-display font-extrabold text-2xl text-color-text-primary mt-1">
                      {results.bmi}
                    </p>
                    <span className="text-[10px] font-bold text-color-primary block mt-1">
                      {results.bmiCategory}
                    </span>
                  </div>

                  <div className="p-4 bg-color-surface-secondary/50 rounded-2xl border border-color-accent/10">
                    <p className="text-[10px] text-color-text-secondary font-semibold uppercase tracking-wider">
                      Gündəlik Kalori Hədəfi
                    </p>
                    <p className="font-display font-extrabold text-2xl text-color-text-primary mt-1">
                      {results.targetCalories} <span className="text-xs font-medium">Kcal</span>
                    </p>
                    <span className="text-[10px] font-bold text-color-primary block mt-1">
                      {getGoalLabel(goal)}
                    </span>
                  </div>
                </div>

                {/* Calorie recommendation comparison */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-color-accent/10">
                    <span className="text-color-text-secondary">Çəkini Qorumaq (Maintenance):</span>
                    <span className="font-bold text-color-text-primary">{results.maintenanceCalories} Kcal</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-color-accent/10">
                    <span className="text-color-text-secondary">Çəki İtirmək (Weight Loss):</span>
                    <span className="font-bold text-color-primary">{results.weightLossCalories} Kcal</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-color-text-secondary">Əzələ Yığmaq (Muscle Gain):</span>
                    <span className="font-bold text-color-primary">{results.muscleGainCalories} Kcal</span>
                  </div>
                </div>

                {/* Recommended package section */}
                <div className="p-5 bg-color-accent/20 rounded-2xl border border-color-primary/10 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-color-primary font-bold">
                    <CheckCircle2 size={16} />
                    <span>Tövsiyə Edilən Diet Paketiniz</span>
                  </div>
                  <p className="text-color-text-primary font-display font-bold text-sm">
                    {getRecommendedPackage(goal)}
                  </p>
                  <p className="text-color-text-secondary text-[11px] leading-relaxed">
                    Sizin kalori hədəfləriniz və BMI göstəricilərinizə əsasən, bu pəhriz planı məqsədinizə ən tez çatmağa kömək edəcək.
                  </p>
                </div>

                {/* CTA Redirect to WhatsApp */}
                <div className="pt-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn w-full bg-whatsapp hover:bg-whatsapp/90 text-white font-sans text-xs font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-transform transform hover:-translate-y-0.5"
                  >
                    <MessageSquare size={16} />
                    <span>Nəticələrə görə diyetoloqla danış</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col justify-center items-center p-8 bg-color-surface-secondary/20 border-2 border-dashed border-color-accent/50 rounded-3xl text-center text-color-text-secondary">
                <Calculator size={36} className="text-color-accent mb-3 animate-pulse" />
                <p className="text-xs font-medium">
                  Soldakı formu doldurun və "Hesabla" düyməsinə klikləyin. 
                </p>
                <p className="text-[10px] text-color-text-secondary mt-1">
                  Nəticələrə əsasən fərdi tövsiyələr əldə edəcəksiniz.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
