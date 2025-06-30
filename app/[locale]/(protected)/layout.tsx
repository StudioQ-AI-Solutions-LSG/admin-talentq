'use client'
import LayoutProvider from "@/providers/layout.provider";
import LayoutContentProvider from "@/providers/content.provider";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { redirect } from "@/components/navigation";
import ThemeCustomize from "@/components/partials/customizer";
import DashCodeHeader from "@/components/partials/header";
import DashCodeSidebar from "@/components/partials/sidebar";
import DashCodeFooter from "@/components/partials/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect({ href: "/auth/login", locale: "en" });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutProvider>
      <ThemeCustomize />
      <DashCodeHeader />
      <DashCodeSidebar />
      <LayoutContentProvider>{children}</LayoutContentProvider>
      <DashCodeFooter />
    </LayoutProvider>
  );
};

export default Layout;