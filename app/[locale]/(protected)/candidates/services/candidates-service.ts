import { httpV2 } from "@/lib/api/axios";
import { Candidate, CandidateCountersParams, CandidateListParams } from "../types/candidates.types";


export const candidateService = {
    getCandidates: async (
        params: CandidateListParams,
    ): Promise<any> => {
        try {

            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });

            const queryString = queryParams.toString();
            const url = `/admin-portal/candidates${queryString ? `?${queryString}` : ""}`;
            return await httpV2.get<Candidate[]>(url)
        } catch (error) {
            console.error(
                "Error fetching users:",
                params.selected_division ? `for division: ${params.selected_division}` : "error",
                params,
                error
            );
            throw error;
        }
    },
    getCandidatesCounters: async (
        params: CandidateCountersParams,
    ): Promise<any> => {
        try {

            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });

            const queryString = queryParams.toString();
            const url = `/admin-portal/candidates/counters${queryString ? `?${queryString}` : ""}`;
            return await httpV2.get<Candidate[]>(url)
        } catch (error) {
            console.error(
                "Error fetching users:",
                params.selected_division ? `for division: ${params.selected_division}` : "error",
                params,
                error
            );
            throw error;
        }
    },
}

export default candidateService