import { config } from "./config/config.js";
import { IpifyClient } from "./ipify-client/ipify.client.js";
import { OvhClient } from "./ovh-client/ovh.client.js";

const ovhClient = new OvhClient(config);
const ipifyClient = new IpifyClient(config);

const ip = await ipifyClient.getIp();
await ovhClient.updateDomain(ip);
