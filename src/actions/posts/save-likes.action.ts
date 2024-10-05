import type { ResponseAction } from "@/interfaces/app/response.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import { db, eq, Posts } from "astro:db";

export const saveLikes = async (postId: string, likes: number): Promise<ResponseAction> => {
  const resp = initResponseAction();

  try {
    const post = await db
      .select()
      .from(Posts)
      .where(eq(Posts.id, postId))
      .limit(1);

    if (!post.length) {
      const newPost = {
        id: postId,
        likes: 0,
        title: "Post creado por API",
      };
      await db.insert(Posts).values(newPost);
      post.push(newPost);
    }

    const updatedLike = await db
      .update(Posts)
      .set({ likes: post.at(0)!.likes + likes })
      .where(eq(Posts.id, postId))
      .returning();
    if (!updatedLike) throw new Error("Error al actualizar");

    resp.success = true;
    resp.data = updatedLike[0];
  } catch (error) {
    resp.message = getActionError(error);
    resp.errorCode = resp.errorCode ?? 404;
  }

  return resp;
};
