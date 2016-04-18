'use strict';
const ini = require('ini');
const JSON5 = require('json5');

const decode = (raw) => decodeURI(raw).trim();

module.exports = {
  json: raw => {
    return JSON5.parse(decode(raw)); // throwable
  },
  ini: raw => {
    return ini.parse(decode(raw)); //throwable
  },
  'json/ini': raw => {
    const code = decode(raw).trim();
    try {
      let json = JSON5.parse(code);
      return json;
    } catch (_) {
    }
    try {
      let json = ini.parse(code);
      return json;
    } catch (_) {
    }

    throw new Error('Invalid code');
  },
  string: raw => {
    return decode(raw);
  },
  raw: raw => {
    return raw;
  }
};