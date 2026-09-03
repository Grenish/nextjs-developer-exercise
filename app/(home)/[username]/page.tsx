import type { Metadata } from "next";
import { headers } from "next/headers";
import UserProfile from "@/components/user-profile";
import { auth } from "@/lib/auth";

type UserPageProps = {
  params: Promise<{ username: string }>;
};

function profileHandle(username: string) {
  return decodeURIComponent(username).replace(/^@/, "");
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { username } = await params;
  const handle = profileHandle(username);

  return {
    title: `${handle} · Blogly`,
    description: `Read writing by ${handle} on Blogly.`,
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const handle = profileHandle(username);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const viewerUsername = session?.user.username;
  const isOwner = Boolean(
    viewerUsername &&
      viewerUsername.toLowerCase() === handle.toLowerCase(),
  );

  return <UserProfile username={username} isOwner={isOwner} />;
}
