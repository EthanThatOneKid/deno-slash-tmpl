import type { APIApplicationCommand, APIInteraction } from "../deps.ts";
import { InteractionType } from "../deps.ts";

const TEST_TOKEN = "A_UNIQUE_TOKEN";
const TEST_INTERACTION_ID = "786008729715212338";
const TEST_GUILD_ID = "290926798626357999";
const TEST_APP_PERMISSIONS = "442368";
const TEST_LOCALE = "en-US";

const TEST_APPLICAION_ID = "771825006014889984";
const TEST_APPLICATION_NAME = "cardsearch";
const TEST_APPLICATION_TYPE = 1;

const TEST_USER_ID = "53908232506183680";
const TEST_USER_USERNAME = "Mason";
const TEST_USER_AVATAR = "a_d5efa99b3eeaa7dd43acca82f5692432";
const TEST_USER_DISCRIMINATOR = "1337";
const TEST_USER_PUBLIC_FLAGS = 131141;
const TEST_MEMBER_ROLES = ["539082325061836999"];
const TEST_MEMBER_PERMISSIONS = "2147483647";
const TEST_MEMBER_JOINED_AT = "2017-03-13T19:19:14.040000+00:00";

/**
 * @see
 * https://discord.com/developers/docs/interactions/application-commands#slash-commands-example-interaction
 */
const TEST_INTERACTION: APIInteraction = {
  "type": InteractionType.ApplicationCommand,
  "token": TEST_TOKEN,
  "member": {
    "user": {
      "id": TEST_USER_ID,
      "username": TEST_USER_USERNAME,
      "avatar": TEST_USER_AVATAR,
      "discriminator": TEST_USER_DISCRIMINATOR,
      "public_flags": TEST_USER_PUBLIC_FLAGS,
    },
    "roles": TEST_MEMBER_ROLES,
    "premium_since": null,
    "permissions": TEST_MEMBER_PERMISSIONS,
    "pending": false,
    "nick": null,
    "mute": false,
    "joined_at": TEST_MEMBER_JOINED_AT,
    "deaf": false,
  },
  "id": TEST_INTERACTION_ID,
  "guild_id": TEST_GUILD_ID,
  "app_permissions": TEST_APP_PERMISSIONS,
  "guild_locale": TEST_LOCALE,
  "locale": TEST_LOCALE,
  "data": {
    "options": [{
      "type": 3,
      "name": "cardname",
      "value": "The Gitrog Monster",
    }],
    "type": 1,
    "name": "cardsearch",
    "id": "771825006014889984",
  },
  "channel_id": "645027906669510667",
};

export function makeInteraction(
  command: APIApplicationCommand,
    options?: Required<APIInteraction>["data"]["options"],
    ): APIInteraction {
    return {
        ...TEST_INTERACTION,
        data: {
        ...TEST_INTERACTION.data,
        id: command.id,
        name: command.name,
        options,
        },
    };
    }
): APIInteraction {
}
