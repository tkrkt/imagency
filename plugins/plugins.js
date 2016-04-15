'use strict';

const text2png = require('text2png');
const pkg = require('../package.json');
const plugins = require('../plugins.js');

module.exports = {
  contentType: 'image/png',
  codeType: 'raw',
  generate(req, res, json){
    const text = [`imagency @${pkg.version}`, ...(Object.keys(plugins)).map(p => ' - ' + p)].join('\n');
    res.write(text2png(text));
    res.end();
  }
};