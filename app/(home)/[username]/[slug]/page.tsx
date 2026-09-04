import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentForm from "@/components/comment-form";
import CommentList from "@/components/comment-list";
import LikeButton from "@/components/like-button";
import PostBody from "@/components/post-body";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_COVER } from "@/lib/constants";
import { listCommentsForPost } from "@/lib/db/queries/comments";
import { hasLikedPost } from "@/lib/db/queries/likes";
import { getPublishedPost } from "@/lib/db/queries/posts";
import { formatPostDate, initialsFromName } from "@/lib/format";
import { getSession } from "@/lib/session";

type PostPageProps = {
  params: Promise<{ username: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { username, slug } = await params;
  const post = await getPublishedPost(username, slug);
  if (!post) return { title: "Post · Blogly" };
  return {
    title: `${post.title} · Blogly`,
    description: post.excerpt ?? `A post by ${post.authorName} on Blogly.`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { username, slug } = await params;
  const post = await getPublishedPost(username, slug);
  if (!post) notFound();

  const [comments, session] = await Promise.all([
    listCommentsForPost(post.id),
    getSession(),
  ]);
  const liked = session?.user
    ? await hasLikedPost(session.user.id, post.id)
    : false;
  const returnTo = `/${post.authorUsername}/${post.slug}`;
  const cover = post.coverImage || DEFAULT_COVER;

  return (
    <article className="mx-auto min-h-svh w-full max-w-3xl px-4 pb-16 sm:px-0 mt-5">
      <div className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-2xl bg-muted aspect-16/9">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt={post.title} className="size-full object-cover" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            {formatPostDate(post.createdAt)}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <Link
            href={`/${post.authorUsername}`}
            className="flex items-center gap-2 w-fit"
          >
            <Avatar size="sm">
              {post.authorImage ? (
                <AvatarImage src={post.authorImage} alt={post.authorName} />
              ) : null}
              <AvatarFallback>
                {initialsFromName(post.authorName)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{post.authorName}</span>
            <span className="text-muted-foreground">
              @{post.authorUsername}
            </span>
          </Link>
          {post.hashTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.hashTags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
        <PostBody content={post.content} />
        <LikeButton
          postId={post.id}
          returnTo={returnTo}
          liked={liked}
          count={post.likeCount}
          signedIn={Boolean(session?.user)}
        />
        <Separator />
        <section className="flex flex-col gap-6">
          <h2 className="font-heading text-xl font-medium tracking-tight">
            Comments
          </h2>
          <CommentForm
            postId={post.id}
            returnTo={returnTo}
            signedIn={Boolean(session?.user)}
          />
          <CommentList
            comments={comments}
            postAuthorId={post.authorId}
            currentUserId={session?.user.id}
          />
        </section>
      </div>
    </article>
  );
}
