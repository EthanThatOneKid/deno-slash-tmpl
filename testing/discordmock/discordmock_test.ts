import { ApplicationCommandOptionType, assertEquals } from "../../deps.ts";

import { discordmock } from "./discordmock.ts";

Deno.test("discordmock ", async () => {
  const client = discordmock();

  let command = await client.createApplicationCommand(TEST_COMMAND);
  assertEquals(command.name, TEST_COMMAND.name);
  assertEquals(command.description, TEST_COMMAND.description);
  assertEquals(command.options, TEST_COMMAND.options);

  // Mock client returns empty array to avoid ordering inconsistency.
  assertEquals(client.getApplicationCommands(), []);

  // Mock client instead returns the single command that was created.
  command = await client.getApplicationCommand(command.id);
  assertEquals(command.name, TEST_COMMAND.name);

  command = await client.editApplicationCommand(
    command.id,
    TEST_COMMAND_EDITED,
  );
  assertEquals(command.name, TEST_COMMAND_EDITED.name);
  assertEquals(command.description, TEST_COMMAND_EDITED.description);

  // Mock client deletes the command.
  const success = await client.deleteApplicationCommand(command.id);
  assertEquals(success, true);

  // Mock client returns default command if not found.
  command = await client.getApplicationCommand(command.id);
  assertEquals(command.name, {});
});

const TEST_COMMAND = {
  name: "greet",
  description: "greet someone",
  options: [
    {
      name: "name",
      description: "the name of the person to greet",
      type: ApplicationCommandOptionType.USER,
    },
  ],
};

const TEST_COMMAND_EDITED = {
  name: "say_hello",
  description: "say hello to someone",
};
