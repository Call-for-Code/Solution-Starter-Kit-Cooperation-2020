# Community collaboration in the context of COVID-19

This solution starter was created by technologists from IBM.

## Authors

- Omer Arad
- JJ Asgar
- Jody Burks
- Margriet Groenendijk
- Niklas Heidloff
- Robert Loredo
- Henry Nash
- Debbie Kestin Schildkraut
- Porter Stowell
- Bruce Weed

## Contents

1. [Overview](#overview)
2. [Video](#video)
3. [The idea](#the-idea)
4. [How it works](#how-it-works)
5. [Diagrams](#diagrams)
6. [Documents](#documents)
7. [Datasets](#datasets)
8. [Technology](#technology)
9. [Getting started](#getting-started)
9. [Resources](#resources)
10. [License](#license)

## Overview

### What's the problem?

In times of crisis, such as COVID-19, while federal and local government may be rolling out broad programs, cooperation at the local level is usually the most effective way of getting help to where it is most needed. While traditional social media is one way of communicating within a community, this is (by its very design) not locally focused, and often not sufficiently structured to enable rapid discover of help needed. In the COVID-19 crisis we have already seen problems with the local supply of food, equipment and other supplies. In addition, due to self-isolation and social distancing, the inability of people to easily get to where the best stock of supplies may be held compounds the problem. This is a growing interest in communities' cooperating among themselves to solve these problems, whether it be to advertise where stock is held, offer assistance for collections or other local services. What is needed is the something to empower communities to easily to provide this to each other.

### How can technology help?

Mobile, Web and Cloud services enable rapid deployment of applications that can empower cooperation in the community. Watson Assistant is a service on IBM Cloud that allows us to build, train, and deploy conversational interactions into any application, device, or channel. Creating a chatbot using Watson Assistant can help address the issues that our users can face while trying to gather the right information. Embedding location/routing services (like [HERE](https://developer.here.com/products/routing)) can enhance such applications, giving optimum guidance so that they are outside of their isolation location for the minimum amount of time.

## Video

[WIP - need something specific for us]

[![Call for Code Solution Starter: Water sustainability in the context of climate change ](https://img.youtube.com/vi/VnKmEgUnn34/0.jpg)](https://www.youtube.com/watch?v=VnKmEgUnn34)

## The idea

The idea is to provide a mobile application, along with server side components, that would be the basis for developers to build out a community cooperation application that could address the local needs in aspects of food, equipment and resources scarcity. It would allow both suppliers (who may be a store, or just a community member who has produce they can sell or distribute) to make people aware of what the have; and consumers to locate where these supplies are, and, if required, to be guided to where they are.

## How it works

[WIP - I'm working on this (HN)]

## Diagrams

[WIP - needs refining]

![Cooperation architecture diagram](/images/architecture-diagram.png)

This solution starter idea combines machine learning and location services with real-time information to get users the information they need.

[WIP - needs refining]

1. The user launches the mobile app and can access information across multiple services.
1. The user can ask questions to Watson Assistant and get answers on food/service availability questions.
1. The user can post availability of stock or services they can provide.
1. The user can obtain geolocation data to plot routes to collect (or drop off) supplies using HERE Location Services.


## Documents

- Trusted sources for COVID-19
- [CDC COVID-19 FAQ](https://www.cdc.gov/coronavirus/2019-ncov/faq.html)

## Datasets

- [CDC COVID-19 FAQ](https://www.cdc.gov/coronavirus/2019-ncov/faq.html)

## Technology

**IBM Cloud Services**
- [Bot Asset Exchange](https://developer.ibm.com/code/exchanges/bots/)
- [IBM Watson Assistant](https://www.ibm.com/cloud/watson-assistant/)
- [How-to guides for chatbots](https://www.ibm.com/watson/how-to-build-a-chatbot)
- [Create a machine learning powered web app to answer questions](https://developer.ibm.com/patterns/create-a-machine-learning-powered-web-app-to-answer-questions-from-a-book/)
- [Learning path: Getting started with Watson Assistant](https://developer.ibm.com/series/learning-path-watson-assistant/)
- [Train a speech-to-text model](https://developer.ibm.com/patterns/customize-and-continuously-train-your-own-watson-speech-service/)
- [Chat Bot Slack Integration](https://developer.ibm.com/technologies/artificial-intelligence/videos/integrating-watson-assistant-with-slack-using-built-in-integrations/#)
- [Chat Bot Slack Deployment](https://cloud.ibm.com/docs/assistant?topic=assistant-deploy-slack)
- [Node-RED Slack Integration](https://www.ibm.com/cloud/blog/create-a-chatbot-on-ibm-cloud-and-integrate-with-slack-part-1)
- [Enhance customer helpdesks with Smart Document Understanding using webhooks in Watson Assistant](https://developer.ibm.com/patterns/enhance-customer-help-desk-with-smart-document-understanding/)
- [Watson Voice Agent](https://cloud.ibm.com/catalog/services/voice-agent-with-watson)
- [Getting Started with Watson Voice Agent](https://cloud.ibm.com/docs/services/voice-agent?topic=voice-agent-getting-started)
- [Making Programmatic Calls from Watson Assistant](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-webhooks)
- [IBM Cloud Voice Agent with Twilio](https://developer.ibm.com/recipes/tutorials/ibms-voice-agent-with-watson-and-twilio/)

**HERE Location Services**
- [HERE Maps](https://developer.here.com/products/maps)
- [HERE Routing](https://developer.here.com/products/routing)
- [Integrate interactive maps and location features into your application](https://developer.here.com/documentation/)

## Getting started

### Prerequisite

- Register for an [IBM Cloud](cloud.ibm.com/registration/) account.
- Install and configure [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#overview).
- Register for a [HERE](https://developer.here.com/ref/IBM_starterkit_Disasters2020?create=Freemium-Basic) account.
- Install [React Native CLI dependencies](https://reactnative.dev/docs/getting-started.html) (for iOS).
    - [Node.js](https://nodejs.org/en/)
    - [Watchman](https://facebook.github.io/watchman/docs/install.html)
    - [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
    - [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
- Clone the [repository](https://github.com/Call-for-Code/Solution-Starter-Kit-Cooperaation-2020).

### Steps

1. [Set up an instance of Watson Assistant](#1-set-up-an-instance-of-watson-assistant).
1. [Generate an API Key from the HERE Developer Portal](#2-generate-an-api-key-from-the-here-developer-portal).
1. [Run the server](#3-run-the-server).
1. [Run the mobile application](#4-run-the-mobile-application).

### 1. Set up an instance of Watson Assistant

Log in to IBM Cloud and provision a Watson Assistant instance.

1. Provision an instance of **Watson Assistant** from the [IBM Cloud catalog](https://cloud.ibm.com/catalog/services/watson-assistant).
1. Launch the Watson Assistant service.
1. [Create an **Assistant**](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add).
1. [Add a dialog skill](https://cloud.ibm.com/docs/assistant?topic=assistant-skill-dialog-add) to the **Assistant** by importing the [`starter-kit-cooperation-dialog-skill.json`](./starter-kit/assistant/starter-kit-cooperation-dialog-skill.json) file.
1. Go back to All Assistants page, open **Settings** from the action menu ( **`⋮`** ) and click on **API Details**.
1. Note the **Assistant ID** and **API Key**.
1. Go to **Preview Link** to get a link to test and verify the dialog skill.

### 2. Generate an API Key from the HERE Developer Portal

The application uses HERE Location Services for maps, searching, and routing.

To access these services, an API Key is required. Follow the instructions outlined in the [HERE Developer Portal](https://developer.here.com/ref/IBM_starterkit_Disasters2020?create=Freemium-Basic) to [generate a JavaScript API Key](https://developer.here.com/documentation/authentication/dev_guide/topics/api-key-credentials.html).

### 3. Run the server

To set up and launch the server application:

1. Go to the `starter-kit/server-app` directory of the cloned repo.
1. Copy the `.env.example` file in the `starter-kit/server-app` directory, and create a new file named `.env`.
1. Edit the newly created `.env` file and update the `ASSISTANT_ID` and `ASSISTANT_IAM_APIKEY` with the values from the dialog skill's API Detail page in Watson Assistant.
1. Edit the **name** value in the `manifest.yml` file to your application name (for example, _my-app-name_).
1. From a terminal:
    1. Go to the `starter-kit/server-app` directory of the cloned repo.
    1. Install the dependencies: `npm install`.
    1. Launch the server application locally or deploy to IBM Cloud:
        - To run locally:
            1. Start the application: `npm start`.
            1. The server can be accessed at http://localhost:3000.
        - To deploy to IBM Cloud:
            1. Log in to your IBM Cloud account using the IBM Cloud CLI: `ibmcloud login`.
            1. Target a Cloud Foundry org and space: `ibmcloud target --cf`.
            1. Push the app to IBM Cloud: `ibmcloud app push`.
            1. The server can be accessed at a URL using the **name** given in the `manifest.yml` file (for example,  https://my-app-name.bluemix.net).

### 4. Run the mobile application

To run the mobile application (using the Xcode iOS Simulator):

1. Go to the `starter-kit/mobile-app` directory of the cloned repo.
1. Copy the `.env.example` file in the `starter-kit/mobile-app` directory, and create a file named `.env`.
1. Edit the newly created `.env` file.
    - Update the `STARTER_KIT_SERVER_URL` with the URL to the server app launched in the previous step.
    - Update the `HERE_APIKEY` with the API Key generated in the HERE Developer Portal.
1. From a terminal:
    1. Go to the `starter-kit/mobile-app` directory.
    1. Install the dependencies: `npm install`.
    1. Go to the `ios` directory: `cd ios`.
    1. Install pod dependencies: `pod install`.
    1. Return to the `mobile-app` directory: `cd ../`.
    1. Launch the app in the simulator: `npm run ios`.

## Resources

- [IBM Cloud](https://www.ibm.com/cloud)
- [Watson Assistant](https://cloud.ibm.com/docs/assistant?topic=assistant-getting-started)
- [HERE Location Services](https://developer.here.com/documentation)
- [React Native](https://reactnative.dev/)

## License

This solution starter is made available under the [Apache 2 License](LICENSE).
