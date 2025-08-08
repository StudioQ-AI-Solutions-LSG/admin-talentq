import { useQuery } from "@tanstack/react-query";
import { useDashboardStore } from "@/store/dashboard.store";
import dashboardService from "../services/dashboard-service";

export const useDashboardStats = () => {
    const {
        selected_division,
        selected_customer,
        filter
    } = useDashboardStore();

    const queryParams = {
        selected_division,
        selected_customer,
        filter
    };

    const {
        data: stats,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["stats", queryParams],
        queryFn: async () => {
            return dashboardService.getStats(queryParams)
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
        stats: stats ?? {},
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
        refetch
    }
}

