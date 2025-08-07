import { httpV2 } from "@/lib/api/axios";
import { DashboardCandidatesPerMounth, DashboardCounters, DashboardListParams, DashboardTopCustomers } from "../types/dashboard.types";


export const dashboardService = {
    getCounters: async (
        params: DashboardListParams,
    ): Promise<any> => {
        try {

            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });

            const queryString = queryParams.toString();
            const url = `/admin-portal/dashboard/counters${queryString ? `?${queryString}` : ""}`;
            return await httpV2.get<DashboardCounters>(url)
        } catch (error) {
            console.error(
                "Error fetching counters:",
                params.selected_division ? `for division: ${params.selected_division}` : "error",
                params,
                error
            );
            throw error;
        }
    },
    getCandidatesPerMounth: async (
        params: DashboardListParams,
    ): Promise<any> => {
        try {

            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });

            const queryString = queryParams.toString();
            const url = `/admin-portal/dashboard/candidates-per-month${queryString ? `?${queryString}` : ""}`;
            return await httpV2.get<DashboardCandidatesPerMounth>(url)
        } catch (error) {
            console.error(
                "Error fetching candidates:",
                params.selected_division ? `for division: ${params.selected_division}` : "error",
                params,
                error
            );
            throw error;
        }
    },
    getTopCustomers: async (
        params: DashboardListParams,
    ): Promise<any> => {
        try {

            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });

            const queryString = queryParams.toString();
            const url = `/admin-portal/dashboard/top-customers${queryString ? `?${queryString}` : ""}`;
            return await httpV2.get<DashboardTopCustomers>(url)
        } catch (error) {
            console.error(
                "Error fetching top customers:",
                params.selected_division ? `for division: ${params.selected_division}` : "error",
                params,
                error
            );
            throw error;
        }
    },
}

export default dashboardService