TypeRanger.Caret = new JS.Class(TypeRanger.Element, {

  initialize: function(typeranger) {
    this.callSuper(typeranger);
    this.view = new TypeRanger.CaretView(this);
    this.node = this.typeranger.text_container;
    this.pos  = this.node.last_pos_index();
  },

  move_left:  function(distance) {},
  move_right: function(distance) {},
  move_down:  function()         {},
  move_up:    function()         {},

  insert_before: function(s) {
    this.update_position(this.node.push(s, this.pos));
  },

  delete_before: function() {
    this.update_position(this.node.pop(this.pos));
  },

  insert_after: function(s) {
  },

  update_position: function(new_pos) {
    this.pos = new_pos;
    this.view.place_shadow_at(this.pos);
    this.view.render(); 
  }


});
