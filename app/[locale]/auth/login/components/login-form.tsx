"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginSchema } from "../utils/schemas";
import { LoginFormData, LoginError } from "../types";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const t = useTranslations("Auth.login");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  console.log("LoginForm component rendered");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("onSubmit function called with data:", data);
      setError(null);

      // Convert LoginFormData to LoginCredentials
      const credentials = {
        email: data.email,
        password: data.password,
      };

      console.log("Calling login with credentials:", credentials);

      // Call the login function from useAuth
      login(credentials, {
        onSuccess: () => {
          console.log("Login successful, redirecting to dashboard");
          // The useAuth hook already handles redirection to dashboard
        },
        onError: (error: LoginError) => {
          console.error("Login error:", error);
          setError(error.message || t("errors.generic"));
        },
      });
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setError(t("errors.generic"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert color="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder={t("emailPlaceholder")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{t("errors.emailRequired")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder={t("passwordPlaceholder")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{t("errors.passwordRequired")}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        onClick={() => console.log("Submit button clicked")}
      >
        {isLoading ? t("signingIn") : t("signIn")}
      </Button>
    </form>
  );
}
