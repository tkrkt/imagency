'use strict';

const vm = require('vm');
const text2png = require('text2png');
const svg = require('../services/svg');

module.exports = {
  contentType: 'image/png',
  codeType: 'string',
  generate(req, res, code){
    let result, textColor;
    try {
      result = vm.runInNewContext(code);
      textColor = 'black';
    } catch(e) {
      result = e.toString();
      textColor = 'red';
    }

    res.write(text2png(`${code}\n> ${result}`, {
      font: '20px monospace',
      lineSpacing: 8,
      textColor
    }));
    res.end();
  }
};