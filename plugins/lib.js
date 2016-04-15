'use strict';

const path = require('path');
const fs = require('fs');
const plugins = require('../plugins');
const lodashGet = require('lodash.get');

module.exports = {
  contentType: 'application/javascript',
  codeType: 'string',
  generate(req, res, code){
    const plugin = code.split('/')[0];
    let file = code.split('/')[1];
    if (!file) {
      res.writeHead(404);
      res.end();
      return;
    }
    file = file.endsWith('.js') ? file.slice(0, -3) : file;
    const filePath = lodashGet(plugins, [plugin, 'lib', file]);
    if (filePath) {
      fs.createReadStream(__dirname + '/../' + filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end();
    }
  }
};