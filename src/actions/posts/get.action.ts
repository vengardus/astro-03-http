import type { ResponseAction } from "@/interfaces/app/response.interface";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import { db, eq, Posts } from "astro:db";

export const get = async (postId: string): Promise<ResponseAction> => {
    const resp = initResponseAction();
  
    try {
      const posts = await db
        .select()
        .from(Posts)
        .where(eq(Posts.id, postId))
        .limit(1);

      if (!posts.length) throw new Error("Post no encontrado");
      resp.success = true;
      resp.data = posts[0];
    } catch (error) {
      resp.message = getActionError(error);
      resp.errorCode = resp.errorCode ?? 404;
    }
  
    return resp;
  };
  