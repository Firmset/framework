import debug from "debug";
import Environment from "./Environment";

const prefix = Environment.get(process.env, "DEBUG_PREFIX", "project");

const Logger = {
  log: debug(`${prefix}:log`),
  info: debug(`${prefix}:info`),
  success: debug(`${prefix}:success`),
  cached: debug(`${prefix}:cached`),
  browser: debug(`${prefix}:browser`),
  dog: debug(`${prefix}:dog`),
  website: debug(`${prefix}:website`),
  error: debug(`${prefix}:error`),
  danger: debug(`${prefix}:danger`),
  errorMsg: (err: unknown) =>
    debug(`${prefix}:error-msg`)(
      (err as { message?: string })?.message || "Error"
    )
};

export default Logger;

