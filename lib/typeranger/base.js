TypeRanger.Base = new JS.Class({

  initialize: function(editor_block) {

    // Set the block which is our text editor
    this.editor = $(editor_block);
    // Create a new caret for this editor
    this.caret  = new TypeRanger.Caret(this);
    // Attach default event dispatcher
    this.event_dispatcher = new TypeRanger.KeyDispatcher({
      char_container: this.char_container,
      editor: this.editor
    });

  }

});
