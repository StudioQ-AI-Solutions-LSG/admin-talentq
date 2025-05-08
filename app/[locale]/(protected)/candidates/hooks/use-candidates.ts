import { useQuery } from "@tanstack/react-query";
import candidateService from "../services/candidates-service";


type CandidateListParams = {
    selected_division?: string,
    page?: string
}


export const useCandidates = (params: CandidateListParams) => {

    const {
        data: candidates,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["candidates"],
        queryFn: async () => {
            return candidateService.getCandidates(params)
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
        candidates: candidates ?? [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 1,
        },
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
        refetch
    }
}