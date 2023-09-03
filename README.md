# askbcs

A CLI to help automate stuff.

Right now there is just one command `env` that generates a boilerplate env file.

Run `npx askbcs env` to generate the `.env` file in the current directory.

## Usage

```
askbcs [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  env             Generate a boilerplate .env file
  help [command]  display help for command
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
