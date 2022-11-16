import { DiscordInteractions } from "../deps.ts";

export interface InteractionClient extends DiscordInteractions {
  applicationId: string;
}

export function createClient(
  applicationId: string,
  authToken: string,
  publicKey: string,
): InteractionClient {
  return new DiscordInteractions({ applicationId, authToken, publicKey });
}

export async function createTestApplicationCommand(
  client: DiscordInteractions,
) {
  return await client.createApplicationCommand({
    name: "avatar",
    description: "get a users avatar",
    options: [
      {
        name: "big",
        description: "should the image be big",
        type: 5,
      },
    ],
  }, "").then(console.log).catch(console.log);
}
