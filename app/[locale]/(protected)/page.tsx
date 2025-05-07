import { redirect } from "next/navigation";
export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Redirect to the login page
  redirect(`/${locale}/candidates`);
}