# Social App

This repository is developed by using [T3 Stack](https://create.t3.gg/)

## Requirements

Run this repository on [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

## How to Run

1. Clone this repository

   ```sh
   $ git clone https://github.com/KAT-ITB-2024/social.git
   ```

   or

   ```sh
   git clone git@github.com:KAT-ITB-2024/social.git
   ```

2. Change the current directory to `social`

   ```sh
   cd social
   ```

3. Copy .env.example file and rename it to `.env`

4. Install all dependencies

   ```sh
   yarn install

   ```

5. Run the application

   ```sh
   yarn dev

   ```

## How to Seed Database

1. Customize the database URL

```sh
   DATABASE_URL="postgresql://{username}:{password}@localhost:5432/{database name}"

```

2. Create new database (use the same name as you wrote in DATABASE_URL)

```sh

   psql -U postgres

   create database <database name>

```

3. Run the migration

```sh
   yarn db:migrate
```

Once you've run the migration, you can try to check on the database.

```sh
   \c <database name>

   \dt
```

Expected output: your database must contain few tables if the mirgation is successful.

4. Run the seeding function

```sh
   yarn db:seed
```

Once you've run the seeding command, check tables inside your database to make sure that the table is not empty (specially the users table)

```sh
   select * from "users"
```

## Developer's Guide

Make sure you've read our [Developer's Guide](https://docs.google.com/document/d/1NcUUiC448Lq71QNghIzzrK--7jbi2n4CG_1_37qQfNQ/edit?usp=sharing)

**IMPORTANT NOTE**

Jangan pernah push langsung ke master / developement / staging tanpa izin kabid / wakabid / kadiv / wakadiv

**Kalo udah ke push gimana?**

Chat kabid / wakabid / kadiv / wakadiv langsung yaa
