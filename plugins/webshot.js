const webshot = require('webshot');

module.exports = {
  contentType: 'image/png',
  codeType: 'string',
  generate(req, res, code){
    webshot(code).pipe(res);
  }
};