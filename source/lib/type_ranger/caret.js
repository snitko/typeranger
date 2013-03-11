TypeRanger.Caret = new JS.Class(TypeRanger.Element, {

  initialize: function(typeranger) {
    this.callSuper();
    // Set position to the beginning of the block
    this.position = { block: typeranger.text_container, position: 0 }
    this.view     = new TypeRanger.CaretView(this);
  },

  move_left:  function(distance) {},
  move_right: function(distance) {},
  move_down:  function()         {},
  move_up:    function()         {},

  select_region: function(start, end) {
    // start == { block: el, position: int }
    // end   == { block: el, position: int }
  }

});
