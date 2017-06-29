const downloader = require('../lib/downloader');

describe('downloader test', function() {
  this.timeout(5 * 60 * 1000);
  it('download a file', function(done) {
    const url = 'https://nodejs.org/dist/v6.11.0/node-v6.11.0.pkg';
    downloader.get(url, () => {
      done();
    });
  });

  it('download with config', function(done) {
    downloader.config({
      dir: 'downloads/',
      fileName: 'node.pkg'
    });
    const url = 'https://nodejs.org/dist/v6.11.0/node-v6.11.0.pkg';
    downloader.get(url, () => {
      done();
    });
  });
});