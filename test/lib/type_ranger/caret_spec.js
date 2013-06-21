TypeRanger.CaretSpec = JS.Test.describe(
'TypeRanger.Caret', function() { with(this) {

    before(function() { with(this) {
      this.text_node  = new TypeRanger.TextNode('', $('<b></b>'));
      this.caret      = TR.caret;
      
      // Put caret in our custom node, not the main one.
      // Important to do, so this node only exists within this spec.
      this.caret.node = this.text_node;
      this.caret.pos  = this.text_node.last_pos_index();
    }});

    it('updates its position on caret movement', function() { with(this){
      caret.pos = 0;
      caret.move_right(5);
      assertEqual(5, caret.pos);
      caret.move_left(2);
      assertEqual(3, caret.pos);
    }});

    it('allows text to be inserted before and after the caret', function() { with(this) {
      assertEqual(0, caret.pos);
      caret.insert_before('hello world');
      assertEqual('hello world', caret.node.el.html());
      assertEqual(11, caret.pos);
    }});

    it('deletes characters before and after the caret', function()  { with(this) {
      caret.insert_before('hello world');
      assertEqual(11, caret.pos);
      caret.delete_before(caret.pos);
      assertEqual('hello worl', caret.node.el.html());
      caret.move_left(10);
      caret.delete_after(caret.pos);
      assertEqual('ello worl', caret.node.el.html());
    }});

    it('changes current node to parent when border is reached', function()  { with(this) {
      var child_node = new TypeRanger.TextNode('child node', $('<span></span>'));
      //...
    }});

}});
