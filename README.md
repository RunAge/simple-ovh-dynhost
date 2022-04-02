# simple-ovh-dynhost
Simple DynHost updateter for OVH domains
I have in plan to rewrite with Rust

# Breaking Changes
Move from `_env` file to `config.toml`

# CONFIG
Location: In project root dir `config.toml` or in `HOME_DIR/.config/simple-ovh-dynhost/config.toml`
At first run if no config found it will be created in `HOME_DIR/.config/simple-ovh-dynhost/config.toml`
```toml
[ovh]
domain = ""
login = ""
password = ""
baseUrl = "https://www.ovh.com/nic"
[ovh.defaultParams]
system = "dyndns"

[timer]
interval = 5

[ipify]
baseUrlV4 = "https://api.ipify.org"
baseUrlUni = "https://api64.ipify.org"

[sod]
onlyIpV4 = true
```

I choose toml as conifg format because its looks better and is easier to configure. Deal with it :D

# INSTALL

`npm install`
`npm run start:dev`
Profit...
