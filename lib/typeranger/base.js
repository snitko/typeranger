TypeRanger.Base = new JS.Class({

  initialize: function(editor_block) {

    // Set the block which is our text editor
    this.editor = $(editor_block);


    // Set the a text field through which we will capture characters
    this.char_container = $("#char_container").focus();
    
    // Refocus immediately if focus is lost
    this.char_container.blur(function() {
      var that = this;
      setTimeout(function() { that.focus(); }, 0);
    });

    var self = this;
    self.key_is_down = false;

    // Detect single character and insert it into the editor
    this.char_container.change(function() {
      self.editor.html(self.editor.html() + self.current_char());
    });

    this.char_container.keyup(function() {
      if(!self.key_is_down) { self.char_container.change(); }
      self.key_is_down = false;
    });

    this.char_container.keydown(function() {
      self.key_is_down = true;
      self.check_for_char_container_changes();
    });

  },

  current_char: function() {
    var c = this.char_container.val();
    this.char_container.val('');
    return c;
  },

  check_for_char_container_changes: function() {
    if(!this.key_is_down) { return; }
    var self = this;
    var timeout = setTimeout(function() {
      self.char_container.change();
      if(self.key_is_down) { self.check_for_char_container_changes(); }
    }, 10);
  }

});
