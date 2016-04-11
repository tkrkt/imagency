'use strict';

const ini = require('ini');

module.exports = function (str) {
  let json;
  try {
    json = JSON.parse(str);
  } catch (e) {
  }
  if (json) return json;

  try {
    json = ini.parse(str);
  } catch (e) {
  }

  return json; // or null
};