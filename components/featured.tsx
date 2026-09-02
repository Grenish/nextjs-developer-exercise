import { RiChat3Line, RiHeartLine, RiTimer2Line } from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const featuredImage =
  "https://n9bs18fdp4.ufs.sh/f/F6okHHeGON7K5lFH4H0mubQasWlKh7yYXFBf2MHrcnS0EdtL";
const authorImage =
  "https://99t4x7gxpe.ufs.sh/f/6Bq85vMCpj7ziptab1XNrB3I85Zbm1QCv2SOE6709YunsLzD";

const posts = [
  {
    title: "The quiet hours when a draft finally turns into a post",
    excerpt:
      "I used to wait for a perfect outline. Now I sit down with a half-formed sentence, write past the ugly middle, and only then decide if the piece is worth keeping.",
    date: "August 7",
    author: "Mira Chen",
    initials: "MC",
    image: featuredImage,
    avatar: authorImage,
    likes: 128,
    comments: 24,
  },
  {
    title: "A field notebook from last week's coast walk",
    excerpt:
      "Salt on the lens, a bent trail map, and three paragraphs I almost deleted before realizing they were the whole point.",
    date: "August 5",
    author: "Owen Hart",
    initials: "OH",
    image: featuredImage,
    avatar: authorImage,
    likes: 64,
    comments: 11,
  },
  {
    title: "Why I publish before I feel ready",
    excerpt:
      "Shipping a slightly unfinished essay taught me more than another week of polishing the same opening line.",
    date: "August 3",
    author: "Priya Nair",
    initials: "PN",
    image: featuredImage,
    avatar: authorImage,
    likes: 41,
    comments: 8,
  },
] as const;

function FeaturedCard({
  post,
  variant,
  className,
}: {
  post: (typeof posts)[number];
  variant: "main" | "side";
  className?: string;
}) {
  const isMain = variant === "main";

  return (
    <article className={cn("flex h-full min-h-0 flex-col", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl bg-muted",
          isMain
            ? "aspect-16/10 lg:aspect-auto lg:min-h-0 lg:flex-1"
            : "aspect-video",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="size-full object-cover"
        />
      </div>
      <div className={cn("shrink-0", isMain ? "pt-3" : "pt-2")}>
        <div className={cn(isMain ? "space-y-2" : "space-y-1.5")}>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <RiTimer2Line size={17} aria-hidden />
            <span className="text-xs">{post.date}</span>
          </span>
          <h2 className={cn("leading-tight", isMain ? "text-3xl" : "text-lg")}>
            {post.title}
          </h2>
          <p
            className={cn(
              "text-sm text-muted-foreground",
              isMain ? "" : "line-clamp-2",
            )}
          >
            {post.excerpt}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar size="sm">
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.initials}</AvatarFallback>
            </Avatar>
            <p className="truncate font-medium">{post.author}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <RiHeartLine size={17} aria-hidden />
              <span className="text-xs">{post.likes}</span>
              <span className="sr-only">likes</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <RiChat3Line size={17} aria-hidden />
              <span className="text-xs">{post.comments}</span>
              <span className="sr-only">comments</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Featured() {
  const [main, ...side] = posts;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
      <FeaturedCard
        post={main}
        variant="main"
        className="lg:col-span-2 lg:row-span-2"
      />
      {side.map((post) => (
        <FeaturedCard key={post.title} post={post} variant="side" />
      ))}
    </div>
  );
}
