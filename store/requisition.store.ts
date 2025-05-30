import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RequisitionListParams } from "@/app/[locale]/(protected)/requisitions/types/requisitions.types";


interface RequisitionStore extends RequisitionListParams {
  setParams: (newParams: Partial<RequisitionListParams>) => void;
  resetParams: () => void;
}

export const useRequisitionsStore = create<RequisitionStore>()(
  persist(
    (set) => ({
      selected_division: "4f02cd07-316a-42c7-a3f8-38223d32dcba",
      selected_customer: "",
      status: [],
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
          status: [],
          search_key: "",
          page: 1,
          limit: 10,
        }),
    }),
    {
      name: "requisition-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selected_customer: state.selected_customer, // only persist this field
      }),
    }
  )
);
