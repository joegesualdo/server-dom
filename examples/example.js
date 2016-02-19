var document = require("../index.js").document
el = document.createElement('div');
el.className = "class_one"
el.classList.add("class_two")
console.log(el.outerHTML)
