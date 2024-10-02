import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const resp = initResponseAction();

  try {
    resp.success = true;
    resp.data = {
      method: "GET/id",
      userId: id,
    };
  } catch (error) {
    resp.message = getActionError(error);
  }

  return new Response(JSON.stringify(resp), {
    status: resp.success ? 200 : resp.errorCode ?? 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  const resp = initResponseAction();

  try {
    resp.success = true;
    resp.data = {
      method: "PUT",
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

export const PATCH: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  const resp = initResponseAction();

  try {
    resp.success = true;
    resp.data = {
      method: "PATCH",
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

export const DELETE: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const resp = initResponseAction();

  try {
    resp.success = true;
    resp.data = {
      method: "DELETE",
      userId: id,
    };
  } catch (error) {
    resp.message = getActionError(error);
  }

  return new Response(
    JSON.stringify(resp),
    {
      status: resp.success ? 200 : resp.errorCode ?? 401,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
