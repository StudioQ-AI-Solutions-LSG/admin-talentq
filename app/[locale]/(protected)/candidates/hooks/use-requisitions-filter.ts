import { httpV2 } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query"
import { getErrorMessage } from "@/lib/tools/errors.tools";
import { useCandidatesStore } from "@/store/candidate.store";
import { RequisitionFilter } from "../types/requisitions.types";


export const useRequisitionsFilter = () => {

    const {
        selected_division,
        selected_customer,
    } = useCandidatesStore();

    const params = {
        selected_division,
        selected_customer,
    };

    const {
        data: requisitions,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["requisitions", params],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });

            const queryString = queryParams.toString();
            const url = `/admin-portal/filters/requisitions${queryString ? `?${queryString}` : ""}`;
            return await httpV2.get<RequisitionFilter[]>(url)
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        requisitions: requisitions ?? [],
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
        refetch
    }
}