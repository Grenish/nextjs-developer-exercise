"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import BlogCard from "@/components/blog-card";
import Featured from "@/components/featured";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiAddLine, RiEmotionSadLine, RiSearch2Line } from "@remixicon/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const triggerPointRef = useRef(0);

  useEffect(() => {
    const stickyTopOffset = 80;

    const calculateTriggerPoint = () => {
      if (stickyRef.current) {
        triggerPointRef.current = stickyRef.current.offsetTop - stickyTopOffset;
      }
    };

    calculateTriggerPoint();
    window.addEventListener("resize", calculateTriggerPoint);
    return () => window.removeEventListener("resize", calculateTriggerPoint);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest >= triggerPointRef.current);
  });

  return (
    <div className="mx-auto min-h-190 w-full px-4 sm:w-9/12 sm:px-0 mt-5 pb-10">
      <Featured />
      <Separator className={"my-8"} />
      <Tabs>
        <div
          ref={stickyRef}
          className={`flex items-center justify-between transition-all duration-300 ease-out sticky top-20 z-50 bg-background/70 backdrop-blur-2xl p-2 rounded-full mx-auto ${
            isScrolled ? "w-100" : "w-full"
          }`}
        >
          <TabsList>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button size={"default"} variant={"outline"}>
              <RiAddLine /> Write
            </Button>
            <Button size={"icon"} variant={"outline"}>
              <RiSearch2Line />
            </Button>
          </div>
        </div>
        <TabsContent value={"for-you"}>
          <div className="grid grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <BlogCard key={index} />
            ))}
          </div>

          <div className="mt-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
        <TabsContent value={"following"} className={"min-h-190 flex items-center justify-center"}>
          <Empty>
            <EmptyMedia variant={"icon"}>
              <RiEmotionSadLine />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle className="capitalize">Nothing to show here</EmptyTitle>
              <EmptyDescription>
                You&apos;r not following anyone. Follow few creators to curate
                your following timeline.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>

          <div className="mt-5 hidden">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
