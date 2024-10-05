import { get as getPost } from "@/actions/posts/get.action";
import { saveLikes as savePostLikes } from "@/actions/posts/save-likes.action";
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

    const updatedPost = await savePostLikes(postId, likes);
    if (updatedPost.success) throw new Error("Error al actualizar");

    resp.success = true;
    resp.data = updatedPost.data;

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
