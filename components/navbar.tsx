"use client";

import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import { UserMenu, type UserMenuUser } from "./user-menu";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function Navbar({ user }: { user: UserMenuUser | null }) {
  const { scrollY } = useScroll();
  const rawFontSize = useTransform(scrollY, [0, 150], [60, 20]);
  const fontSize = useSpring(rawFontSize, { stiffness: 300, damping: 30 });

  return (
    <header className="w-full sticky top-0 pt-4 backdrop-blur-3xl bg-background/70 z-50">
      <nav className="mx-auto flex sm:w-9/12 w-full flex-col">
        <div className="flex items-center justify-between">
          <motion.h2 style={{ fontSize }} className="font-extrabold">
            Blogly.
          </motion.h2>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserMenu user={user} />
          </div>
        </div>
        <Separator className={"mt-4"} />
      </nav>
    </header>
  );
}
