import { getCollection } from "astro:content";
import { Clients, db, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO

  await db.insert(Clients).values([
    { name: "John Doe", age: 30, isActive: true },
    { name: "Jane Doe", age: 28, isActive: true },
    { name: "Joe Doe", age: 35, isActive: false },
    { name: "Jill Doe", age: 32, isActive: true },
    { name: "Jack Doe", age: 40, isActive: false },
  ]);

  const posts = await getCollection("blog");
  await db.insert(Posts).values(
    posts.map((post) => ({
      title: post.data.title,
      likes: Math.floor(Math.random() * 100),
    }))
  );

  console.log("seed executed");
}
