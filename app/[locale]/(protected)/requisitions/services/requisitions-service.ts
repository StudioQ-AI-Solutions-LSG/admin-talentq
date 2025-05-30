import { httpV2 } from "@/lib/api/axios";
import { Requisition, RequisitionListParams } from "../types/requisitions.types";


export const requisitionService = {
    getRequisitions: async (
        params: RequisitionListParams,
    ): Promise<any> => {
        try {

            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });

            const queryString = queryParams.toString();
            const url = `/admin-portal/requisitions${queryString ? `?${queryString}` : ""}`;
            return await httpV2.get<Requisition[]>(url)
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

export default requisitionService