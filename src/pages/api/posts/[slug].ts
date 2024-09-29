import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const resp = initResponseAction();
  const { slug } = params;

  try {
    if (!slug) {
      resp.errorCode = 404;
      throw new Error("Parámetro no recibido");
    }

    const post = await getEntry("blog", slug);
    if (!post) {
      resp.errorCode = 404;
      throw new Error("Slug no encontrado");
    }
    resp.success = true;
    resp.data = post;
  } catch (error) {
    resp.message = getActionError(error);
  }
  return new Response(JSON.stringify(resp), {
    status: resp.success ? 200 : resp.errorCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
