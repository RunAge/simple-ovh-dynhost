#!/usr/bin/env node

import { args } from "@kamidere/node-args";

import { config } from "../config/config.js";
import { exec } from "../main.js";

const parameters = args(process.argv);

if (parameters.h || parameters.help) {
  console.log(
    `simple-ovh-dynhost\n
-l | --loop -> to start with loop mode. It can be configure in config.toml\n
without any parameter it will be single run so it can be used with any other scheduler
`,
  );
  process.exit(0);
}

if (parameters.l || parameters.loop) {
  console.log("Starting in loop mode");
  setInterval(async () => {
    await exec();
  }, config.timer.interval * 60 * 1000);
}

await exec();
