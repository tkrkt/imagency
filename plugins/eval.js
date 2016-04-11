'use strict';

const vm = require('vm');
const svg = require('../services/svg');

module.exports = {
  contentType: 'image/svg+xml',
  codeType: 'string',
  generate(req, res, code){
    let result;
    try {
      result = vm.runInNewContext(code);
    } catch(e) {
      result = 'invalid';
    }

    res.write(svg.text({
      text: `${code} => ${result}`
    }));
    res.end();
  }
};