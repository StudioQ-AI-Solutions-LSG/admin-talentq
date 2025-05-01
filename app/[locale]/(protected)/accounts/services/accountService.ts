import { httpV2 } from "@/lib/api/axios";

type AccountListParams = {
    selected_division?: string,
    page?: string
}

export const accountService = {
    getAccounts: async (
        params: AccountListParams,
    ): Promise<any> => {
        try {
            const queryParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });

            const queryString = queryParams.toString();
            const url = `/admin-portal/customers${queryString ? `?${queryString}` : ""}`;

            const response = await httpV2.get(url)
            return response
        } catch (error) {
            console.error(
                "Error fetching users:",
                params.selected_division ? `for division: ${params.selected_division}` : "error",
                params,
                error
            );
            throw error;
        }
    }
}

export default accountService