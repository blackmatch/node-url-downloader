const downloader = require('../lib/downloader');

describe('downloader test', function () {
  this.timeout(5 * 60 * 1000);
  const url = 'https://github.com/nodejs/node/blob/master/doc/releases.md';
  it('download a file', function (done) {
    downloader.get(url, () => {
      done();
    });
  });

  it('download with config', function (done) {
    downloader.config({
      dir: 'downloads/',
      fileName: 'node.pkg'
    });
    downloader.get(url, () => {
      done();
    });
  });

  it('download with progress', function (done) {
    downloader.config({
      withProgress: true,
    });
    downloader.get(url, () => {
      done();
    });
  });

  it('redownload file test', function (done) {
    downloader.config({
      withProgress: true,
      redownload: true,
    });
    downloader.get(url, () => {
      done();
    });
  });
});
