import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { get } from "./get.action";
import { saveLikes } from "./save-likes.action";

export const getPost = defineAction({
  accept: "json",
  input: z.object({
    id: z.string(),
  }),
  handler: ({ id }) => get(id),
});

export const savePostLikes = defineAction({
  accept: "json",
  input: z.object({
    postId: z.string(),
    likes: z.number(),
  }),
  handler: ({ postId, likes }) => saveLikes(postId, likes),
});
