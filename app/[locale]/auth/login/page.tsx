"use client";

import { Link } from "@/i18n/routing";
import LoginForm from "./components/login-form";
import AnimatedGradient from "@/components/ui/animated-gradient";
import Copyright from "./components/copyright";
import LogoFooter from "./components/logo-footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import TalentQlogo from "@/components/talentq-logo";

const Login = ({ params: { locale } }: { params: { locale: string } }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = "/candidates";
      router.push(`/${locale}${redirectPath}`);
    }
  }, [isAuthenticated, locale, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="flex w-full items-center overflow-hidden min-h-dvh h-dvh basis-full">
        <div className="overflow-y-auto flex flex-wrap w-full h-dvh">
          <div className="lg:flex hidden flex-1 flex-col justify-between overflow-hidden text-white relative z-1">
            <div className="max-w-[580px] pt-16 ps-16">
              <h1 className="text-[56px] leading-[64px] font-bold mt-12">
                TalentQ Admin
              </h1>
              <h2 className="text-[40px] leading-[48px] mt-4">
                Powerful control
                <br />
                for workflow
                <br />
                automation
              </h2>
              <p className="text-2xl mt-6">
                Streamline your AI processes with ease
              </p>
              <p className="text-lg mt-4 opacity-80 max-w-[480px]">
                The complete platform for managing and optimizing your
                AI-powered workflows
              </p>
            </div>
            <div className="ps-16 pb-12">
             { <LogoFooter /> } 
              <div className="text-xs font-normal text-white opacity-70 mt-4">
                {<Copyright /> }
              </div>
            </div>
            <div className="absolute left-0 top-0 h-full w-full z-[-1] overflow-hidden">
              {<AnimatedGradient /> }
            </div>
          </div>
          <div className="flex-1 relative">
            <div className=" h-full flex flex-col  dark:bg-default-100 bg-white">
              <div className="max-w-[524px] md:px-[48px] md:py-[48px] p-8 mx-auto w-full text-2xl text-default-900 h-full flex flex-col justify-center">
                <div className="flex justify-center items-center text-center mb-6 lg:hidden ">
                  <Link href="/">
                    {<TalentQlogo /> }
                  </Link>
                </div>
                <div className="text-center 2xl:mb-12 mb-6">
                  <h4 className="font-medium text-2xl">Sign in</h4>
                  <div className="text-default-500 text-base mt-2">
                    Sign in to your account to start using TalentQ Admin
                  </div>
                </div>
                {<LoginForm />}
              </div>
              <div className="lg:hidden flex flex-col items-center pb-8 mt-auto">
                {<LogoFooter /> }
                <div className="text-xs font-normal text-default-500 z-999 text-center">
                  {<Copyright /> }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
