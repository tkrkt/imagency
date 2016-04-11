const uiflow = require('uiflow');
const viz = require("viz.js");

module.exports = {
  contentType: 'image/svg+xml',
  codeType: 'string',
  generate(req, res, code){
    // ハイフン代用のチルダを元に戻す
    const uiflowCode = code.replace(/^~+$/mg, '--');
    const svg = viz(uiflow.compile(uiflowCode));
    res.write(svg);
    res.end();
  }
};