import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { APIRoute } from "astro";
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const resp = initResponseAction();

  try {
    // valida si vienen parametros
    const url = new URL(request.url);
    const isParams = url.searchParams.size ? true : false;
    const slug = url.searchParams.get("slug");
    if (isParams && !slug) {
      resp.errorCode = 404;
      throw new Error("Parámetro no recibido");
    }

    switch (isParams) {
      case false: // getAll
        const posts: CollectionEntry<"blog">[] = await getCollection("blog");
        const data = posts.map((post) => post.data);
        resp.success = true;
        resp.data = data;
        break;

      case true: // getBySlug
        const post = await getEntry("blog", slug!);
        if (!post) {
          resp.errorCode = 404;
          throw new Error("Slug no encontrado");
        }
        resp.success = true;
        resp.data = post;
    }
  } catch (error) {
    resp.message = getActionError(error);
  }

  return new Response(
    JSON.stringify(resp), {
      status: resp.success ? 201 : resp.errorCode,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
