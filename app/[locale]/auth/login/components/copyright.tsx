import { useTranslations } from "next-intl";

const Copyright = () => {
  const t = useTranslations("Common");
  const currentYear = new Date().getFullYear();
  return <>{t("copyright.text", { year: currentYear })}</>;
};

export default Copyright;
