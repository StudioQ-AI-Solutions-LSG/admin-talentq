import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DashboardListParams } from "@/app/[locale]/(protected)/dashboard/types/dashboard.types";


interface DashboardStore extends DashboardListParams {
  setParams: (newParams: Partial<DashboardListParams>) => void;
  resetParams: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      selected_division: "4f02cd07-316a-42c7-a3f8-38223d32dcba",
      selected_customer: "",
      filter: {
        date: []
      },

      setParams: (newParams) =>
        set((state) => ({
          ...state,
          ...newParams,
        })),

      resetParams: () =>
        set({
          selected_division: "",
          selected_customer: "",
          filter: {
            date: []
        },
        }),
    }),
    {
      name: "dashboard-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selected_customer: state.selected_customer // only persist this field
      }),
    }
  )
);
