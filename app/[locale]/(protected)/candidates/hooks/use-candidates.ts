import { useQuery } from "@tanstack/react-query";
import candidateService from "../services/candidates-service";
import { CandidateListParams } from "../types/candidates-types";

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
        candidates: candidates?.items ?? [],
        pagination: {
            currentPage: candidates?.currentPage,
            totalPages: candidates?.totalPages,
            totalItems: candidates?.totalPages,
        },
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
        refetch
    }
}