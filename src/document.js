var Element = require(__dirname + '/element.js');
var Comment = require(__dirname + '/comment.js');
var Text = require(__dirname + '/text.js');

function Document(){}

Document.prototype.createTextNode = function(data) {
  var textNode = new Text();

  textNode.textContent = data;
  textNode.nodeName = '#text'
  textNode.nodeType = 3

  return textNode;
}

Document.prototype.createElement = function(nodeName) {
  var elementNode = new Element();

  elementNode.nodeName = nodeName;

  return elementNode;
}

Document.prototype.createComment = function(data) {
  var commentNode = new Comment()

  commentNode.data = data

  return commentNode;
}

module.exports = Document;
