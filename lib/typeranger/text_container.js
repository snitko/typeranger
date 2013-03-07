// Represents a space for storing all of the text that user actually sees
TypeRanger.TextContainer = new JS.Class(TypeRanger.Element, {

  initialize: function() {
    this.callSuper();
    this.el = $(".editor");    
  },

  // pushes string to the end of the content
  push: function(s) {
    this.el.html(this.el.html() + s);      
  }

});
