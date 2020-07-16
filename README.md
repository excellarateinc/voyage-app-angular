## Overview
A business web application platform that implements a modern user experience and many common base features that are expected by business consumers. Integrates with the Voyage API to provide multi-factor authentication/authorization, user profile, basic messaging, and more. Built using Javascript and the Google Angular framework. 

Created and supported by Lighthouse Software @ https://LighthouseSoftware.com

## Topics
* [5 Minute Test](#5-minute-test)
* [Features](#features)
* [Getting Started](#getting-started)
* [Angular Style Guide](https://angular.io/guide/styleguide)
* [Voyage Best Practices](readme_docs/VOYAGE_STYLE_GUIDE.md)
* [Development](readme_docs/DEVELOPMENT.md)

## 5 Minute Test
```bash
# Clone repository.
$ git clone https://github.com/lssinc/voyage-app-angular.git

# Change directory to your app.
$ cd voyage-app-angular

# Install angular cli globally.
$ npm install -g @angular/cli

# Install development dependencies with npm.
$ npm install

# Start the server.
$ npm start
```

The app will open in your browser.

## Features
* User Login w/ Password Recovery
* User Account Management
* User Admin Console
* User Settings
* Alerts & Notifications
* Responsive UI for Desktop, Tablet, Mobile
* Lazy loaded modules and AOT support to ensure high performance.
* Integrates with the Voyage API for all data

# Getting Started

## Prerequisites

What you need to run this app:
* [Node and NPM](https://nodejs.org)
* [Angular CLI](https://cli.angular.io/) (`npm install -g @angular/cli`)

## Installing

* `clone` this repository
* `cd voyage-app-angular` to navigate to the root directory of the app.
* `npm install` to install npm dependencies.

## Running the app

After you have installed all dependencies you can now run the app with the npm start script
```bash
npm start
```
Which is just a shortcut to running the Angular CLI with the `-o` flag to automatically open a browser tab and display the app
```bash
ng serve -o
```

This will start a local server which will watch for file changes and reload for you. The port will be displayed to you as `http://localhost:3000`.

To connect the app against a local instance of the Voyage API for development and testing purposes, start the app with --env=devjava command.  
You can also replace the api url and server url values of environment.ts with those from environment.devjava.ts.

## Developing

### Build files

While you can always run Angular CLI commands directly, our package.json scripts section has common Angular CLI build commands. 

* build and serve files: `npm start`
* single run: `npm run build`
* qa build: `npm run build:qa`
* prod build: 'npm run build:prod'


## Testing

#### 1. Unit Tests

* single run: `ng test`
