# Stampix Node.js & Serverless challenge

## Setting
Cloud-based AWS Lambda functions with a Node.js 14 runtime written in TypeScript.

## Goal
This repository contains a populated SQLite database consisting of 50 users. The goal is to create 3 functions, corresponding to 4 operations on the database: creation, retrieving, listing & searching.

The following REST API is set up already for you (see Practical):

1. A list of users: `GET http://localhost:3000/users`
2. Get a specific user: `GET http://localhost:3000/user/{id}`
3. Create a user: `POST http://localhost:3000/user`

Endpoint one should both be able to:

1. List all users
2. Find all users with a specific first name

Endpoint two and three are straight-forward.

## Practical
1. Clone this repo and install the already existing development dependencies.
3. Write your functions according to AWS Lambda standards using the Node.js 14 runtime inside `/src/*.ts`
4. Start the compiler using `yarn watch`, this will pro-actively compile your changes .
5. In another terminal, run a local server using `yarn start`, this will make the local endpoints available.

## Requirements
1. The 3 functions should do what they are supposed to do according to the goals of this challenge.
2. You should add automatic testing and make sure that `yarn test` does what could be expected of it in a CI/CD context.
3. Document your code as you would in any collaborative project

## Food for thought
Think about the following questions and formulate an answer below. Think about the difficulties or edge-cases you would encounter. How would you tackle these?

The number of users suddenly increases to over 10,000. What comes to your mind with relationship to the functionality you just wrote?

Have a look at the datastructure of the database (i.e. have a look at `scripts/populate.js`). Now assume that we are not using SQLite, but MySQL 8. What would you do differently?

Suppose we want to set up a search function for the users where we can search with an arbitrary input value. How would you do this?

Overall, how much time did you spent (approximately) on this challenge?

### Your answers

1. 10000 user might be a lot to serve in one json response, pagination will  be a better option. SQLite might also be a bit limited in functionality and speed for larger/production env since the reduced speed to query data & limitations in user management, encryption methods, limited join options, limited field types ... Adding a proper id to the user table would also be nice.
2. Instead of using raw queries to create the database, a migration system should be used. This is more developer friendly if changes happen to the db. Also an ORM should be used instead of raw insert queries. This makes it a lot easier to change databases since only the driver has to be changed. This makes it also possible to use types that are not supported in databases.
3. You would create an endpoint with a queryparameter `search` and use that in a db query that looks for fields containing your search (LIKE %yoursearch%). If you want a more robust search, you could use `SOUNDS LIKE` that looks for similar sounding search results (a great solution for names, since you don't always know how to spell them).
4. about 4.5 hours from setting everything up to reading docs to developping

## Delivery
- Anything that is not enforced in the base repository (tools, dependencies, architecture, frameworks, ...) is free of choice
- Push your solution to your Git platform of choice, as long as it's public.

**Note**: There's no need to actually use the AWS Cloud.
