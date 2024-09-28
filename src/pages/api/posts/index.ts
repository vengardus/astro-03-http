import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const prerender = false 

export const GET: APIRoute = async ({params, request}) => {  
    const posts:CollectionEntry<'blog'>[] = await getCollection('blog')
    const data = posts.map(post => post.data)

    console.log({params})
    console.log(request)


    return new Response(JSON.stringify(data), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
    })
}