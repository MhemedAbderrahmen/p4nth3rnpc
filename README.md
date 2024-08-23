# P4nth3rNPC - Quest Companion App (WIP)

Welcome to the P4nth3rNPC Quest Companion App! This app is designed to help you track your progress, manage your quests, and maximize your rewards in the P4nth3rworld game.

## How to Play

![image](https://github.com/user-attachments/assets/b047936e-8ba9-4b57-ae26-2058e9aed490)


[Read the community wiki](https://p4nth3rworld-wiki.netlify.app/)

## About this repository

This project is the frontend companion app for p4nth3r.world, offering players an opportunity to:

- view available quests
- view (evolving) metadata about their quests progress
- and much much more to come!

Any bugs you find or features you wish to see implemented in p4nth3rworld can be submitted as
[issues in this repository](https://github.com/MhemedAbderrahmen/p4nth3rnpc/issues).

This is a community project built using T3 stack. NextJS, Tailwind, Trpc, Prisma and PostgreSQL To get involved, contribute by submitting feature requests,
bugs, or by submitting pull requests for _existing issues_.

## Project setup

Clone the repo, and install dependencies. For a seamless experience (and to avoid committing other lock files to the
repo), please use `pnpm`.

```bash
pnpm install
```

### Environment variables

The inventory view is behind authentication, which is powered by your Twitch login. You'll need three environment
variables to enable authentication when running the app locally.

```text
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=
# Direct connection to the database. Used for migrations.
DIRECT_URL=
# 
```

1. Copy the `.env.example` file provided to the root of the project, and change the name of the file to `.env`.

### Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## More about NextJS

Look at the [Next 14 documentation](https://nextjs.org) to learn more.
