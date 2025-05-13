import { useQuery } from "@tanstack/react-query";
import candidateService from "../services/candidates-service";
import { CandidateListParams } from "../types/candidates.types";
import { useCandidatesStore } from "@/store/candidate.store";

export const useCandidates = () => {
    const {
        selected_division,
        selected_customer,
        search_key,
        page,
        limit,
      } = useCandidatesStore();

      const queryParams = {
        selected_division,
        selected_customer,
        search_key,
        page,
        limit,
      };

    const {
        data: candidates,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["candidates", queryParams],
        queryFn: async () => {
            return candidateService.getCandidates(queryParams)
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