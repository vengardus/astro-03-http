import type { ResponseAction } from "@/interfaces/app/response.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import { defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { z } from "astro:schema";

export const server = {
  getPostLikes: defineAction({
    accept: "json",
    input: z.string(),
    handler: (id) => getPostLikes(id),
  }),
};

export const getPostLikes = async (postId: string): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    const like = await db
      .select()
      .from(Posts)
      .where(eq(Posts.id, postId))
      .limit(1);

    resp.success = true;
    resp.data = (like.length)? like[0]: 0;
  } catch (error) {
    resp.message = getActionError(error);
    resp.errorCode = resp.errorCode ?? 404;
  }

  return resp;
};
