import { z, ZodRawShape } from "zod";

export const configSchema = z
  .object({
    ovh: z
      .object({
        domain: z.string().min(1),
        login: z.string().min(1),
        password: z.string().min(1),
        baseUrl: z.string().min(1).default("https://www.ovh.com/nic"),
        defaultParams: z.object<ZodRawShape>({}).passthrough().optional().default({}),
      })
      .strip(),
    timer: z
      .object({
        interval: z.number().min(1),
      })
      .strip(),
    ipify: z
      .object({
        baseUrlV4: z.string().min(1).default("https://api.ipify.org"),
        baseUrlUni: z.string().min(1).default("https://api64.ipify.org"),
      })
      .strip(),
    sod: z.object({
      onlyIpV4: z.boolean().default(true),
    }),
  })
  .strip();

export type configSchema = z.infer<typeof configSchema>;
