# simple-ovh-dynhost
Simple DynHost updateter for OVH domains
I have in plan to rewrite with Rust and create module system

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

# How to use

1. `npx simple-ovh-dynhost` - to start and generate config.
2. Configure your config. (look above)
3. `npx simple-ovh-dynhost` - to one time update your domian.
4. `npx simple-ovh-dynhost -l` or `npx simple-ovh-dynhost --loop` - to start in loop mode and put in into screen or something
5. Profit...

# tldr
If you are afraid of ipify service you can host your own instance of it https://github.com/rdegges/ipify-api or something with similar API responses
