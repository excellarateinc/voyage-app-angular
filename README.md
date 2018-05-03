![Voyage Logo](https://github.com/lssinc/voyage-app-angular1/blob/master/readme_docs/voyage-logo-horiz-color.png)

## Overview
A Google Angular app that implements the fundamental features found in most business applications.

__Intended Audiences:__
* Businesses that wish to get their app out to market faster by "buying off the shelf" and extending
* Businesses that want to avoid the high risk of failure when rewriting or building a new app
* Development teams that want to leap forward in their technology stacks by leveraging an existing platform they can extend
* Development teams that want to follow and adopt a standard of development and best practices
* Developers that wish to learn new technology by reading good documentation and extending code that tightly follows the reference documentation. 

__Development Core Tenants__
* Keep it simple
* Build for the "now". Don't build features for a future that is unclear
* Follow defacto standards & best practices of the tech stacks chosen
* Memorialize team decisions in Markdown (.md) files and store in the repo for future developers (ie this doc)

__App Features__
* User Login w/ Password Recovery
* User Account Management
* User Admin Console
* User Settings
* Alerts & Notifications
* Responsive UI for Desktop, Tablet, Mobile
* Integrates with the Voyage API for all data

__Technology Stack__
* Angular 5.x
* Angular Material
* Angular Flex Layout
* TypeScript
* SASS 
* Angular CLI
* TSLint enforcement of TypeScript best practices


> NOTE: If you are extending this codebase to build a new app, then replace this section with a detailed overview of the new app. Include as much or as little detail as necessary to convey to the developers what this project is about. Often times less is more. 


### Quick start

> Clone/Download the repo from git

```bash
# clone repo
$ git clone https://github.com/lssinc/precisionbi-angular-client.git

# change directory to your app
$ cd precisionbi-angular-client

# install development dependencies with npm
$ npm install

# install angular cli globally.
$ npm install -g @angular/cli

# start the server
$ ng serve
```

The app will open in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
* [Angular Best Practices](https://angular.io/guide/styleguide)

# Getting Started

## Dependencies

What you need to run this app:
* `node`, `npm` and `angular cli`
* Ensure you're running Node (`v6.11.x`+) and NPM (`3.10.x`+)

## Installing

* `clone` this repo
* `npm install` to install npm dependencies

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
ng serve
```

It will start a local server which will watch and reload for you. The port will be displayed to you as `http://localhost:3000`.

## Developing

### Build files

* single run: `ng build`
* build and serve files: `ng serve`

## Testing

#### 1. Unit Tests

* single run: `ng test`
