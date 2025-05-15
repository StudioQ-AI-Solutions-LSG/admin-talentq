// store/useCandidateStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CandidateListParams } from "@/app/[locale]/(protected)/candidates/types/candidates.types";


interface CandidateStore extends CandidateListParams {
  setParams: (newParams: Partial<CandidateListParams>) => void;
  resetParams: () => void;
}

export const useCandidatesStore = create<CandidateStore>()(
  persist(
    (set) => ({
      selected_division: "4f02cd07-316a-42c7-a3f8-38223d32dcba",
      selected_customer: "",
      selected_customer_name: "",
      requisition_position_id: "",
      search_key: "",
      page: 1,
      limit: 10,

      setParams: (newParams) =>
        set((state) => ({
          ...state,
          ...newParams,
        })),

      resetParams: () =>
        set({
          selected_division: "",
          selected_customer: "",
          requisition_position_id: "",
          search_key: "",
          page: 1,
          limit: 10,
        }),
    }),
    {
      name: "candidate-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selected_customer: state.selected_customer, // only persist this field
        selected_customer_name: state.selected_customer_name // only persist this field
      }),
    }
  )
);
