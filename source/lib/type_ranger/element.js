// A class from which all other elements of the text editor
// (like TextContainer or Caret) inherit.
TypeRanger.Element = new JS.Class('Element', {

  include: [Proxy, TypeRanger.Debuggable],

  initialize: function(typeranger) {
    this.typeranger = typeranger;
  }

});
