import _ from "lodash";

export default class Environment {
  static get<E, T extends keyof E>(
    env: E,
    key: T,
    defaultValue: E[T] | undefined = undefined
  ): E[T] | undefined {
    return (env?.[key] as E[T]) || defaultValue;
  }

  static number<E>(
    env: E,
    key: keyof typeof env,
    defaultValue: number | undefined = undefined
  ): typeof defaultValue extends number ? number : number | undefined {
    return Number(env?.[key]) || defaultValue;
  }

  static string<E>(
    env: E,
    key: keyof typeof env,
    defaultValue: string | undefined = undefined
  ): typeof defaultValue extends string ? number : string | undefined {
    return String(env?.[key]) || defaultValue;
  }

  static boolean<E>(
    env: E,
    key: keyof typeof env,
    defaultValue: boolean | undefined = undefined
  ): typeof defaultValue extends boolean ? boolean : boolean | undefined {
    return _.includes(_.keys(env), key as string)
      ? env[key] === "true"
      : defaultValue;
  }
}

