import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Settings · Blogly",
};

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { user } = session;
  const username = user.username;

  return (
    <div className="mx-auto min-h-svh w-full px-4 pb-10 sm:w-9/12 sm:px-0 mt-5">
      <div className="flex max-w-xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground">Your Blogly account.</p>
        </div>
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground">Name</dt>
            <dd>{user.name}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground">Username</dt>
            <dd>{username ? `@${username}` : "Not set"}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground">Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
