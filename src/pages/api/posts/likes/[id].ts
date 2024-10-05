import { get as getPost } from "@/actions/posts/get.action";
import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { id: postId } = params;
  const resp = initResponseAction();

  try {
    if (!postId) throw new Error("Parámetro no recibido");

    const respPost = await getPost(postId);
    if (!respPost.success) throw new Error(respPost.message);

    resp.success = true;
    resp.data = respPost.data;

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
  const { id: postId } = params;
  const resp = initResponseAction();

  try {
    if (!postId) throw new Error("Parámetro no recibido");

    const body = await request.json();
    console.log(body)
    if (!body || !body.likes) throw new Error("Error en datos");

    const { likes } = body;
    if (typeof likes !== "number") throw new Error("Error en datos");

    const post = await db
      .select()
      .from(Posts)
      .where(eq(Posts.id, postId))
      .limit(1);

    console.log(post, post.length);

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
  return new Response(JSON.stringify(resp), {
    status: resp.success ? 200 : resp.errorCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
