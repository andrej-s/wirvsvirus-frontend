![wirvsviruslogo](https://wirvsvirushackathon.org/wp-content/uploads/2020/03/12-scaled.jpg, "WirVsVirus Hackathon")

# WirVsVirus Hackathon Projekt

This repository is part of a submission to the [WirVsVirus Hackathon](https://wirvsvirushackathon.org/) and aims to classify the infection risk of people in need before it connects them to a contact center. This project uses [Twilio](https://twilio.com) for connectivity via the telephony network (phone, sms) as well as WhatsApp. Incoming requests are routed to [Dialogflow](https://dialogflow.com) for natural language processing and intent detection, a classification is performed on a custom backend (see related repositories). The request is then sent to [Twilio Flex](https://twilio.com/flex), a fully programmable contact center that was modified to serve the needs of an ad-hoc crisis response center.

# Related repositories
- [Backend (node)](https://github.com/andrej-s/wirvsvirus-backend) used for the classification of callers and as fulfillment server for dialogflow requests
- [Frontend (React)](https://github.com/andrej-s/wirvsvirus-frontend), a React Component used to modify Twilio Flex
- [Config (Twilio Studio, Dialogflow)](https://github.com/andrej-s/wirvsvirus-config), configuration files for both platforms used

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

## Config
This plugin fetches data from the backend server. Set the backend server in [constants/index.js](https://github.com/andrej-s/wirvsvirus-frontend/blob/master/src/Constants/index.js)

## Missing features
Most importantly, authentification for the backend server is currently missing. Additionally, data is fetched without caching.

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it in order to deploy it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project, in this case `plugin-corona.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.