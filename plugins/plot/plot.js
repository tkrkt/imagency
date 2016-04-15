'use strict';
const webshot = require('webshot');

const html = (json, port) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin:0">
  <div id="plot"></div>
  <script src="http://127.0.0.1:${port}/lib/plot/d3.js"></script>
  <script src="http://127.0.0.1:${port}/lib/plot/function-plot.js"></script>
  <script>functionPlot(${JSON.stringify(json)});</script>
</body>
</html>`;
};

module.exports = {
  contentType: 'image/png',
  codeType: 'json/ini',
  generate(req, res, code){
    const plot = Object.assign({
      target: '#plot',
      width: 500,
      height: 500
    }, code);

    webshot(html(plot, process.env.PORT || 8888), {
      siteType: 'html',
      windowSize: {
        width: plot.width,
        height: plot.height
      }
    }).pipe(res);
  }
};