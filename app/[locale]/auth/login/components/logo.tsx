import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Logo() {
  const t = useTranslations("common");

  return (
    <div className="flex items-center">
      <Image
        src="/images/logo.svg"
        alt={t("logo.alt")}
        width={120}
        height={40}
        priority
      />
    </div>
  );
}
