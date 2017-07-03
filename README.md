# node-url-downloader

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Download file from url by node.js.

### Install

```js
npm install --save node-url-downloader
```

If you want to use with command line, you need to install like below:

```js
npm install -g node-url-downloader
```

>Need node.js version 6.0 or later.
If you install with `-g`,you may need to have root permission(`sudo`).

### Usage

```js
const Downloader = require('node-url-downloader');
const url = 'https://nodejs.org/dist/v6.11.0/node-v6.11.0.pkg';
const download = new Downloader();
download.get(url);
download.on('done', (dst) => {
  // download is finished
});
```
on command line client:

```js
downloader [url] [outDir]

example:
downloader https://nodejs.org/dist/v6.11.0/node-v6.11.0.pkg ./downloads
```

### LICENSE
MIT

[npm-image]: https://img.shields.io/npm/v/node-url-downloader.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-url-downloader
[travis-image]: https://img.shields.io/travis/blackmatch/downloader.svg?style=flat-square
[travis-url]: https://travis-ci.org/blackmatch/downloader
[downloads-image]: http://img.shields.io/npm/dm/node-url-downloader.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/node-url-downloader
[coveralls-image]: https://img.shields.io/coveralls/blackmatch/downloader.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/blackmatch/downloader
