TypeRanger.Base = new JS.Class({

  initialize: function() {
    
    // Create a text container
    this.text_container = new TypeRanger.TextNode('', $(".editor"));
    // Create a new caret for this container
    this.caret = new TypeRanger.Caret(this);
    // Attach default event dispatcher
    this.key_dispatcher = new TypeRanger.KeyDispatcher(this);

  }

});
