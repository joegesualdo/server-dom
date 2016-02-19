var Document = require("./document.js");
var Node = require("./node.js");
var Element = require("./element.js");
var Comment = require("./comment.js");
var Text = require("./text.js");

module.exports = {
  Node: Node,
  Element: Element,
  Comment: Comment,
  Text: Text,
  document: new Document()
}
