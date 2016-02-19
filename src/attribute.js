function Attribute(name, value){
  if (name) {
    this.name = name;
    this.value = value ? value : '';
  }
}

module.exports = Attribute;
