'use strict';

const Canvas = require('canvas');
const Image = Canvas.Image;
const fs = require('fs');
const text2png = require('text2png');

module.exports = {
  contentType: 'image/png',
  codeType: 'string',
  generate(req, res, code){
    const canvas = new Canvas(551, 344);
    const context = canvas.getContext('2d');

    const kokuban = new Image();
    kokuban.src = fs.readFileSync(__dirname + '/kokuban.png');
    context.drawImage(kokuban, 0, 0);

    context.drawImage(text2png(code, {
      textColor: 'white',
      output: 'canvas',
      lineSpacing: 10
    }), 250, 60);

    const elen = new Image();
    elen.src = fs.readFileSync(__dirname + '/elen.png');
    context.drawImage(elen, 30, 62);

    res.write(canvas.toBuffer());
    res.end();
  }
};