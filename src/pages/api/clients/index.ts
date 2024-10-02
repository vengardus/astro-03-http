import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { APIRoute } from "astro";
import { clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const resp = initResponseAction();

  try {
    const aClients = await db.select().from(clients);
    resp.success = true;
    resp.data = aClients;
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

export const POST: APIRoute = async ({ request }) => {
const resp = initResponseAction();

try {
    const { id, ...body } = await request.json();
    if (!body || !body.name || !body.age || !body.isActive)
      throw new Error("Error en datos");

    const respClient = await db.insert(clients).values({
      ...body,
    });
    if (!respClient.lastInsertRowid) throw new Error("Error al insertar");

    resp.success = true;
    resp.data = {
      id: +respClient.lastInsertRowid!.toString(),
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
