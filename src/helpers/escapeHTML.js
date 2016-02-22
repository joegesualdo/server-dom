// TODO: Expand this functionality
//   - http://www.theukwebdesigncompany.com/articles/entity-escape-characters.php
//   - http://www.escapecodes.info/
//   - http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
//   - https://github.com/component/escape-html/blob/master/index.js
//
// escapeHTML convertes HTML to escaped character
function escapeHTML(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}

module.exports = escapeHTML;
