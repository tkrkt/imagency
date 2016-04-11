'use strict';

const plugins = require('./plugins');
const parseJSON = require('./services/parseJSON');

Object.keys(plugins).forEach(name => {
  plugins[name].generator = require(plugins[name].path);
});

require('http').createServer(function(req, res) {
  const urls = req.url.split('/');
  if (urls.length < 3) {
    res.writeHead(404);
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
        res.writeHead(404);
        res.end();
      }
    } else {
      generator.generate(req, res, code);
    }
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(process.env.PORT || 8888, '127.0.0.1');