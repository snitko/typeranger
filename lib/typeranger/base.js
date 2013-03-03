TypeRanger.Base = new JS.Class({

  initialize: function(editor_block) {

    // Set the block which is our text editor
    this.editor_block = $(editor_block);
    this.editor_block.attr('contenteditable', 'true');

    // Bind everything to keyup event
    this.editor_block.keyup(function() {
      var s = rangy.getSelection();
      var r = s.getRangeAt(0)
      r.setStart(r.commonAncestorContainer, 0);
      if(r.endContainer.textContent.match(/\..$/)) {
        var wrapper_node    = document.createElement('b');
        r.surroundContents(wrapper_node);
        TypeRanger.Cursor.move_to_end_of_selection(s, r);
      }
    });

  }

});
