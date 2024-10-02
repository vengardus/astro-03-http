import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {   
    const resp = initResponseAction();

    try {
        resp.success = true;
        resp.data = {
            method: "GET",
        }
    } catch (error) {
        resp.message = getActionError(error);
    }

    return new Response(JSON.stringify(resp), {
        status: resp.success ? 200 : resp.errorCode,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json();
    const resp = initResponseAction();
  
    try {
      resp.success = true;
      resp.data = {
        method: "POST",
        ...body,
      };
    } catch (error) {
      resp.message = getActionError(error);
    }
  
    return new Response(JSON.stringify(resp), {
      status: resp.success ? 200 : resp.errorCode ?? 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  