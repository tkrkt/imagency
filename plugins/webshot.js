const webshot = require('webshot');

module.exports = {
  generate(req, res, code){
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-disposition': 'attachment; filename=webshot.png'
    });
    webshot(code).pipe(res);
  }
};