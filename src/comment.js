var Node = require(__dirname + '/node.js');
var escapeHTML = require(__dirname + '/helpers/escapeHTML.js');

function Comment(){}

Comment.prototype = new Node();

Comment.prototype.nodeType = 8;

Comment.prototype.nodeName = '#comment';

// TODO: Replace __defineGetter__ due to deprecation:
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
Comment.prototype.__defineGetter__('data', function() {
  return this.value
})

// TODO: Replace __defineSetter__ due to deprecation:
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineSetter__
Comment.prototype.__defineSetter__('data', function(v) {
  this.value = v
})

// TODO: Replace __defineGetter__ due to deprecation:
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
Comment.prototype.__defineGetter__('outerHTML', function() {
  return '<!--' + escapeHTML(this.value || '') + '-->'
})

module.exports = Comment;
