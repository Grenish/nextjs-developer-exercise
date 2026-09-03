import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = {
  title: "Sign up · Blogly",
  description: "Create a Blogly account and claim your username.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
