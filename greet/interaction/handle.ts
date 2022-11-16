import {
  ApplicationCommandInteractionDataOption,
  ApplicationCommandOptionValue,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
  InteractionType,
} from "../../deps.ts";

import { greet } from "../greet.ts";
import { toParams } from "../../interaction/options.ts";

/**
 * handle handles the interaction of the greet command.
 * @param event of type === InteractionType.APPLICATION_COMMAND
 * @returns interaction response
 */
export function handle(event: Interaction): Promise<InteractionResponse> {
  const { name } = toParams(event.data?.options ?? []);

  return Promise.resolve({
    type: InteractionResponseType.ChannelMessageWithSource,
    content: greet(String(name)),
  });
}
