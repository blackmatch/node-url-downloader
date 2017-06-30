#! /usr/bin/env node

const downloader = require('../lib/downloader');

const main = function(url) {
  downloader.config({
    withProgress: true,
  });
  downloader.get(url);
};

const url = process.argv[2];
main(url);
