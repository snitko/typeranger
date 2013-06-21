TypeRanger.Caret = new JS.Class("Caret", TypeRanger.Element, {

  initialize: function(typeranger) {
    this.callSuper(typeranger);
    this.view = new TypeRanger.CaretView(this);
    this.node = this.typeranger.text_container;
    this.pos  = this.node.last_pos_index();

    this.loggable_properties_names = ['pos', 'node.id'];

  },

  move_left:  function(distance) { this.update_position(this.pos - distance); },
  move_right: function(distance) { this.update_position(this.pos + distance); },
  move_down:  function()         {},
  move_up:    function()         {},

  insert_before: function(s) {
    this.update_position(this.node.push(s, this.pos));
  },

  insert_after: function(s) {
  },

  delete_before: function() {
    this.update_position(this.node.pop(this.pos));
  },

  delete_after: function() {
    this.node.pop(this.pos+1);
  },

  update_position: function(new_pos) {
    this.pos = new_pos;
    this.view.place_shadow_at(this.pos);
    this.view.render(); 
    this.debug_log("update_position");
  }


});
