const uiflow = require('uiflow');
const viz = require("viz.js");

module.exports = {
  generate(req, res, code){
    // ハイフン代用のチルダを元に戻す
    const uiflowCode = code.replace(/^~+$/mg, '--');
    const svg = viz(uiflow.compile(uiflowCode));
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
      'Content-disposition': 'attachment; filename=uiflow.svg'
    });
    res.write(svg);
    res.end();
  }
};