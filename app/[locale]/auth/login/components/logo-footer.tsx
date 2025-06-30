import Image from "next/image";
import { useTranslations } from "next-intl";

export default function LogoFooter() {
  const t = useTranslations("Common");

  return (
    <div className="flex items-center">
      <Image
        src="/images/logo-footer.png"
        alt={t("logo.footerAlt")}
        width={100}
        height={32}
        priority
      />
    </div>
  );
}
