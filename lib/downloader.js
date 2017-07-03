const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const http = require('http');
const https = require('https');
const URL = require('url');
const ProgressBar = require('progress');
const moment = require('moment');
const EventEmitter = require('events');

class Downloader extends EventEmitter {
  get(url, outDir) {
    const self = this;

    const rule = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    const reg = new RegExp(rule, 'i');
    if (!reg.test(url)) {
      const err = new Error('the url is invalid!');
      // self.emit('error', err);
      throw err;
    }

    const client = url.startsWith('https') ?
      https
      :
      http;
    const opts = {
      host: URL.parse(url).hostname,
      port: URL.parse(url).port,
      path: URL.parse(url).pathname
    };
    client.get(opts, (res) => {
      if (res.statusCode === 200) {
        const output = outDir || './';
        if (!fs.existsSync(output)) {
          mkdirp.sync(output);
        }
        let fileName = path.basename(URL.parse(url).pathname);
        if (fileName.length <= 0) {
          fileName = moment(new Date()).format('YYYYMMDDHHmmss');
          const ext = res.headers['content-type'] ?
            res.headers['content-type'].split('/').pop()
            :
            undefined;
          if (ext) {
            fileName += `.${ext}`;
          }
        }
        const dst = path.join(output, fileName);
        if (fs.existsSync(dst)) {
          fs.unlinkSync(dst);
        }
        const totalLength = parseInt(res.headers['content-length'], 10);
        const ws = fs.createWriteStream(dst, {
          flags: 'a',
          defaultEncoding: 'binary',
        });
        // progress bar
        const barStyle = '[:bar] :current/:total :percent '
          + ':rate/bps :elapsed';
        console.log();
        const bar = new ProgressBar(barStyle, {
          complete: '=',
          incomplete: '-',
          width: 60,
          total: totalLength,
        });
        res.on('data', (chunk) => {
          ws.write(chunk);
          bar.tick(chunk.length);
        });
        res.on('end', () => {
          ws.end();
          console.log(`\nfile has been downloaded at: ${dst}\n`);
          self.emit('done', dst);
        });
      } else {
        throw new Error(`request failed! status code: ${res.statusCode}`);
      }
    });
  }
}

module.exports = Downloader;
