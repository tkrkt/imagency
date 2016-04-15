'use strict';
const ini = require('ini');
const JSON5 = require('json5');

const decode = (raw) => decodeURI(raw).trim();

// should i use switch?
module.exports = {
  json: raw => {
    return JSON5.parse(decode(raw)); // throwable
  },
  ini: raw => {
    return ini.parse(decode(raw)); //throwable
  },
  'json/ini': raw => {
    try {
      let json = JSON5.parse(decode(raw));
      return json;
    } catch (_) {
    }
    try {
      let ini = ini.parse(decode(raw));
      return ini;
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