import type {
  APIApplicationCommandInteractionDataOption,
  APIApplicationCommandOptionBase,
} from "../deps.ts";

interface Params<T extends ApplicationCommandOptionType> {
  [k: string]: APIApplicationCommandOptionBase<T> | Params<T>;
}

export function toParams(
  opts: APIApplicationCommandInteractionDataOption[],
): Params {
  const map: Params = {};

  for (const opt of opts) {
    if (Object.hasOwn(opt, "value")) {
      const { value } = (opt as { value: APIApplicationCommandOptionBase });
      map[opt.name] = value;
    } else if (Object.hasOwn(opt, "options")) {
      const { options } = opt as {
        options: APIApplicationCommandInteractionDataOption[];
      };
      map[opt.name] = toParams(options);
    }
  }

  return map;
}
