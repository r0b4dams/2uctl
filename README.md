[![npm_badge](https://img.shields.io/badge/npm-v1.2.4-blue.svg?logo=npm)](https://www.npmjs.com/package/askbcs)

# askbcs

A command line interface to help automate some common setup tasks.

## Usage

```bash
npx askbcs [options] [command]

Options:
-h, --help display help for command
-V, --version output the version number

Commands:
help [command] display help for command
env [options] [keyval...] Generate a .env file in the current directory
```

## Commands

### `env`

Generates a `.env` file in the current directory. This file is most useful in module 13-ORM (where the concept of environmental variables is introduced in Activity 02-Stu_Sequelize-Setup) and module 14-MVC.

By default the app will perform a recursive search on the current directory for `schema.sql` and attempt to find the database name from a `CREATE DATABASE` statement.

Invoking the command with no options or arguments generates a `.env` file with the default configuration.

```bash
askbcs env [options] [keyval...]

Arguments:
[keyval] # optional list of env vars with syntax KEY=VALUE

Options:
-u, --user <user> # specify mysql username
-p, --password [password] # specify mysql password
-m, --module <module> # specify module env setup (choices: "12", "13", "14")
-h, --help # display help for command
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

If initializing with the '-m' or '-sql' flags, uses the passed value to login to the mysql shell

Sets the DB_USER var and all its fallbacks.

Note: Including this option will ignore DB_USER and its fallbacks if passed to args

#### `-p, --password [password]`

If initializing with the '-m' or '-sql' flags, uses the passed value to login to the mysql shell

Sets the DB_PASSWORD var and all its fallbacks.

Note: Including this option will ignore DB_PASSWORD and its fallbacks if passed to args

#### `-m, --module <module>`

Allowed values: 12, 13, 14

Create and seed (if applicable) a MySQL database and install dependencies for the challenge dev environment of the given module.

#### `-s, --sql`

If passed, creates a MySQL database.

By default, performs a recursive search on the current directory for a `schema.sql` file and scans it for a database name. If found, a DB_NAME key will be added to the generated .env file. If not found, prompts user for a database name to create (\*caution: will drop the database if it exists).

Passing a valid module with the `-m` flag will automatically uses `-s`

#### `-d, --debug`

Log additional output to stdout

#### default_config:

```bash
DB_USER="root"
DB_PASS="password"

# fallback var names
DB_USERNAME="root"
DB_PASSWORD="password"
DB_UN="root"
DB_PW="password"
```
