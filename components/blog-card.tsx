"use client";

import {
  RiChat3Line,
  RiHeartLine,
  RiTimer2Line,
} from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Item, ItemActions, ItemContent, ItemMedia } from "./ui/item";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const defaultImage =
  "https://n9bs18fdp4.ufs.sh/f/F6okHHeGON7K5lFH4H0mubQasWlKh7yYXFBf2MHrcnS0EdtL";
const defaultAvatar =
  "https://99t4x7gxpe.ufs.sh/f/6Bq85vMCpj7ziptab1XNrB3I85Zbm1QCv2SOE6709YunsLzD";

export type BlogCardProps = {
  className?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  image?: string;
  author?: string;
  initials?: string;
  avatar?: string;
  likes?: number;
  comments?: number;
  tags?: string[];
  hideAuthor?: boolean;
};

export default function BlogCard({
  className,
  title = "The quiet hours when a draft finally turns into a post",
  excerpt = "I used to wait for a perfect outline. Now I sit down with a half-formed sentence, write past the ugly middle, and only then decide if the piece is worth keeping.",
  date = "August 2",
  image = defaultImage,
  author = "John Doe",
  initials = "JD",
  avatar = defaultAvatar,
  likes = 100,
  comments = 40,
  tags = ["#new", "#ai", "#google"],
  hideAuthor = false,
}: BlogCardProps) {
  return (
    <div
      className={cn(
        "w-lg hover:bg-muted/20 transition-colors ease-linear p-2 rounded-2xl",
        className,
      )}
    >
      <div className="rounded-2xl overflow-hidden w-full h-75">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="mt-2">
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <RiTimer2Line size={17} aria-hidden />
          <span className="text-xs">{date}</span>
        </span>
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-muted-foreground">{excerpt}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant={"outline"}>
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <RiHeartLine size={18} /> {likes}
            </div>
            <div className="flex items-center gap-1">
              <RiChat3Line size={18} /> {comments}
            </div>
          </div>
        </div>
        {hideAuthor ? null : (
          <div className="mt-3">
            <Item className="p-0">
              <ItemMedia variant={"icon"}>
                <Avatar size="sm">
                  <AvatarImage src={avatar} alt={author} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <div className="flex items-center gap-2">
                  <h2>{author}</h2>
                </div>
              </ItemContent>
              <ItemActions>
                <Button variant={"outline"}>Follow</Button>
              </ItemActions>
            </Item>
          </div>
        )}
      </div>
    </div>
  );
}
