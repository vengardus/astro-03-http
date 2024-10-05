import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { get as getPost } from "./posts/get.action";

export const server = {
  getPost: defineAction({
    accept: "json",
    input: z.string(),
    handler: (id) => getPost(id),
  }),
};

