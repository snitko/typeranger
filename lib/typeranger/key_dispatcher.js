// Takes care of various keys pressed on a keyboard
TypeRanger.KeyDispatcher = new JS.Class({

  initialize: function(typeranger) {

    // typeranger object
    this.typeranger = typeranger;

    // Set the text field through which we will capture characters
    this.char_container = $("#char_container").focus();
    // Refocus immediately if focus is lost
    this.char_container.blur(function() {
      var that = this;
      setTimeout(function() { that.focus(); }, 0);
    });

    self.key_is_down = false;

    for(e in this.events) {
      this.char_container.bind(e, $.proxy(this.events[e], this));
    }

  },

  events: {

    keydown: function() {
      this.key_is_down = true;
      this.check_for_char_container_changes();
    },
    keyup: function() {
      if(!this.key_is_down) { this.char_container.change(); }
      this.key_is_down = false;       
    },
    change: function() {
      this.typeranger.editor.html(this.typeranger.editor.html() + this.current_char());
    }

  },

  // This one is used by the keydown event and it proceeds to dispatch
  // the key pressed further, calling functions for each key or key combination.
  keys: {
        
        
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
