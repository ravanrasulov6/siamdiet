import { create } from "zustand";

export interface IngredientOption {
  id: string;
  name: string;
  nameAz: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
}

export const PROTEINS: IngredientOption[] = [
  { id: "chicken", name: "Chicken", nameAz: "Toyuq Filesi", calories: 165, protein: 30, carbs: 0, fat: 5, price: 6.0 },
  { id: "beef", name: "Beef", nameAz: "Mal Əti Filesi", calories: 220, protein: 28, carbs: 0, fat: 12, price: 8.0 },
  { id: "salmon", name: "Salmon", nameAz: "Qızılbalıq", calories: 230, protein: 25, carbs: 0, fat: 14, price: 10.0 },
  { id: "tuna", name: "Tuna", nameAz: "Tun Balığı", calories: 110, protein: 26, carbs: 0, fat: 1, price: 7.0 }
];

export const CARBS: IngredientOption[] = [
  { id: "rice", name: "Rice", nameAz: "Basmati Düyü", calories: 200, protein: 3, carbs: 45, fat: 0.5, price: 2.0 },
  { id: "sweet_potato", name: "Sweet Potato", nameAz: "Şirin Kartof", calories: 110, protein: 2, carbs: 26, fat: 0.1, price: 3.0 },
  { id: "pasta", name: "Pasta", nameAz: "Tam Taxıllı Makaron", calories: 200, protein: 5, carbs: 43, fat: 1.0, price: 2.5 }
];

export const VEGETABLES: IngredientOption[] = [
  { id: "broccoli", name: "Broccoli", nameAz: "Buxarda Brokoli", calories: 35, protein: 2, carbs: 6, fat: 0.3, price: 1.5 },
  { id: "salad", name: "Salad", nameAz: "Təzə Mövsüm Salatı", calories: 15, protein: 1, carbs: 3, fat: 0.1, price: 1.2 },
  { id: "mix_veggies", name: "Mix Veggies", nameAz: "Qarışıq Buxar Tərəvəzləri", calories: 50, protein: 2, carbs: 10, fat: 0.2, price: 2.0 }
];

export const DRINKS: IngredientOption[] = [
  { id: "water", name: "Water", nameAz: "Dağ Suyu (Sirab)", calories: 0, protein: 0, carbs: 0, fat: 0, price: 1.0 },
  { id: "juice", name: "Fresh Juice", nameAz: "Təzə Sıxılmış Portağal Şirəsi", calories: 110, protein: 1, carbs: 25, fat: 0.2, price: 4.0 },
  { id: "shake", name: "Protein Shake", nameAz: "Protein Kokteyli (Şokoladlı)", calories: 130, protein: 25, carbs: 3, fat: 2, price: 5.0 }
];

interface ConfiguratorState {
  protein: IngredientOption;
  carb: IngredientOption;
  vegetable: IngredientOption;
  drink: IngredientOption;
  setProtein: (option: IngredientOption) => void;
  setCarb: (option: IngredientOption) => void;
  setVegetable: (option: IngredientOption) => void;
  setDrink: (option: IngredientOption) => void;
  resetSelection: () => void;
  getTotals: () => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    price: number;
  };
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  protein: PROTEINS[0],
  carb: CARBS[0],
  vegetable: VEGETABLES[0],
  drink: DRINKS[0],
  setProtein: (option) => set({ protein: option }),
  setCarb: (option) => set({ carb: option }),
  setVegetable: (option) => set({ vegetable: option }),
  setDrink: (option) => set({ drink: option }),
  resetSelection: () => set({
    protein: PROTEINS[0],
    carb: CARBS[0],
    vegetable: VEGETABLES[0],
    drink: DRINKS[0]
  }),
  getTotals: () => {
    const { protein, carb, vegetable, drink } = get();
    return {
      calories: protein.calories + carb.calories + vegetable.calories + drink.calories,
      protein: protein.protein + carb.protein + vegetable.protein + drink.protein,
      carbs: protein.carbs + carb.carbs + vegetable.carbs + drink.carbs,
      fat: protein.fat + carb.fat + vegetable.fat + drink.fat,
      price: protein.price + carb.price + vegetable.price + drink.price
    };
  }
}));
