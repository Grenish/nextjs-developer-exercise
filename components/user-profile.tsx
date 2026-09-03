"use client";

import { useState } from "react";
import {
  RiCalendarLine,
  RiChat3Line,
  RiHeartLine,
  RiMapPinLine,
  RiQuillPenLine,
  RiUserFollowLine,
} from "@remixicon/react";
import BlogCard from "@/components/blog-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COVER_IMAGE =
  "https://n9bs18fdp4.ufs.sh/f/F6okHHeGON7K5lFH4H0mubQasWlKh7yYXFBf2MHrcnS0EdtL";
const AVATAR_IMAGE =
  "https://99t4x7gxpe.ufs.sh/f/6Bq85vMCpj7ziptab1XNrB3I85Zbm1QCv2SOE6709YunsLzD";

const WRITERS: Record<
  string,
  { name: string; bio: string; location: string }
> = {
  mira: {
    name: "Mira Chen",
    bio: "I write the hours when a draft stops pretending to be an outline — essays about walking, publishing too soon, and the sentences I almost deleted.",
    location: "Portland, OR",
  },
  owen: {
    name: "Owen Hart",
    bio: "Field notes from coast walks and kitchen tables. I keep the bent maps, the salt on the lens, and the paragraphs that were the whole point.",
    location: "Half Moon Bay, CA",
  },
  priya: {
    name: "Priya Nair",
    bio: "I publish before I feel ready. Shipping a slightly unfinished essay taught me more than another week of polishing the same opening line.",
    location: "Brooklyn, NY",
  },
};

const POSTS = [
  {
    title: "The quiet hours when a draft finally turns into a post",
    excerpt:
      "I used to wait for a perfect outline. Now I sit down with a half-formed sentence, write past the ugly middle, and only then decide if the piece is worth keeping.",
    date: "August 7",
    tags: ["#drafts", "#writing"],
    likes: 128,
    comments: 24,
  },
  {
    title: "A field notebook from last week's coast walk",
    excerpt:
      "Salt on the lens, a bent trail map, and three paragraphs I almost deleted before realizing they were the whole point.",
    date: "August 5",
    tags: ["#notes", "#walks"],
    likes: 64,
    comments: 11,
  },
  {
    title: "Why I publish before I feel ready",
    excerpt:
      "Shipping a slightly unfinished essay taught me more than another week of polishing the same opening line.",
    date: "August 3",
    tags: ["#essays", "#process"],
    likes: 41,
    comments: 8,
  },
  {
    title: "The ugly middle is the actual work",
    excerpt:
      "Every piece I like has a stretch where it sounds like someone else. I stay there longer now, instead of restarting the first sentence.",
    date: "July 28",
    tags: ["#craft"],
    likes: 96,
    comments: 19,
  },
  {
    title: "Keeping a notebook I never intend to publish",
    excerpt:
      "Private pages make the public ones braver. Most of what I write never leaves the notebook, and that is the point.",
    date: "July 21",
    tags: ["#notebook"],
    likes: 52,
    comments: 7,
  },
  {
    title: "On reading the same paragraph out loud twice",
    excerpt:
      "If it still sounds like an outline the second time, I cut it. If it sounds like a person, I leave it alone.",
    date: "July 14",
    tags: ["#editing"],
    likes: 73,
    comments: 15,
  },
] as const;

type ActivityKind = "published" | "liked" | "commented" | "followed";

const ACTIVITY: {
  kind: ActivityKind;
  title: string;
  detail: string;
  time: string;
}[] = [
  {
    kind: "published",
    title: "Published a new post",
    detail: "The quiet hours when a draft finally turns into a post",
    time: "2d ago",
  },
  {
    kind: "liked",
    title: "Liked a post",
    detail: "A field notebook from last week's coast walk",
    time: "4d ago",
  },
  {
    kind: "commented",
    title: "Left a comment",
    detail: "Why I publish before I feel ready",
    time: "1w ago",
  },
  {
    kind: "followed",
    title: "Followed Owen Hart",
    detail: "Now reading along with their field notes.",
    time: "2w ago",
  },
];

function titleCaseHandle(username: string) {
  const cleaned = decodeURIComponent(username)
    .replace(/^@/, "")
    .replace(/[_-]+/g, " ")
    .trim();

  if (!cleaned) return "Writer";

  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function activityIcon(kind: ActivityKind) {
  switch (kind) {
    case "published":
      return <RiQuillPenLine />;
    case "liked":
      return <RiHeartLine />;
    case "commented":
      return <RiChat3Line />;
    case "followed":
      return <RiUserFollowLine />;
  }
}

export default function UserProfile({
  username,
  isOwner = false,
}: {
  username: string;
  isOwner?: boolean;
}) {
  const [following, setFollowing] = useState(false);
  const handle = decodeURIComponent(username).replace(/^@/, "");
  const known = WRITERS[handle.toLowerCase()];
  const name = known?.name ?? titleCaseHandle(handle);
  const bio =
    known?.bio ??
    "Writing on Blogly — drafts that almost get deleted, walks that turn into essays, and the hours after midnight when a sentence finally sits still.";
  const location = known?.location ?? "On the internet";
  const initials = initialsFromName(name);
  const likes = POSTS.reduce((total, post) => total + post.likes, 0);

  return (
    <div className="mx-auto min-h-svh w-full px-4 pb-10 sm:w-9/12 sm:px-0 mt-5">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col">
          <div className="overflow-hidden rounded-2xl bg-muted h-48 sm:h-64 md:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={COVER_IMAGE}
              alt={`${name}'s header image`}
              className="size-full object-cover"
            />
          </div>

          <div className="flex items-end justify-between gap-3 px-1">
            <Avatar className="size-24 sm:size-28 -mt-12 sm:-mt-14 ring-4 ring-background">
              <AvatarImage src={AVATAR_IMAGE} alt={name} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            {isOwner ? null : (
              <div className="mb-1 flex items-center gap-2">
                <Button
                  variant={following ? "outline" : "default"}
                  onClick={() => setFollowing((current) => !current)}
                  aria-pressed={following}
                >
                  {following ? "Following" : "Follow"}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 px-1">
            <div className="flex flex-col">
              <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {name}
              </h1>
              <p className="text-muted-foreground">{`@${handle}`}</p>
            </div>
            <p className="max-w-2xl text-muted-foreground">{bio}</p>
            <p className="text-sm text-muted-foreground">
              {POSTS.length} posts · {likes} likes · Joined August 2024
            </p>
          </div>
        </header>

        <Tabs defaultValue="home" className="gap-4">
          <TabsList
            variant="line"
            className="h-10 w-full justify-start gap-4 bg-background"
          >
            <TabsTrigger value="home" className="flex-none px-3">
              Home
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex-none px-3">
              Blogs
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex-none px-3">
              Activity
            </TabsTrigger>
            <TabsTrigger value="about" className="flex-none px-3">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-lg font-medium tracking-tight">
                Latest from {name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Recent posts on this blog.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {POSTS.slice(0, 3).map((post) => (
                <BlogCard
                  key={post.title}
                  className="w-full"
                  hideAuthor
                  author={name}
                  initials={initials}
                  avatar={AVATAR_IMAGE}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  tags={[...post.tags]}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blogs" className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {POSTS.map((post) => (
                <BlogCard
                  key={post.title}
                  className="w-full"
                  hideAuthor
                  author={name}
                  initials={initials}
                  avatar={AVATAR_IMAGE}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  tags={[...post.tags]}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
            </div>
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
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>

          <TabsContent value="activity">
            {ACTIVITY.length === 0 ? (
              <Empty className="border">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <RiQuillPenLine />
                  </EmptyMedia>
                  <EmptyTitle>No activity yet</EmptyTitle>
                  <EmptyDescription>
                    When {name} publishes, likes, or comments, it will show up
                    here.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <ItemGroup>
                {ACTIVITY.map((event) => (
                  <Item key={`${event.kind}-${event.title}`} variant="muted">
                    <ItemMedia variant="icon">{activityIcon(event.kind)}</ItemMedia>
                    <ItemContent>
                      <ItemTitle>{event.title}</ItemTitle>
                      <ItemDescription>{event.detail}</ItemDescription>
                    </ItemContent>
                    <span className="text-xs text-muted-foreground">
                      {event.time}
                    </span>
                  </Item>
                ))}
              </ItemGroup>
            )}
          </TabsContent>

          <TabsContent value="about" className="flex flex-col gap-6">
            <div className="flex max-w-2xl flex-col gap-3">
              <h2 className="font-heading text-lg font-medium tracking-tight">
                About {name}
              </h2>
              <p className="text-muted-foreground">{bio}</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <RiMapPinLine size={17} aria-hidden />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <RiCalendarLine size={17} aria-hidden />
                <span>Joined August 2024</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <RiQuillPenLine size={17} aria-hidden />
                <span>{POSTS.length} posts on Blogly</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["#drafts", "#walks", "#essays", "#process"].map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
