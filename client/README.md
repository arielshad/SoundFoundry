# SoundFoundry Client

## Introduction

The SoundFoundry client contains the entire frontend webapp and all dependency/requirement information necessary to get started building and developing new builds of the app.

## Get Started

### Installation

SoundFoundry is written almost entirely in javascript and uses NPM for dependencies. To install, first download the repository then open the root project folder in your shell and run

```
npm install
```

### Building

The JS webapp uses webpack as a build and bundling tool. If you have installed the client as above, webpack should be already included in the project folder. To build the webapp, from the root
project folder run

```
node_modules/.bin/webpack
```

After the command finishes, a `main.js` file should appear in the `builds` folder. This file is the bundle that is included in `<script>` tags in the project's `index.html` file.
By default, this command will build the project in development mode and only output the finished bundle without running a development server. To build the project in production mode, run

```
NODE_ENV=PRODUCTION node_modules/.bin/webpack
```

Which will output a file in the `builds` folder that looks like `main-18aNabFaZ.js`; this is the production bundle with a hash in the filename for versioning. You must **manually include the
production bundle** in `index.html` - no command will do this for you!