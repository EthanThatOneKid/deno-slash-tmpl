import type {
  APIApplicationCommand,
  APIApplicationCommandInteractionDataOption,
  APIBaseInteraction,
  APIChatInputApplicationCommandInteraction,
  APIChatInputApplicationCommandInteractionData,
  APIInteractionGuildMember,
  APIUser,
  LocaleString,
  Snowflake,
} from "../../deps.ts";
import { ApplicationCommandType, InteractionType } from "../../deps.ts";

import type { DiscordMockInterface } from "./discordmock_interface.ts";

// See
// https://discord.com/developers/docs/interactions/application-commands#slash-commands-example-interaction
const TEST_INTERACTION_ID: Snowflake = "786008729715212338";
const TEST_APPLICATION_ID: Snowflake = "775799577604522054";
const TEST_CHANNEL_ID = "772908445358620702";
const TEST_INTERACTION_TOKEN = "A_UNIQUE_TOKEN";
const TEST_INTERACTION_LOCALE: LocaleString = "en-US";

const TEST_CHAT_INPUT_INTERACTION_DATA:
  APIChatInputApplicationCommandInteractionData = {
    id: TEST_APPLICATION_ID,
    type: ApplicationCommandType.ChatInput,
    name: "cardsearch",
  };

const TEST_CHAT_INPUT_INTERACTION: APIChatInputApplicationCommandInteraction = {
  id: TEST_INTERACTION_ID,
  application_id: TEST_APPLICATION_ID,
  type: InteractionType.ApplicationCommand,
  token: TEST_INTERACTION_TOKEN,
  version: 1,
  locale: TEST_INTERACTION_LOCALE,
  channel_id: TEST_CHANNEL_ID,
  data: TEST_CHAT_INPUT_INTERACTION_DATA,
};

export function discordmock() {
  return new DiscordMock();
}

class DiscordMock implements DiscordMockInterface {
  constructor(
    private commands = new Map<string, APIApplicationCommand>(),
  ) {}

  public getApplicationCommand(
    command_id: string,
    guild_id?: string,
  ): Promise<APIApplicationCommand> {
    const application_id = makeApplicationId(command_id, guild_id);
    const command = this.commands.get(application_id);
    if (!command) {
      throw new Error(`command not found: ${application_id}`);
    }

    return Promise.resolve(command);
  }

  /** @returns empty array. */
  public getApplicationCommands(_?: string): Promise<APIApplicationCommand[]> {
    return Promise.resolve([]);
  }

  /** @returns ApplicationCommand of ID empty string by default. */
  public createApplicationCommand(
    command: APIApplicationCommand,
    guild_id?: string,
  ): Promise<APIApplicationCommand> {
    const application_id = makeApplicationId(command.name, guild_id);
    this.commands.set(application_id, command);

    return Promise.resolve(command);
  }

  /** @returns ApplicationCommand of ID empty string by default. */
  public editApplicationCommand(
    command_id: string,
    command: APIApplicationCommand,
    guild_id?: string,
  ): Promise<APIApplicationCommand> {
    const application_id = makeApplicationId(command_id, guild_id);
    const existing = this.commands.get(application_id);
    if (!existing || existing.type === command.type) {
      this.commands.set(application_id, command);
    }

    return Promise.resolve(command);
  }

  public deleteApplicationCommand(
    command_id: string,
    guild_id?: string,
  ): Promise<boolean> {
    const application_id = makeApplicationId(command_id, guild_id);
    const success = this.commands.delete(application_id);

    return Promise.resolve(success);
  }

  // TODO: Implement invokers for other interaction types.
  public invokeChatInputApplicationCommandInteraction(
    command_id: string,
    guild_id?: string,
    options?: APIApplicationCommandInteractionDataOption[],
  ): Promise<APIChatInputApplicationCommandInteraction> {
    const application_id = makeApplicationId(command_id, guild_id);
    const command = this.commands.get(application_id);
    if (!command) {
      throw new Error(`command not found: ${application_id}`);
    }

    const { type: command_type, name: command_name } = command;
    if (command_type !== ApplicationCommandType.ChatInput) {
      throw new Error(
        `command type is not ChatInput: ${command_type} ${command_name}`,
      );
    }

    const data: APIChatInputApplicationCommandInteractionData = {
      id: command_id,
      type: command_type,
      name: command.name,
      options,
    };

    const interaction: APIChatInputApplicationCommandInteraction = {
      ...TEST_CHAT_INPUT_INTERACTION,
      data,
    };

    return Promise.resolve(interaction);
  }
}

function makeApplicationId(command_id: string, guild_id?: string) {
  if (guild_id) {
    return `${command_id}/${guild_id}`;
  }

  return command_id;
}

export function makeBaseInteraction<
  Type extends InteractionType,
  Data,
>(
  id: string,
  application_id: string,
  type: Type,
  token: string,
  locale: LocaleString,
  guild_id?: string,
  channel_id?: string,
  data?: Data,
  member?: APIInteractionGuildMember,
  user?: APIUser,
): APIBaseInteraction<Type, Data> {
  return {
    /**
     * ID of the interaction
     */
    id,

    /**
     * ID of the application this interaction is for
     */
    application_id,

    /**
     * The type of interaction
     */
    type,

    /**
     * The command data payload
     */
    data,

    /**
     * The guild it was sent from
     */
    guild_id,

    /**
     * The channel it was sent from
     */
    channel_id,

    /**
     * Guild member data for the invoking user, including permissions
     *
     * **This is only sent when an interaction is invoked in a guild**
     */
    member,

    /**
     * User object for the invoking user, if invoked in a DM
     */
    user,

    /**
     * A continuation token for responding to the interaction
     */
    token,

    /**
     * Read-only property, always `1`
     */
    version: 1,

    /**
     * The selected language of the invoking user
     */
    locale,
  };
}
