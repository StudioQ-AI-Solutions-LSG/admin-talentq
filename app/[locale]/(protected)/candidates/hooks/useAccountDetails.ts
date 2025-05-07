import { useQuery } from "@tanstack/react-query";
import accountService from "../services/account-service";

export const useAccountDetails = (accountId: string) => {
  const {
    data: accountDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accountDetails", accountId],
    queryFn: async () => {
      return accountService.getAccountDetails(accountId);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Helper function to get error message
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "An error occurred while fetching account details";
  };

  return {
    accountDetails,
    isLoading,
    error: error ? getErrorMessage(error) : null,
  };
}; 