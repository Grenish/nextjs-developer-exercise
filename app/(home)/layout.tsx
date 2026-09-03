import { headers } from "next/headers";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <div className="relative z-10 bg-background">
        <Navbar user={session?.user ?? null} />
        {children}
      </div>
      <Footer />
    </>
  );
}
