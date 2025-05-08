import { useQuery } from "@tanstack/react-query";
import accountService from "../services/accountService";



export const useAccounts = (params: any) => {

    const {
        data: paginatedResponse,
        isLoading: isFetching,
        error: queryError,
    } = useQuery({
        queryKey: ["accounts", params.page],
        queryFn: async () => {
            return accountService.getAccounts(params)
        },
        staleTime: 1000 * 60 * 5
    })

    // Helper function to get error message
    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            return error.message;
        }
        return "error"
    };

    return {
        accounts: paginatedResponse?.items ?? [],
        pagination: {
            currentPage: paginatedResponse?.curPage,
            totalPages: paginatedResponse?.pageTotal,
            totalItems: paginatedResponse?.itemsTotal,
        },
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
    }
}