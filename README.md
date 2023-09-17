# askbcs

A CLI to help automate some common setup tasks with modules in the BCS curriculum.

## Usage

```bash
askbcs [options] [command]

Options:
  -h, --help                 display help for command
  -V, --version              output the version number

Commands:
  help [command]             display help for command
  env [options] [keyval...]  Generate a .env file in the current directory
```

## Commands

### `env`

Generates a `.env` file in the current directory. This file is most useful in module 13-ORM (where the concept of environmental variables is introduced in Activity 02-Stu_Sequelize-Setup) and module 14-MVC.

By default the app will perform a recursive search on the current directory for `schema.sql` and attempt to find the database name from a `CREATE DATABASE` statement.

Invoking the command with no options or arguments generates a `.env` file with the default configuration.

```bash
askbcs env [options] [keyval...]

Arguments:
  [keyval]                   # optional list of env vars with syntax KEY=VALUE (default: [])

Options:
  -u, --user <user>          # specify mysql username
  -p, --password [password]  # specify mysql password
  -m, --module <module>      # specify module env setup (choices: "12", "13", "14")
  -h, --help                 # display help for command
```

#### Arguments

#### `keyval`

Custom variables can be added by passing key/value pairs as arguments. Variables should follow the syntax `KEY=VALUE`. Passing a keyname that exists in the [default configuraton](#default_config) will overwrite that key.

`Note:` Passing in DB_NAME as an argument key will use the given value and skip the search for the database name from a `schema.sql`.

```bash
npx askbcs env HELLO=world

# HELLO=world appended to the generated .env
HELLO=world
```

Passing one of the user or password key names will also update the fallbacks:

```bash
npx askbcs env DB_USER=bob DB_PW=secretpassword

DB_USER="bob"
DB_USERNAME="bob"
DB_UN="bob"
DB_PASSWORD="secretpassword"
DB_PASS="secretpassword"
DB_PW="secretpassword"
```

#### Options

#### `-u, --user <user>`

#### `-p, --password [password]`

#### `-m, --module <module>`

#### default_config:

```bash
DB_NAME= # database name from schema.sql, else empty
DB_USER="root"
DB_PASS="password"

# fallback var names
DB_USERNAME="root"
DB_PASSWORD="password"
DB_UN="root"
DB_PW="password"
```
