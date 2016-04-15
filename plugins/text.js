'use strict';

const text2png = require('text2png');
const svg = require('../services/svg');

module.exports = {
  contentType: 'image/png',
  codeType: 'json/ini',
  generate(req, res, json){
    res.write(text2png(json.text, json));
    res.end();
  }
};