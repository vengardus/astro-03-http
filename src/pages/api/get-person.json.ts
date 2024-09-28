import type { APIRoute } from "astro";

 export const GET:APIRoute = async () => {
  return new Response(JSON.stringify({name: 'John Doe'}), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
  })
}