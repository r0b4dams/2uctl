# askbcs

A CLI to help automate stuff.

Right now there is just one command `env` that generates an env file with optional arguments.

Run `npx askbcs env` to generate the `.env` file in the current directory.

## Usage

```
npx askbcs env [ KEY1=VAL1 KEY2=VAL2 ... ]
```

```
npx askbcs [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  help [command]  display help for command
  env             Generate a .env file
    Arguments:
      keyval      optionally set env vars (default: [])
```

Default config:

```shell
DB_NAME="ecommerce_db"
DB_USER="root"
DB_PASS="password"

# fallback var names
DB_USERNAME="root"
DB_PASSWORD="password"
```
