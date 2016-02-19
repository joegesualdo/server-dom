var Document = require("./src/document.js");
var Node = require("./src/node.js");
var Element = require("./src/element.js");
var Comment = require("./src/comment.js");
var Text = require("./src/text.js");

module.exports = {
  Node: Node,
  Element: Element,
  Comment: Comment,
  Text: Text,
  document: new Document()
}
