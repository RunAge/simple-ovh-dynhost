import axios, { AxiosInstance } from "axios";

import { config as globalConfig, configSchema } from "../config/index.js";
import { IpDto } from "./dto/ip.dto.js";

export class IpifyClient {
  private client: AxiosInstance;

  constructor(private readonly config: configSchema = globalConfig) {
    const baseURL = this.config.sod.onlyIpV4 ? this.config.ipify.baseUrlV4 : this.config.ipify.baseUrlUni;
    this.client = axios.create({ baseURL });
  }

  async getIp() {
    const {
      data: { ip },
    } = await this.client.get<IpDto>("", {
      params: {
        format: "json",
      },
    });

    return ip;
  }
}
