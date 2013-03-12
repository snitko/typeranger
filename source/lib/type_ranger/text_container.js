// Represents a space for storing all of the text that user actually sees
TypeRanger.TextContainer = new JS.Class(TypeRanger.Element, {

  initialize: function() {
    this.callSuper();
    this.el = $(".editor");    
    this.id = Math.random();
  },

  // pushes string to the end of the content
  push: function(s) {
    this.el.html(this.el.html() + s);
    this.typeranger.caret.move_right(1);    
  },

  remove_prev_char: function() {
    this.typeranger.caret.move_left(1);    
    this.el.html(this.el.html().slice(0, -1));
  }

});
