# downloader

[![Build status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

You can download file from url by node.js.

### Install

```js
npm install downloader --save
```

>Need node.js version 6.0 or later.

### Usage

```js
const downloader = require('downloader');
const url = 'https://nodejs.org/dist/v6.11.0/node-v6.11.0.pkg';
downloader.get(url, () => {
    // download is finished
});
```

### Config

```js
downloader.config({
  dir: 'downloads/',
  fileName: 'node.pkg'
});
```

### LICENSE
MIT

[npm-image]: https://img.shields.io/npm/v/node-url-downloader.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-url-downloader
[travis-image]: https://img.shields.io/travis/blackmatch/downloader.svg?style=flat-square
[travis-url]: https://travis-ci.org/blackmatch/downloader