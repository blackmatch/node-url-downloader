const chai = require('chai');
// const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
// const should = chai.should();  // Using Should style

const Downloader = require('../lib/downloader');

describe('downloader', function () {
  this.timeout(5 * 60 * 1000);
  let url = 'https://upload.wikimedia.org/wikipedia/commons/'
    + 'thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png';

  it('#download normally', (done) => {
    const download = new Downloader();
    download.get(url);
    download.on('done', () => {
      done();
    });
  });

  it('#download with outDir', (done) => {
    const download = new Downloader();
    download.get(url, './downloads');
    download.on('done', () => {
      done();
    });
  });

  it('#bad url, should throw error', () => {
    const download = new Downloader();
    const badUrl = 'htp://test.com';
    expect(function() {
      download.get(badUrl);
    }).to.throw('the url is invalid!');
  });

});
