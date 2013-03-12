TypeRanger.Caret = new JS.Class(TypeRanger.Element, {

  initialize: function(typeranger) {
    this.callSuper();
    this.view = new TypeRanger.CaretView(this);
    this.current_pos = 0;
  },

  move_left:  function(distance) { this.update_position(-distance); },
  move_right: function(distance) { this.update_position(distance); },
  move_down:  function()         {},
  move_up:    function()         {},

  update_position: function(distance) {
    this.current_pos = this.current_pos + distance;
    this.view.place_shadow_at(this.current_pos);
    this.view.render(); 
  }

});
