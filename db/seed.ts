import { clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	
	await db.insert(clients).values([
		{ name: 'John Doe', age: 30, isActive: true },
		{ name: 'Jane Doe', age: 28, isActive: true },
		{ name: 'Joe Doe', age: 35, isActive: false },
		{ name: 'Jill Doe', age: 32, isActive: true },
		{ name: 'Jack Doe', age: 40, isActive: false },
	])
	
	console.log('seed executed')
}
