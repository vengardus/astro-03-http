import { getActionError } from "@/utils/get-action-error";
import { initResponseAction } from "@/utils/init-response";
import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const resp = initResponseAction();

  try {
    if (!id) throw new Error("Parámetro no recibido");
    const clientId = +id;
    if (isNaN(clientId)) throw new Error("Parámetro incorrecto");

    const client = (
      await db.select().from(Clients).where(eq(Clients.id, clientId))
    ).at(0);
    if (!client) throw new Error("Id no encontrado");

    resp.success = true;
    resp.data = client;
  } catch (error) {
    resp.message = getActionError(error);
    resp.errorCode = resp.errorCode ?? 404;
  }

  return new Response(JSON.stringify(resp), {
    status: resp.success ? 200 : resp.errorCode ?? 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id: _id, ...body } = await request.json();
  const { id } = params;
  const resp = initResponseAction();

  try {
    if (!id) throw new Error("Parámetro no recibido");
    const clientId = +id;
    if (isNaN(clientId)) throw new Error("Parámetro incorrecto");

    if (!body || !body.name || !body.age || body.isActive === undefined)
      throw new Error("Error en datos");

    const updatedClients  = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, clientId))
      .returning({ updatedId: Clients.id, name: Clients.name, age: Clients.age, isActive: Clients.isActive });
    if (!updatedClients) throw new Error("Error al actualizar");

    resp.success = true;
    resp.data = updatedClients[0];

  } catch (error) {
    resp.message = getActionError(error);
    resp.errorCode = resp.errorCode ?? 401;
  }

  return new Response(JSON.stringify(resp), {
    status: resp.success ? 200 : resp.errorCode ?? 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const {id:_id, ...body} = await request.json();
  const resp = initResponseAction();

  try {
    if (!id) throw new Error("Parámetro no recibido");
    const clientId = +id;
    if (isNaN(clientId)) throw new Error("Parámetro incorrecto");

    if (!body || (!body.name && !body.age && body.isActive === undefined))
      throw new Error("Error en datos");

    const updatedClients = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, clientId))
      .returning({ updatedId: Clients.id, name: Clients.name, age: Clients.age, isActive: Clients.isActive });
    if (!updatedClients) throw new Error("Error al actualizar");

    resp.success = true;
    resp.data = updatedClients[0];

  } catch (error) {
    resp.message = getActionError(error);
    resp.errorCode = resp.errorCode ?? 404;
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
    if (!id) throw new Error("Parámetro no recibido");
    const clientId = +id;
    if (isNaN(clientId)) throw new Error("Parámetro incorrecto");

    const deletedClient = await db
      .delete(Clients)
      .where(eq(Clients.id, clientId))
      .returning();
    
    if (!deletedClient.length) throw new Error("Registro no eliminado");

    resp.success = true;
    resp.data = deletedClient;
  } catch (error) {
    resp.message = getActionError(error);
    resp.errorCode = resp.errorCode ?? 401;
  }

  return new Response(JSON.stringify(resp), {
    status: resp.success ? 200 : resp.errorCode ?? 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
