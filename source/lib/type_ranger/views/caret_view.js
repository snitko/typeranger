TypeRanger.CaretView = new JS.Class(TypeRanger.View, {

  blinking_interval: 500,

  initialize: function(controller) {
    this.callSuper(controller);
    this.controller.typeranger.text_container.el.append($('<div class="caret"></div>'));
    this.start_blink();
  },

  start_blink: function() {
    if(!this.blinking) {
      // Setting unique blink id so that another
      // blinking cycle doesn't start on window focus
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

  el: function() {
    // Why do we have a method that returns the caret element
    // instead of a property set to such an element in #initialize()?
    // That's because browsers suck dicks and don't bind to the element properly after
    // some amount of F5s pressed. I don't really know what's going on, but if you can fix it,
    // and write this more elegantly, then by all means do it.
    return $(".caret", this.controller.typeranger.text_container.el); 
  }


});
