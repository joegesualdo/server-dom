## Server DOM
> Nodejs implementation of the DOM for use on the server.

## Install

```
$ npm install --save server-dom
```

## Usage
```
var document = require("server-dom").document
el = document.createElement('div');
el.className = "class_one"
el.classList.add("class_two")

console.log(el.outerHTML) //=> <div class="class_one class_two"></div>
```

## About
The purpose of this repo is to get deeper understanding of the Document Object 
Model by attempting to implement it from scratch.
