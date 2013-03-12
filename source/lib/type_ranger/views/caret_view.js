TypeRanger.CaretView = new JS.Class(TypeRanger.View, {

  blinking_interval: 500,

  initialize: function(controller) {
    this.callSuper(controller);
    $("body").prepend($('<div class="caret"></div>'));

    this.editor_el = this.controller.typeranger.text_container.el;
    this.shadow = $('<span class="shadowCaret"></span>');
    this.editor_el.append(this.shadow);
    
    this.start_blink();
    this.render();
  },

  start_blink: function() {
    if(!this.blinking) {
      // Setting unique blink id so that another
      // blinking cycle doesn't accidentally start.
      this.current_blink_id = new Date().getTime().toString() + Math.random();
      this.blink(this.current_blink_id);
    }
  },

  stop_blink: function() {
    this.current_blink_id = false;
    this.el().show();
  },

  blink: function(bid) {
    if(this.current_blink_id != bid) { return; }
    setTimeout(this.proxy(function() {
      if(this.el().is(':visible')) { this.el().hide(); }
      else                         { this.el().show(); }
      this.blink(bid);
    }), this.blinking_interval);        
  },

  // Uses TypeRanger.Caret data about the logical position of the caret
  // withing the editor to render the visual position of the caret on the screen.
  // CaretView #el() always has absolute position. It doesn't know anything
  // nor about the editor neither about the elements within it.
  render: function() {
    this.el().css({top: this.shadow_el().offset().top, left: this.shadow_el().offset().left});
  },

  // Places shadow cursor after the character n in the editor.
  // Contents of the editor is treated like a string, not html,
  // so one must be careful providing position n within an html tag.
  place_shadow_at: function(n) {
    this.shadow_el().remove();
    var before = this.editor_el.html().slice(0, n);
    var after  = this.editor_el.html().slice(n);
    this.editor_el.html(before);
    this.editor_el.append(this.shadow);
    this.editor_el.html(this.editor_el.html() + after);
  },

  el: function() {
    // Why do we have a method that returns the caret element
    // instead of a property set to such an element in #initialize()?
    // That's because browsers suck dicks and don't bind to the element properly after
    // some amount of F5s pressed. I don't really know what's going on, but if you can fix it,
    // and write this more elegantly, then by all means do it.
    return $(".caret"); 
  },

  shadow_el: function() {
    return $(".shadowCaret", this.editor_el);           
  }


});
