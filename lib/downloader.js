const fse = require('fs-extra');
const path = require('path');
const http = require('http');
const https = require('https');
const URL = require('url');
const Progress = require('progress');

/* get file name from url*/
const getFileNameFromUrl = (url) => {
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

/* configurations */
const configSetting = (setting) => {
  if (setting) {
    this.dir = setting.dir || './';
    this.fileName = setting.fileName || undefined;
    this.withProgress = setting.withProgress || false;
  }
};

/* download file */
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
    const {statusCode} = res;
    if (statusCode !== 200) {
      throw new Error(`Request error! Status code: ${statusCode}`);
    }

    res.setEncoding('utf8');

    const dir = this.dir || './';
    if (!fse.existsSync(dir)) {
      fse.mkdirp(dir);
    }
    const arr = res.headers['content-type'].split('/');
    const ext = arr[arr.length - 1];
    const fileName = this.fileName || getFileNameFromUrl(url)
      || `${(new Date()).getTime()}.${ext}`;
    const dst = path.join(dir, fileName);
    /* if the file is exist, remove it */
    if (fse.existsSync(dst)) {
      fse.unlinkSync(dst);
    }
    /* progress bar */
    let bar;
    const totalLength = parseInt(res.headers['content-length'], 10);
    if (this.withProgress && totalLength > 0) {
      const barStyle = 'downloading [:bar] :current/:total :percent';
      bar = new Progress(barStyle, {
        complete: '=',
        incomplete: '-',
        width: 60,
        total: totalLength,
      });
      console.log();
    }
    const ws = fse.createWriteStream(dst);
    res.on('data', (chunk) => {
      ws.write(chunk);
      if (bar) {
        bar.tick(chunk.length);
      }
    });
    res.on('end', () => {
      ws.end();
      if (done) {
        done();
      }
    });
  });
};

const Downloader = {
  config: configSetting,
  get: downloadFile,
};

module.exports = Downloader;
