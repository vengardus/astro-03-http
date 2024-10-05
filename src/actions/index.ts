import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getPost, savePostLikes } from "./posts/index.action";

export const server = {
  // posts actions
  getPost,
  savePostLikes
};

