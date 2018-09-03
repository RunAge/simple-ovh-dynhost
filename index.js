const req = require('request-promise');
require('dotenv').config({path: "_env"});

let oldIP;

const intrval = setInterval(() => {
  updateIP();
}, process.env.INTERVAL*60*1000)
updateIP();

async function getIP() {
  let newIP;
  try {
    const body = JSON.parse(await req('https://api.ipify.org/?format=json'));
    newIP = body.ip;
  }
  catch(err) {
    console.error(err);
  }
  return newIP;
}

async function updateIP() {
  const newIP = await getIP();
  const hostname = process.env.DOMAIN
  const auth = {
    user: process.env.DOMAIN_LOGIN, //I hate windows even more!
    pass: process.env.PASSWORD
  }
  if(oldIP === newIP) return 'Same IP';

  try {
    const body = await req(`https://www.ovh.com/nic/update?system=dyndns&hostname=${hostname}&myip=${newIP}`, {auth:auth})
    oldIP = newIP;
    console.log(`IP updated to ${newIP}`);
    return 'Update succeed!';
  } 
  catch (err) {
    console.error(err, 'Update failed!');
    return 'Update failed!';
  }
}