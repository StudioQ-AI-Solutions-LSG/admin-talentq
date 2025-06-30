import Image from "next/image";
import { useTranslations } from "next-intl";

export default function StudioQLogo() {
  const t = useTranslations("common");

  return (
    <div className="flex items-center">
      <Image
        src="/images/studio-q-logo.svg"
        alt={t("logo.studioQAlt")}
        width={200}
        height={60}
        priority
      />
    </div>
  );
}
