import axios, { AxiosInstance, AxiosResponse } from "axios";

import { config as globalConfig, configSchema } from "../config/index.js";
import { UpdateDto } from "./dto/update.dto.js";

export class OvhClient {
  private client: AxiosInstance;
  constructor(private readonly config: configSchema = globalConfig) {
    this.client = axios.create({ baseURL: config.ovh.baseUrl });
    this.client.defaults.params = this.config.ovh.defaultParams;
  }

  async updateDynDomain(ip: string): Promise<AxiosResponse<UpdateDto>> {
    return this.client.get<UpdateDto>("/update", {
      params: {
        hostname: this.config.ovh.domain,
        myip: ip,
      },
      auth: {
        username: this.config.ovh.login,
        password: this.config.ovh.password,
      },
    });
  }
}
