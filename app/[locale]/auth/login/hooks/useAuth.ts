import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { authService } from "../services/auth.service";
import type { LoginCredentials, User } from "../types";
import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const { login: storeLogin, logout: storeLogout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        // First, login to get the token
        const loginResponse = await authService.login(credentials);

        if (!loginResponse || !loginResponse.authToken) {
          throw new Error("Invalid login response: missing token");
        }

        // Store the token in the zustand store (user will be initially null)
        storeLogin(loginResponse.authToken);

        // Then fetch the complete profile
        const profile = await authService.getProfile();

        // Update the user in the store with the profile
        useAuthStore.getState().setUser(profile);

        return profile;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      router.push(`/${locale}/dashboard`);
    },
  });

  const profileQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: authService.getProfile,
    enabled: useAuthStore.getState().isAuthenticated, // Only run if authenticated
    retry: 1,
  });

  const logout = () => {
    storeLogout();
    // Use dynamic locale for logout redirection
    router.push(`/${locale}/auth/login`);
  };

  // Create a wrapper function that properly passes options to mutate
  const login = (credentials: LoginCredentials, options?: any) => {
    return loginMutation.mutate(credentials, options);
  };

  return {
    login,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    profile: profileQuery.data,
    isLoadingProfile: profileQuery.isLoading,
    profileError: profileQuery.error,
  };
};
