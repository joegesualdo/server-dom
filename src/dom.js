var Document = require(__dirname + '/document.js');
var Node = require(__dirnmae + '/node.js');
var Element = require(__dirname + '/element.js');
var Comment = require(__dirname + '/comment.js');
var Text = require(__dirname + '/text.js');

module.exports = {
  Node: Node,
  Element: Element,
  Comment: Comment,
  Text: Text,
  document: new Document()
}
