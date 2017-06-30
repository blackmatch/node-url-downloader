# downloader

[![Build status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

You can download file from url by node.js.

### Install

```js
npm install --save node-url-downloader
```

If you want to use with command line, you need to install like below:

```js
npm install -g node-url-downloader
```

>Need node.js version 6.0 or later.When you install with `-g`,you may need to have root permission with `sudo`.

### Usage

```js
const downloader = require('node-url-downloader');
const url = 'https://nodejs.org/dist/v6.11.0/node-v6.11.0.pkg';
downloader.get(url, () => {
    // download is finished
});
```
on command line client:

```js
downloader [url]

example:
downloader https://nodejs.org/dist/v6.11.0/node-v6.11.0.pkg
```

### Config

```js
downloader.config({
  dir: 'downloads/',
  fileName: 'node.pkg'
});
```

>You only need to setup once.

### LICENSE
MIT

[npm-image]: https://img.shields.io/npm/v/node-url-downloader.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-url-downloader
[travis-image]: https://img.shields.io/travis/blackmatch/downloader.svg?style=flat-square
[travis-url]: https://travis-ci.org/blackmatch/downloader
[downloads-image]: http://img.shields.io/npm/dm/node-url-downloader.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/node-url-downloader