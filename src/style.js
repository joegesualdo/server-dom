// @param {Element} element
function Style (element) {
  this.el = element;
  this.styles = [];
}

Style.prototype.setProperty = function (n,v) {
  this.el._setProperty(this.styles, {name: n, value:v});
}

Style.prototype.getProperty = function(n) {    
  return this.el._getProperty(this.styles, n);
}

Style.prototype.__defineGetter__('cssText', function () {
    var stylified = '';
    this.styles.forEach(function(s){
      stylified+=s.name+':'+s.value+';';
    })
    return stylified;
})

Style.prototype.__defineSetter__('cssText', function (v) {
    this.styles.length = 0

    // parse cssText and set style attributes
    v.split(';').forEach(function(part){
      var splitPoint = part.indexOf(':')
      if (splitPoint){
        var key = part.slice(0, splitPoint).trim()
        var value = part.slice(splitPoint+1).trim()
        this.setProperty(key, value)
      }
    }, this)
})

 module.exports = Style;
