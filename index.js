'use strict';

const version = require('./package.json').version;
const text2png = require('text2png');
const plugins = require('./plugins');
const parseJSON = require('./services/parseJSON');

Object.keys(plugins).forEach(name => {
  plugins[name].generator = require(plugins[name].path);
});

require('http').createServer(function(req, res) {
  const urls = req.url.split('/');
  if (urls.length < 3) {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-disposition': `attachment; filename=imagency.png`
    });
    res.write(text2png(`Imagency version${version}`));
    res.end();
    return;
  }

  const generatorName = urls[1];
  const code = decodeURI(urls.slice(2).join('/')).trim();

  const plugin = plugins[generatorName];

  // FIXME if-else hell
  if (plugin && plugin.generator) {
    const generator = plugin.generator;
    if (generator.contentType) {
      res.writeHead(200, {
        'Content-Type': generator.contentType,
        'Content-disposition': `attachment; filename=${generatorName}.png`
      });
    }
    if (generator.codeType === 'json') {
      const json = parseJSON(code);
      if (json) {
        generator.generate(req, res, parseJSON(code));
      } else {
        res.writeHead(404, {
          'Content-Type': 'image/png',
          'Content-disposition': `attachment; filename=${generatorName}.png`
        });
        res.write(text2png('ERROR! Invalid JSON', {textColor: 'red'}));
        res.end();
      }
    } else {
      generator.generate(req, res, code);
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