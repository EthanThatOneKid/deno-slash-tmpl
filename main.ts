import {
  createClient,
  createTestApplicationCommand,
} from "./interaction/mod.ts";

await main();

async function main() {
  // TODO: Create a simple HTTP server to make hello world slash command.

  // Create Discord interaction client to help with interfacing with Discord.
  const config = getConfig();
  const client = createClient(
    config.discordAppId,
    config.discordToken,
    config.discordPublicKey,
  );

  console.log({ client });

  await createTestApplicationCommand(client);
}

interface ReminderBotConfig {
  discordAppId: string;
  discordToken: string;
  discordPublicKey: string;
}

function getConfig(): ReminderBotConfig {
  // See:
  // TODO: put where to get your $DISCORD_APP_ID
  const discordAppId = Deno.env.get("DISCORD_APP_ID");
  if (!discordAppId) {
    throw new Error("missing $DISCORD_APP_ID");
  }

  // See:
  // TODO: put where to get your $DISCORD_TOKEN
  const discordToken = Deno.env.get("DISCORD_TOKEN");
  if (!discordToken) {
    throw new Error("missing $DISCORD_TOKEN");
  }

  // See:
  // TODO: put where to get your $DISCORD_PUBLIC_KEY
  const discordPublicKey = Deno.env.get("DISCORD_PUBLIC_KEY");
  if (!discordPublicKey) {
    throw new Error("missing $DISCORD_PUBLIC_KEY");
  }

  return { discordAppId, discordPublicKey, discordToken };
}
