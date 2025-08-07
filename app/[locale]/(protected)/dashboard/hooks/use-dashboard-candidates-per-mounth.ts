import { useQuery } from "@tanstack/react-query";
import { useDashboardStore } from "@/store/dashboard.store";
import dashboardService from "../services/dashboard-service";

export const useDashboardCandidatesPerMounth = () => {
    const {
        selected_division,
        selected_customer,
    } = useDashboardStore();

    const queryParams = {
        selected_division,
        selected_customer
    };

    const {
        data: candidates,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["candidates", queryParams],
        queryFn: async () => {
            return dashboardService.getCandidatesPerMounth(queryParams)
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
        candidates: candidates ?? {},
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
        refetch
    }
}

