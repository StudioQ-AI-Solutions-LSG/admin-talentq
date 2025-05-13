import { httpV2 } from "@/lib/api/axios";
import { Account } from "@/types/accounts.types";
import { useQuery } from "@tanstack/react-query";


type AccountListParams = {
    selected_division?: string,
    page?: string
}


export const useAccounts = (params: AccountListParams) => {

    const {
        data: accounts,
        isLoading: isFetching,
        error: queryError,
        refetch
    } = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {

            const url = `/admin-portal/customers?selected_division=${params.selected_division}`;
            return await httpV2.get<Account[]>(url)
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
        accounts: accounts ?? [],
        isLoading: isFetching,
        error: queryError ? getErrorMessage(queryError) : null,
        refetch
    }
}