import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { id: likeId } = params;
  const resp = initResponseAction();

  try {
    if (!likeId) throw new Error("Parámetro no recibido");

    const like = await db
      .select()
      .from(Posts)
      .where(eq(Posts.id, likeId))
      .limit(1);
    if (!like.length) throw new Error("Post no encontrado");

    resp.success = true;
    resp.data = like[0];
  } catch (error) {
    resp.message = getActionError(error);
    resp.errorCode = resp.errorCode ?? 404;
  }

  return new Response(JSON.stringify(resp), {
    status: resp.success ? 200 : resp.errorCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id: likeId } = params;
  const resp = initResponseAction();

  try {
    if (!likeId) throw new Error("Parámetro no recibido");

    const body = await request.json();
    if (!body || !body.likes) throw new Error("Error en datos");

    const { likes } = body;
    if (typeof likes !== "number") throw new Error("Error en datos");

    const post = await db
      .select()
      .from(Posts)
      .where(eq(Posts.id, likeId))
      .limit(1);

    console.log(post, post.length);

    if (!post.length) {
      const newPost = {
        id: likeId,
        likes: 0,
        title: "Post creado por API",
      };
      await db.insert(Posts).values(newPost);
      post.push(newPost);
    }

    const updatedLike = await db
      .update(Posts)
      .set({ likes: post.at(0)!.likes + likes })
      .where(eq(Posts.id, likeId))
      .returning();
    if (!updatedLike) throw new Error("Error al actualizar");

    resp.success = true;
    resp.data = updatedLike[0];
  } catch (error) {
    resp.message = getActionError(error);
    resp.errorCode = resp.errorCode ?? 404;
  }
  return new Response(JSON.stringify(resp), {
    status: resp.success ? 200 : resp.errorCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
