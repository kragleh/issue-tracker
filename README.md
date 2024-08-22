# This project is a work in progress. Everything is subject to change. Do not use this in production.

<div align="center">
  <h1>Issue Tracker</h1>
  <a href="#getting_started">Get started</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.gg/djsjvQ6VNE">Discord</a>
  <hr />
</div>

## 👋 Welcome

This project was made to create a simple issue tracker for any type of project. It aims to be user friendly and easy to use supporting more than 80 ways to log in using different providers.

## 📋 TODO

- [ ] Admin related features
- [ ] Project related features
- [ ] Home page
- [ ] Issues page
- [ ] Profile page
- [x] Theme switch
- [x] Auth


<a name="getting_started"></a>

## 🔨 Getting started

### Preparing the database

This project is based around [PostgreSQL](https://www.postgresql.org). You can setup a local database or a remote one depending on your needs. You can find the downloads for local deployment [here](https://www.postgresql.org/download/).

### Getting dependencies

Make sure you have [Node.js](https://nodejs.org/en/) installed on your machine.

### Clone the project

```bash
git clone https://github.com/kragleh/issue-tracker.git
```

### Setup environment variables

```bash
cp .env.example .env
```

Set the corresponding values in the `.env` file. If not happy with the default provider, you can [add a new sign in provider](#📋-adding-a-new-sign-in-provider).

### Install dependencies

```bash
npm install

# For production purposes
npm install -g pm2
```

### Generate dependencies

```bash
npx prisma generate
```

### Create database structure

```bash
npx prisma db push
```

### Run the project in development mode

```bash
npm run dev
```

Then head to [http://localhost:3000](http://localhost:3000) and make sure everything is working.

### Run the project in production mode

```bash
npm run build

# To run in the command line temporarily
npm run start

# To run in the background 24/7
pm2 start npm --name issue-tracker -- run start
pm2 save
pm2 startup
```

## 📋 Adding a new sign in provider

To add a new sign in provider, head [here](https://authjs.dev/getting-started/authentication/oauth) search for the provider you are looking for and follow the steps. To remove a provider, you can simply remove the provider from the `providers` array in the `auth.ts` file and the corresponding values in the `.env` file.
