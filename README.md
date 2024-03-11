# ChargeNest: Transaction Management Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

ChargeNest harnesses the power of the Nest framework, offering a robust TypeScript-based backend solution for transaction management. Designed to streamline the processing and monitoring of transactions, this starter repository equips developers with a pre-configured environment, simplifying initial setup and integration efforts.

### Key features of ChargeNest include:

<ul>
  <li><b>Pre-configured Environment:</b> No need to fiddle with .env variables; we've got you covered with an already set up project.</li>
 <li> <b>Real-time Updates:</b> Utilizes socket.io for live data transmission, ensuring that you're always in sync with the latest transaction states.</li>
  <li><b>Task Scheduling and Queuing:</b> Leverage bullMQ for efficient job scheduling and management, optimizing your backend's processing capabilities. ( to be finished )</li>
  <li><b>Email Notifications:</b> With nodemailer, sending out transaction updates or alerts via email is a breeze.</li>
</ul>

## Getting Started

### Clone the repository

To get started, clone the repository to your local machine:

```bash
$ git clone https://github.com/BertoPolo/charge-nest.git
```

### Install dependencies

Navigate into the project directory and install the necessary dependencies:

```bash
$ npm install
```

### Running the app

ChargeNest can be run in various modes depending on your development needs:

- Development Mode:
  Starts the application in development mode with hot reload enabled, allowing for real-time updates as you modify the code.

```bash
# development
$ npm run start
```

- Watch Mode:
  Runs the application in watch mode, automatically restarting the server upon file changes.

```bash
$ npm run start:dev
```

## License

Nest is [MIT licensed](LICENSE).
