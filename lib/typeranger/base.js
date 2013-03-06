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

    self.key_is_down = false;

    this.char_container.change($.proxy(function() {
      this.editor.html(this.editor.html() + this.current_char());
    }, this));

    this.char_container.keyup($.proxy(function() {
      if(!this.key_is_down) { this.char_container.change(); }
      this.key_is_down = false;
    }, this));

    this.char_container.keydown($.proxy(function() {
      this.key_is_down = true;
      this.check_for_char_container_changes();
    }, this));

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
  },

});
