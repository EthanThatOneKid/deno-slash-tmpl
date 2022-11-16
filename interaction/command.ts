import type { PartialApplicationCommand } from "../deps.ts";

export class Command<Cfg extends PartialApplicationCommand> {
  constructor(private config: Cfg, private client: InteractionClient) {}

  public async create() {
    return await client.createApplicationCommand(this.config, "").then(
      console.log,
    ).catch(console.log);
  }
}
