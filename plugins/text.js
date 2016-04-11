'use strict';

const svg = require('../services/svg');

module.exports = {
  contentType: 'image/svg+xml',
  codeType: 'json',
  generate(req, res, json){
    res.write(svg.text(json));
    res.end();
  }
};