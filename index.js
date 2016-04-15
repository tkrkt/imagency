'use strict';

const version = require('./package.json').version;
const text2png = require('text2png');
const plugins = require('./plugins');
const parseCode = require('./services/parseCode');

Object.keys(plugins).forEach(name => {
  plugins[name].generator = require(plugins[name].path);
});

require('http').createServer(function(req, res) {
  const urls = req.url.split('/');
  if (urls.length < 2) {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-disposition': `attachment; filename=imagency.png`
    });
    res.write(text2png(`Hello! imagency @${version}`));
    res.end();
    return;
  }

  const generatorName = urls[1];
  const raw = urls.slice(2).join('/');
  const plugin = plugins[generatorName];

  if (plugin && plugin.generator) {
    const generator = plugin.generator;
    if (generator.contentType) {
      res.writeHead(200, {
        'Content-Type': generator.contentType,
        'Content-disposition': `attachment; filename=${generatorName}.png`
      });
    }

    try {
      const code = parseCode[generator.codeType](raw);
      generator.generate(req, res, code);
    } catch (e) {
      res.writeHead(400, {
        'Content-Type': 'image/png',
        'Content-disposition': 'attachment; filename=error.png'
      });
      res.write(text2png(e.toString(), {textColor: 'red'}));
      res.end();
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'image/png',
      'Content-disposition': `attachment; filename=${generatorName}.png`
    });
    res.write(text2png(`ERROR! generator: ${generatorName} is not found.`, {textColor: 'red'}));
    res.end();
  }
}).listen(process.env.PORT || 8888, '127.0.0.1');