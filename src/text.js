var Node = require("./node.js");

function Text(){}

Text.prototype = new Node()

Text.prototype.nodeType = 3;

Text.prototype.nodeName = '#text';

Text.prototype.__defineGetter__('textContent', function() {
  return escapeHTML(this.value || '');
})

Text.prototype.__defineSetter__('textContent', function(v) {
  this.value = v
})

// Helpers
function escapeHTML(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}

module.exports = Text;
