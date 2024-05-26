import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { aiEnhanceText } from "../functions/ai-enhance-text/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Diary: a
    .model({
      content: a.string(),
      createdAt: a.string(),
      images: a.string().array(),
      mood: a.string(),
      type: a.string().default("diary"),
    })
    .authorization((allow) => [allow.owner()])
    .secondaryIndexes(index => [index("type").queryField("listDiariesByDate").sortKeys(["createdAt"])]),
  aiEnhanceText: a
    .query()
    .arguments({
      text: a.string(),
      mode: a.string(),
    })
    .returns(a.string())
    .authorization(
      (allow) => [allow.authenticated()]
    )
    .handler(
      a.handler.function(aiEnhanceText)
    ),
  highlights: a.model({
    content: a.string(),
  }).authorization((allow) => [allow.owner()]),
}


);

export type Schema = ClientSchema<typeof schema>;


export const data = defineData({
  name: "mainData",
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },

});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { type Schema } from '@/amplify/data/resource';
import { auth } from '../auth/resource';

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
