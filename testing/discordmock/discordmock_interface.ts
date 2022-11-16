import type {
  APIApplicationCommand,
  APIApplicationCommandOption,
  APIInteraction,
} from "../../deps.ts";

export interface DiscordMockInterface {
  // Methods to implement. See discordmock.ts for implementation.
  // https://deno.land/x/discord_slash_commands@1.0.6/src/index.ts?s=DiscordInteractions
  createApplicationCommand: (
    command: APIApplicationCommand,
    guild_id?: string | undefined,
    command_id?: string | undefined,
  ) => Promise<APIApplicationCommand>;
  getApplicationCommands: (
    guild_id?: string,
  ) => Promise<APIApplicationCommand[]>;
  editApplicationCommand: (
    command_id: string,
    command: APIApplicationCommand,
    guild_id?: string | undefined,
  ) => Promise<APIApplicationCommand>;
  deleteApplicationCommand: (
    command_id: string,
    guild_id?: string | undefined,
  ) => Promise<boolean>;

  // Custom methods for testing.
  getApplicationCommand: (
    command_id: string,
    guild_id?: string | undefined,
  ) => Promise<APIApplicationCommand>;
  invokeApplicationCommand: (
    command_id: string,
    guild_id?: string,
    options?: APIApplicationCommandOption[],
  ) => Promise<APIInteraction>;
}
