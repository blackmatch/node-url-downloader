downloader

You can download file from url by node.js.

### Install

```js
npm install downloader --save
```

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