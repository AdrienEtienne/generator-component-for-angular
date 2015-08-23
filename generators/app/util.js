'use strict';
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

module.exports = {
  toCamelCase: toCamelCase,
  copyPaste: copyPaste
};

function toCamelCase(str) {
  return _.camelCase(str);
}

function copyPaste(origin, dest, before, after) {
  var file = fs.readFileSync(origin);
  if (before !== undefined && after !== undefined) {
    file = file.replace(before, after);
  }
  fs.writeFileSync(dest, file);
}

function copyArray(array) {
  _.forEach(array, function(obj) {
    if (path.extname(obj.src) === '.json') {
      copyPasteJson(obj.src, obj.dest, obj.before, obj.after);
    } else {
      copyPaste(obj.src, obj.dest, obj.after);
    }
  })
}

function copyPasteJson(origin, dest, obj) {
  var o = require(origin);
  o = _.merge(o, obj);
  fs.writeFileSync(dest, JSON.stringify(o));
}