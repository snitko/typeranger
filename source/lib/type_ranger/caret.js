TypeRanger.Caret = new JS.Class("Caret", TypeRanger.Element, {

  initialize: function(typeranger) {
    this.callSuper(typeranger);
    this.view     = new TypeRanger.CaretView(this);
    this.node     = this.typeranger.text_container;
    this.pos      = this.node.last_pos_index();
    this.prev_pos = null;
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

  // This method not only updates #pos of the caret, it also
  // takes a look at what is at the specified position. If it happens
  // to be another node there (as opposed to a character), then it
  // also sets the #node property to it and sets position to either
  // 0 or node.last_pos_index() depending on the previous position of
  // the caret.
  update_position: function(new_pos) {

    var move_direction = (new_pos > this.pos ? 1 : -1);

    var set_new_position = function(move_direction) {
      if(move_direction < 0) { new_pos = this.node.last_pos_index(); }
      else                   { new_pos = 0; }   
    }

    // Do not move caret beyond the root node
    if(_.isUndefined(this.node.parent_id) && _.isUndefined(this.node.objects[new_pos-1])) {
      this.proxy(set_new_position, -move_direction)();
    }

    if(this.node.objects[new_pos-1] && this.node.objects[new_pos-1].length > 1) {
      this.node = TypeRanger.TextNodeStorage.get(this.node.objects[new_pos-1]);
      this.proxy(set_new_position, move_direction)();
    }

    this.prev_pos = this.pos;
    this.pos      = new_pos;
    this.view.place_shadow_at(this.pos);
    this.view.render(); 
  }

});

TypeRanger.Caret.loggable({methods: ['update_position'], properties: ["pos", "node.id"]});
