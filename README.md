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

## 🖊️ Adding a new sign in provider

To add a new sign in provider, head [here](https://authjs.dev/getting-started/authentication/oauth) search for the provider you are looking for and follow the steps. To remove a provider, you can simply remove the provider from the `providers` array in the `auth.ts` file and the corresponding values in the `.env` file.

## 📋 TODO

Project features
  - [x] Project page
    - [ ] Add more data
    - [ ] Cleanup code
  - [x] Project issues
  - [ ] Moderate members
  - [x] Project settings
  - [x] View project issues
  - [x] Project invites
  - [ ] ~~Project roles~~ (Future consideration)
  - [ ] Simple predefined member roles
    - [ ] Owner - Full power, can delete project
    - [ ] Admin - Full power, can edit and see everything
    - [ ] Moderator - Can manage issues and moderate messages
    - [ ] Developer - Can manage issues
    - [ ] Member - Can create issues and interact with them

Issue features
  - [x] Create issue
  - [x] View issue
  - [x] Add messages
  - [ ] Manage issue
  - [ ] Moderate issue
  - [ ] Moderate messages

Admin features
  - [ ] Dashboard page (Low Priority)
  - [x] User page
    - [x] View users
    - [x] Manage users
      - [x] Ban users
      - [x] Promote users
      - [x] Demote users
  - [ ] Projects page (Low Priority)
    - [ ] View projects
    - [ ] Manage projects
      - [ ] Edit project (Low Priority)
      - [ ] Delete project

Other
  - [x] Home page
  - [x] Issues page
  - [x] Profile page
  - [x] Theme switch
  - [x] Auth
  - [ ] API Routes Optimization (Low Priority)

## 🤝 Contributing

Feel free to contribute to this project by opening an issue or a pull request.
