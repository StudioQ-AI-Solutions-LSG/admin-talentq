import { useQuery } from "@tanstack/react-query";
import { useCandidatesStore } from "@/store/candidate.store";
import candidateService from "../services/candidates-service";

export const useCandidatesCounters = () => {
    const {
        selected_division,
        selected_customer,
        requisition_position_id
    } = useCandidatesStore();

    const queryParams = {
        selected_division,
        selected_customer,
        requisition_position_id
    };

    const {
        data: counters,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["counters", queryParams],
        queryFn: async () => {
            return candidateService.getCandidatesCounters(queryParams)
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