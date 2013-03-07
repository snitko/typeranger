TypeRanger.Caret = new JS.Class({

  initialize: function(type_ranger) {
    // TODO: there should be only one caret per editor
    this.type_ranger   = type_ranger;
    // Set position to the beginning of the block
    this.position = { block: type_ranger.editor, position: 0 }
  },

  move_left:  function(distance) {},
  move_right: function(distance) {},
  move_down:  function()         {},
  move_up:    function()         {},

  select_region: function(start, end) {
    // start == { block: el, position: int }
    // end   == { block: el, position: int }
  },


});
