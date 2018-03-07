# Pit Display

FRC Team Information Pit Display

Basically, this is just a simple webpage which pulls match data from TBA and displays it.

## Setup

Requires a [read key for The Blue Alliance API](https://www.thebluealliance.com/apidocs) inside a file named `tba.token` in the root of the project directory.

Then use `npm` to install the necessary dependencies (handlebars) on your server:

```
$ npm install
```

## Usage

To launch the server:

```
$ node app.js
```

Then navigate to [localhost:8080](http://localhost:8080).
