import { getType, writeFileWithPath } from "./util";
import type { ArrayType, OptionsType, ParserType } from "./types";

function parse(env, parser: ParserType = 'auto', arrayType: ArrayType = 'array') {
  for (const key in env) {
    const value = env[key];
    if (typeof parser === "function") {
      env = parser(key, value);
    } else {
      if (arrayType === "array" && getType(value) === "array") {
        const a = Array.from(new Set(parse(value)));
        env[key] = `Array<${a.join("|")}>`;
      } else if (typeof value === "object") {
        parse(value);
      } else if (parser === "auto") {
        env[key] = getType(value);
      }
    }
  }
  return env;
}

export default (ctx, options: OptionsType) => {
  ctx.onBuildStart(() => {
    const path = options.path || "taro-env.d.ts";
    const prefix = options.prefix || 'TARO_APP_';
    const parser = options.parser || "auto";
    const arrayType = options.arrayType || "array";
    let env: Record<string, any> = {}
    Object.keys(process.env).forEach(key => {
      if (key.includes(prefix)) {
        env[key] = process.env[key]
      }
    })
    if (Object.keys(env).length === 0) return;
    env = parse(env, parser, arrayType);
    const template = JSON.stringify(env, null, 4)
      .replace(/"/g, "")
      .replace(/,/g, ";")
      .replace(/([\n\r])}$/, ";$1}")
      .replace(/}$/, "  }")
    const str = `declare namespace NodeJS {\n  interface ProcessEnv ${template} \n}`;
    try {
      writeFileWithPath(path, str, { encoding: "utf-8" });
      console.log(`File created at: ${path}`);
    } catch (error) {
      console.error('Failed to create file:', error);
    }
  })
}
