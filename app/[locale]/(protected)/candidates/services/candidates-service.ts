import { httpV2 } from "@/lib/api/axios";
import { Candidate } from "../types/candidates-types";

type CandidateListParams = {
    selected_division?: string,
    page?: string
}


export const candidateService = {
    getCandidates: async (
        params: CandidateListParams,
    ): Promise<any> => {
        try {
            const url = `/admin-portal/candidates?selected_division=${params.selected_division}`;
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