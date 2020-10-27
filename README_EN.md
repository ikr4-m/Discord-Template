<h1 align="center">Discord-Template</h1>

<p align="center">
  <a href="#">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/skymunn/Discord-Template.svg">
  </a>
  <a href='https://circleci.com/gh/skymunn/Discord-Template/'>
    <img src='https://circleci.com/gh/skymunn/Discord-Template.svg?style=svg' alt='CircleCI Status' />
  </a>
  <a href='https://github.com/skymunn/Discord-Template/blob/master/LICENSE.md'>
    <img alt="GitHub" src="https://img.shields.io/github/license/skymunn/Discord-Template.svg">
  </a>
  <a href='https://github.com/skymunn/Discord-Template/blob/master/package.json'>
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/skymunn/Discord-Template.svg">
  </a>
</p>

<p align="center">Discord Template that written in TypeScript, but you can make a command with ES6 too.</p>

### IN PROGRESS

# How To Install
Before installing this template, you'll need:
1. NodeJS v14 or above
2. Python v3.7.x (If you want to using Database)
3. windows-build-tools in Windows or GCC in Windows (If you want to using Database)

After installing the tools, lets hop into the installation.
1. Clone this project
2. Rename `.env.example` into `.env` and change your token there.
3. If you don't want using Database, follow this step:
  1. Open `package.json` and remove `umzug`, `sequelize`, `@types/umzug`, and `sqlite3` dependency.
  2. Delete `Database` folder.
  3. Delete `src/App/Events/CheckDatabaseConnection.ts` file.
  4. Delete `src/App/Models` folder.
4. Rename `Database/database-example.db` to `database.db`.
5. Do `npm install`
6. Finally, do `npm start` and happy coding!

# Gimme some coffee lads!
This template isn't an AI handmade, but this template with love made from the human brain. The human also need food to make a bunch of codes. So, if you like this project, [you can give me a cup of coffee in my PayPal here](https://www.paypal.me/sirienz).

# License
This project using GNU Affero General Public License v3.0. If a violation is found in it, we'll crack down according to local legal regulations. This project was signed by `Ikramullah Latif <45F6D4DF8F571384>`.
