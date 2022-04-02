import { access, copyFile, mkdir as makeDir, readFile } from "node:fs/promises";
import { homedir as homeDir } from "node:os";
import { dirname as dirName, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseToml } from "toml";
import { inspect } from "util";

import { configSchema } from "./config.schema.js";
import { ConfigRecord } from "./config-record.type.js";

const getProjectConfigIfAccessible = async () => {
  try {
    const path = resolvePath(process.cwd(), "config.toml");
    await access(path);
    return path;
  } catch (_e: unknown) {
    return;
  }
};

const getHomeConfigIfAccessible = async (homeConfigPath: string) => {
  try {
    await access(homeConfigPath);
    return homeConfigPath;
  } catch (_e: unknown) {
    return;
  }
};

export const getConfigPath = async () => {
  const defaultPath = resolvePath(homeDir(), ".config", "simple-ovh-dynhost", "config.toml");
  const [projectConfigPath, homeConfigPath] = await Promise.all([
    getProjectConfigIfAccessible(),
    getHomeConfigIfAccessible(defaultPath),
  ]);

  if (projectConfigPath || homeConfigPath) {
    return (projectConfigPath || homeConfigPath) as string;
  }

  try {
    const configTemplatePath = resolvePath(dirName(fileURLToPath(import.meta.url)), "templates", "config.toml");
    await makeDir(resolvePath(defaultPath, ".."), { recursive: true });
    await copyFile(configTemplatePath, defaultPath);
  } catch (error: unknown) {
    throw `Can not create default config! | ${inspect(error, false, 2, true)}`;
  }

  return defaultPath;
};

export const getPreParsedConfig = async (): Promise<ConfigRecord> => {
  const configPath = await getConfigPath();
  const configRowData = await readFile(configPath, { encoding: "utf8" });
  return parseToml(configRowData);
};

export const getParsedConfig = async (): Promise<configSchema> => {
  const config = await getPreParsedConfig();
  return configSchema.parseAsync(config);
};

export const config = await getParsedConfig();
