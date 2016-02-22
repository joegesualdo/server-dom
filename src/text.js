var Node = require(__dirname + '/node.js');
var escapeHTML = require(__dirname + '/helpers/escapeHTML.js');

function Text(){}

Text.prototype = new Node()

Text.prototype.nodeType = 3;

Text.prototype.nodeName = '#text';

// TODO: Replace __defineGetter__ due to deprecation:
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
Text.prototype.__defineGetter__('textContent', function() {
  return escapeHTML(this.value || '');
})

// TODO: Replace __defineSetter__ due to deprecation:
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineSetter__
Text.prototype.__defineSetter__('textContent', function(v) {
  this.value = v
})

module.exports = Text;
