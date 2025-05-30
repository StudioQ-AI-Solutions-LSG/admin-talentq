import { useQuery } from "@tanstack/react-query";
import { useRequisitionsStore } from "@/store/requisition.store";
import requisitionService from "../services/requisitions-service";

export const useRequisitions = () => {
    const {
        selected_division,
        selected_customer,
        status,
        search_key,
        page,
        limit,
    } = useRequisitionsStore();

    const queryParams = {
        selected_division,
        selected_customer,
        status,
        search_key,
        page,
        limit,
    };

    const {
        data: requisitions,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["requisitions", queryParams],
        queryFn: async () => {
            return requisitionService.getRequisitions(queryParams)
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
        requisitions: requisitions?.items ?? [],
        pagination: {
            currentPage: requisitions?.currentPage,
            totalPages: requisitions?.totalPages,
            totalItems: requisitions?.totalPages,
        },
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
        refetch
    }
}