import { config } from "./config/config.js";
import { IpifyClient } from "./ipify-client/ipify.client.js";
import { OvhClient } from "./ovh-client/ovh.client.js";

const ovhClient = new OvhClient(config);
const ipifyClient = new IpifyClient(config);
let lastIp: string;

export const exec = async () => {
  const ip = await ipifyClient.getIp();
  if (lastIp === ip) return;

  const res = await ovhClient.updateDynDomain(ip);
  if (lastIp)
    console.log(`[${new Date().toISOString()}] Ip updated from ${lastIp} to ${ip}, ovh response: ${res.data}`);
  console.log(`[${new Date().toISOString()}] Ip updated to ${ip}, ovh response: ${res.data}`);
  lastIp = ip;
};
