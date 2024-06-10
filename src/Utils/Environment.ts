export default class Environment {
  static get<E, T extends keyof E>(
    env: E,
    key: T,
    defaultValue?: E[T]
  ): E[T] | undefined {
    return (env?.[key] as E[T]) || defaultValue;
  }

  static number<E, D extends number | undefined>(
    env: E,
    key: keyof typeof env,
    defaultValue?: D
  ): D extends number ? number : number | undefined {
    return (env?.[key] || defaultValue) as D extends number
      ? number
      : number | undefined;
  }

  static string<E, D extends string | undefined>(
    env: E,
    key: keyof typeof env,
    defaultValue?: D
  ): D extends string ? string : string | undefined {
    return (env?.[key] || defaultValue) as D extends string
      ? string
      : string | undefined;
  }

  static boolean<E, D extends boolean | undefined>(
    env: E,
    key: keyof typeof env,
    defaultValue?: D
  ): D extends boolean ? boolean : boolean | undefined {
    return (env?.[key] || defaultValue) as D extends boolean
      ? boolean
      : boolean | undefined;
  }
}

