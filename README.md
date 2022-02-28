# Express embargoed

Middleware to block all requests from Russia to any Express.js app and display a pro-Ukraine message instead 🇺🇦

## What does this middleware do?

This middleware checks the IP of visitors coming to your site for their origin. If it detects a Russian IP, instead of continuing as normal it will block the visit and display a pro-Ukrainian message.

The message looks as follows:

![Embargoed message](./docs/embargoed-message.jpeg)

## Install

Install embargoed from npm

```bash
$ npm install embargoed
```

## Usage

```js
const embargoed = require("embargoed");

app.use(embargoed);
```
