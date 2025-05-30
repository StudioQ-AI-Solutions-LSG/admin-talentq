import { useQuery } from "@tanstack/react-query";
import { useRequisitionsStore } from "@/store/requisition.store";
import requisitionService from "../services/requisitions-service";

export const useRequisitionsCounters = () => {
    const {
        selected_division,
        selected_customer,
    } = useRequisitionsStore();

    const queryParams = {
        selected_division,
        selected_customer
    };

    const {
        data: counters,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["counters", queryParams],
        queryFn: async () => {
            return requisitionService.getRequisitionsCounters(queryParams)
        },
        staleTime: 1000 * 60 * 5
    })

    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            return error.message;
        }
        return "error"
    };

    return {
        counters: counters ?? {},
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
        refetch
    }
}