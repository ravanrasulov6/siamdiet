import { create } from "zustand";

export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active";
export type Goal = "loss" | "maintain" | "gain";

export interface CalculatorResults {
  bmi: number;
  bmiCategory: string;
  maintenanceCalories: number;
  weightLossCalories: number;
  muscleGainCalories: number;
  targetCalories: number;
}

interface CalculatorState {
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  age: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  results: CalculatorResults | null;
  setGender: (gender: Gender) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setAge: (age: number) => void;
  setActivityLevel: (level: ActivityLevel) => void;
  setGoal: (goal: Goal) => void;
  calculate: () => void;
  resetCalculator: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  gender: "male",
  height: 175,
  weight: 75,
  age: 25,
  activityLevel: "moderate",
  goal: "loss",
  results: null,
  setGender: (gender) => set({ gender }),
  setHeight: (height) => set({ height }),
  setWeight: (weight) => set({ weight }),
  setAge: (age) => set({ age }),
  setActivityLevel: (activityLevel) => set({ activityLevel }),
  setGoal: (goal) => set({ goal }),
  resetCalculator: () => set({
    gender: "male",
    height: 175,
    weight: 75,
    age: 25,
    activityLevel: "moderate",
    goal: "loss",
    results: null
  }),
  calculate: () => {
    const { gender, height, weight, age, activityLevel, goal } = get();

    // Guard against division by zero or invalid negative inputs
    if (height <= 0 || weight <= 0 || age <= 0) return;

    // 1. Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let bmiCategory = "Normal";
    if (bmi < 18.5) bmiCategory = "Çəki Azlığı";
    else if (bmi >= 18.5 && bmi < 25) bmiCategory = "Normal Çəki";
    else if (bmi >= 25 && bmi < 30) bmiCategory = "Artıq Çəki";
    else bmiCategory = "Obezite";

    // 2. Calculate BMR (Mifflin-St Jeor Equation)
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 3. Activity Multiplier
    let activityMultiplier = 1.2;
    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2; // Az hərəkətli (ofis)
        break;
      case "light":
        activityMultiplier = 1.375; // Yüngül hərəkətli (1-3 gün yüngül məşq)
        break;
      case "moderate":
        activityMultiplier = 1.55; // Orta aktiv (3-5 gün orta məşq)
        break;
      case "active":
        activityMultiplier = 1.725; // Yüksək aktiv (hər gün ağır məşq)
        break;
    }

    const maintenanceCalories = Math.round(bmr * activityMultiplier);
    const weightLossCalories = Math.round(maintenanceCalories - 500);
    const muscleGainCalories = Math.round(maintenanceCalories + 300);

    let targetCalories = maintenanceCalories;
    if (goal === "loss") targetCalories = weightLossCalories;
    else if (goal === "gain") targetCalories = muscleGainCalories;

    set({
      results: {
        bmi: parseFloat(bmi.toFixed(1)),
        bmiCategory,
        maintenanceCalories,
        weightLossCalories,
        muscleGainCalories,
        targetCalories
      }
    });
  }
}));
