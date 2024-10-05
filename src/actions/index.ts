import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { get as getPost } from "./posts/get.action";
import { saveLikes as savePostLikes } from "./posts/save-likes.action";

export const server = {
  getPost: defineAction({
    accept: "json",
    input: z.object({
      id: z.string(),
    }),
    handler: ({id}) => getPost(id),
  }),
  
  savePostLikes: defineAction({
    accept: "json",
    input: z.object({
      postId: z.string(),
      likes: z.number(),
    }),
    handler: ({ postId, likes }) => savePostLikes(postId, likes),
  })
};

