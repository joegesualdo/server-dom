var Node = require("./node.js");
var Style = require("./style.js");
var ClassList = require("./classlist.js");

Element.prototype = new Node()

function Element() {
    var self = this;

    this.style = new Style(this)
    this.classList = ClassList(this);
    this.childNodes = [];
    this.attributes = [];
    this.dataset = {};
    this.className = '';

    this._setProperty = function(arr, obj, key, val) {
      var p = self._getProperty(arr, key);      
      if (p) {
        p.value = val;
        return;
      }
      arr.push('function' === typeof obj ? new obj(key.toLowerCase(),val) : obj);
    }

    this._getProperty = function(arr, key) {
      if (!key) return;
      key = key.toLowerCase();
      for (var i=0;i<arr.length;i++) {
        if (key == arr[i].name) return arr[i];
      }
    }
}

Element.prototype.nodeType = 1;

Element.prototype.appendChild = function(child) {
    child.parentElement = this;
    this.childNodes.push(child);
    return child;
}

Element.prototype.setAttribute = function (n, v) {
  if (n == 'style'){
    this.style.cssText = v
  } else {
    this._setProperty(this.attributes, Attribute, n, v);
  }
}

Element.prototype.getAttribute = function(n) {
  if (n == 'style'){
    return this.style.cssText
  } else {
    return this._getProperty(this.attributes, n);
  }
}

Element.prototype.replaceChild = function(newChild, oldChild) {
    var self = this;
    var replaced = false;
    this.childNodes.forEach(function(child, index){
        if (child === oldChild) {
            self.childNodes[index] = newChild;
            replaced = true;
        }
    });
    if (replaced) return oldChild;
}

Element.prototype.removeChild = function(rChild) {
    var self = this;
    var removed = true;
    this.childNodes.forEach(function(child, index){
        if (child === rChild) {
            delete self.childNodes[index];
            removed = true;
        }
    })
    if (removed) return rChild;
}

Element.prototype.insertBefore = function(newChild, existingChild) {
    var self = this;
    this.childNodes.forEach(function(child, index){      
      if (child === existingChild) {
        index === 0 ?  self.childNodes.unshift(newChild)
                    :  self.childNodes.splice(index, 0, newChild);
      }  
    })
    return newChild;
}

Element.prototype.addEventListener = function(type, listener, useCapture, wantsUntrusted) {
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener
  // There is an implementation there but probably not worth it.
}

Element.prototype.removeEventListener = function(type, listener, useCapture) {
  // https://developer.mozilla.org/en/docs/Web/API/EventTarget.removeEventListener
  // There is an implementation there but probably not worth it.
}

Element.prototype.insertAdjacentHTML = function(position, text) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML
  // Not too much work to implement similar to innerHTML below.
}

Element.prototype.__defineGetter__('innerHTML', function () {
    // regurgitate set innerHTML
    var s = this.childNodes.html || ''
    this.childNodes.forEach(function (e) {
      s += (e.outerHTML || e.textContent)
    })
    return s
})

Element.prototype.__defineSetter__('innerHTML', function (v) {
    //only handle this simple case that doesn't need parsing
    //this case is useful... parsing is hard and will need added deps!
    this.childNodes.length = 0

    // hack to preserve set innerHTML - no parsing just regurgitation
    this.childNodes.html = v
})


Element.prototype.__defineGetter__('outerHTML', function () {
  var a = [],  self = this;
  var VOID_ELEMENTS = {
    AREA: true,
    BASE: true,
    BR: true,
    COL: true,
    EMBED: true,
    HR: true,
    IMG: true,
    INPUT: true,
    KEYGEN: true,
    LINK: true,
    META: true,
    PARAM: true,
    SOURCE: true,
    TRACK: true,
    WBR: true
  };
  
  function _stringify(arr) {
    var attr = [], value;        
    arr.forEach(function(a){
      value = ('style' != a.name) ? a.value : self.style.cssText;
      attr.push(a.name+'='+'\"'+escapeAttribute(value)+'\"');
    })
    return attr.length ? ' '+attr.join(" ") : '';
  }

  function _dataify(data) {      
    var attr = [], value;  
    Object.keys(data).forEach(function(name){
      attr.push('data-'+name+'='+'\"'+escapeAttribute(data[name])+'\"');
    })
    return attr.length ? ' '+attr.join(" ") : '';
  }

   function _propertify() {
    var props = [];
    for (var key in self) {            
      _isProperty(key) && props.push({name: key, value:self[key]});
    }    
    // special className case, if className property is define while 'class' attribute is not then
    // include class attribute in output
    self.className.length && !self.getAttribute('class') && props.push({name:'class', value: self.className})   
    return props ? _stringify(props) : '';
  }

  function _isProperty(key) {          
      var types = ['string','boolean','number']      
      for (var i=0; i<=types.length;i++) {        
        if (self.hasOwnProperty(key) && 
            types[i] === typeof self[key] &&
            key !== 'nodeName' &&
            key !== 'nodeType' &&
            key !== 'className'
            ) return true;
      }      
  }

  a.push('<'+this.nodeName + _propertify() + _stringify(this.attributes) + _dataify(this.dataset) +'>')
  
  if (!VOID_ELEMENTS[this.nodeName.toUpperCase()]){
    a.push(this.innerHTML)
    a.push('</'+this.nodeName+'>')
  }

  return a.join('')
})

Element.prototype.__defineGetter__('textContent', function () {
  var s = ''
  this.childNodes.forEach(function (e) {
    s += e.textContent
  })
  return s
})

Element.prototype.addEventListener = function(t, l) {}

// Helpers ====
function escapeHTML(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}
function escapeAttribute(s) {
  return escapeHTML(s).replace(/"/g, '&quot;')
}


module.exports = Element;
