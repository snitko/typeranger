// Takes care of various keys pressed on a keyboard
TypeRanger.KeyDispatcher = new JS.Class(TypeRanger.Element, {
  

  initialize: function(typeranger) {

    this.callSuper();

    // Set the text field through which we will capture characters
    this.input_container = $("#input_container").focus();
    // Refocus immediately if focus is lost
    this.input_container.blur(function() {
      var that = this;
      setTimeout(function() { that.focus(); }, 0);
    });

    // Overwriting key.filter so that keymaster.js only works on
    // our input_container input field
    key.filter = function() {
      var tagName = (event.target || event.srcElement).tagName;
      return tagName == 'INPUT'; 
    }

    this.learn_special_keys();

    this.key_is_down    = false;
    this.key_is_special = false;

    for(e in this.events) {
      var self = this;
      this.input_container.bind(e, this.proxy(this.events[e]));
    }

  },

  // Events that an input container handles. For the moment, I don't think we'll ever need
  // more than three.
  events: {

    keydown: function() {
      this.key_is_down = true;
      this.key_is_special = false;
      this.check_for_input_container_changes();
    },
    keyup: function() {
      if(!this.key_is_down) { this.input_container.change(); }
      this.key_is_down = false;
    },
    change: function() {
      if(this.key_is_special) { this.clear_current_input(); return; }
      this.typeranger.text_container.push(this.get_current_input());
    }

  },

  // Used by the #events.keydown() and it proceeds to dispatch
  // the key pressed further, calling functions for each key or key combination.
  // Keys and combinations may be specified as described in the
  // keymaster.js documentation here: https://github.com/madrobby/keymaster 
  // Just use key combination string as a key inside the #keys property.
  keys: {
    
    "backspace": function() { this.typeranger.text_container.remove_prev_char(); },
    "delete":    function() {},

  },

  // Returns a wrapped key handler in which before it invokes the
  // function it also sets this.key_is_special to true. We will later
  // check for this flag in #events.change()
  key_handler_in_wrapper: function(k) {
    return this.proxy(function() {
      this.key_is_special = true;
      var self = this;
      this.proxy(this.keys[k])();
    });
  },

  // Retrieves what's left in the input container. It could be a single char (most likely)
  // or it could be a string of chars (when a key is held and one char keeps being printed).
  get_current_input: function() {
    var c = this.input_container.val();
    this.clear_current_input();
    return c;
  },

  // It is absolutely unclear from this method's name what it does. You'll never guess.
  clear_current_input: function() { this.input_container.val(''); },

  // Periodically checks for changes in the input container and fires a change event.
  // Starts the setTimeOut loop when on keydown and keeps checking until the key is up. Thus,
  // most useful when a key is being held. We only really need it for key holding cases,
  // because a #events.change() event is fired by #events.keyup() anyway. 
  check_for_input_container_changes: function() {
    if(!this.key_is_down) { return; }
    var self = this;
    var timeout = setTimeout(function() {
      self.input_container.change();
      if(self.key_is_down) { self.check_for_input_container_changes(); }
    }, 10);
  },

  // This is where we use keymaster.js to define keyboard shortcuts or
  // interpret special keys like Backspace.
  learn_special_keys: function() {
    for(k in this.keys) { key(k, this.key_handler_in_wrapper(k)); }
  }

});
