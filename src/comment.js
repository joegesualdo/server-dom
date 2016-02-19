var Node = require("./node.js");

function Comment(){}

Comment.prototype = new Node()

Comment.prototype.nodeType = 8;

Comment.prototype.nodeName = '#comment';

Comment.prototype.__defineGetter__('data', function() {
  return this.value
})

Comment.prototype.__defineSetter__('data', function(v) {
  this.value = v
})

Comment.prototype.__defineGetter__('outerHTML', function() {
  return '<!--' + escapeHTML(this.value || '') + '-->'
})

// Helper ======
function escapeHTML(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}
module.exports = Comment;
