import { APIInteraction, assertEquals } from "../../deps.ts";

import { handle } from "./handle.ts";

Deno.test("handle ", async () => {
  const interaction: APIInteraction = {
    type: 2,
    token: "",
    member: {
      user: {
        id: "0",
        username: "example",
        discriminator: "0000",
      },
      roles: [],
      joinedAt: new Date(0),
    },
    data: {
      id: "id",
      name: "greet",
      options: [
        {
          name: "name",
          value: "world!",
        },
      ],
    },
  };

  const response = await handle(interaction);
  assertEquals(response, {
    type: 4,
    data: {
      content: "Hello, world!",
    },
  });
});
