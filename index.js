const plugins = {
  uiflow: require('./plugins/uiflow'),
  webshot: require('./plugins/webshot')
};

require('http').createServer(function(req, res) {
  const [_, generator, ...encodedURIs] = req.url.split('/');
  if (!generator || !encodedURIs) {
    res.writeHead(404);
    res.end();
    return;
  }
  const code = decodeURI(encodedURIs.join('/')).trim();
  if (plugins[generator]) {
    plugins[generator].generate(req, res, code);
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(process.env.PORT || 8888, '127.0.0.1');