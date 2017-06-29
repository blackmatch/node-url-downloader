const fse = require('fs-extra');
const path = require('path');
const http = require('http');
const https = require('https');
const URL = require('url');

let getFileNameFromUrl = (url) => {
  let fileName;
  const pathName = URL.parse(url).pathname;
  if (pathName.indexOf('/') !== -1 && pathName.split('/')
    && pathName.split('/').length >= 2) {
    let arr = pathName.split('/');
    let endPart = arr[arr.length - 1];
    if (endPart.indexOf('.') !== -1) {
      fileName = endPart;
    }
  }

  return fileName;
};

const configSetting = (setting) => {
  if (setting) {
    this.dir = setting.dir || './';
    this.fileName = setting.fileName || undefined;
  }
};

const downloadFile = (url, done) => {
  var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if (!reg.test(url)) {
    throw new Error('A valid url is needed!');
  }

  const start = url.substr(0, 5);
  const client = start.toLowerCase() === 'https' ?
    https
    :
    http;
  client.get(url, (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      res.resume();
      throw new Error(`Request error! Status code: !{statusCode}`);
    }

    const dir = this.dir || './';
    if (!fse.existsSync(dir)) {
      fse.mkdirp(dir);
    }
    const arr = res.headers['content-type'].split('/');
    const ext = arr[arr.length - 1];
    const fileName = this.fileName || getFileNameFromUrl(url)
      || `${(new Date()).getTime()}.${ext}`;
    const dst = path.join(dir, fileName);
    res.setEncoding('utf8');
    const ws = fse.createWriteStream(dst);
    res.on('data', (chunk) => {
      ws.write(chunk);
    });
    res.on('end', () => {
      ws.end();
      console.log(`${dst} is downloaded!`);
      if (done) done();
    });
  });
};

const Downloader = {
  config: configSetting,
  get: downloadFile,
};

module.exports = Downloader;
