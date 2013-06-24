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

      var child_node  = new TypeRanger.TextNode('child node', $('<span>child node</span>'));
      var child_node2 = new TypeRanger.TextNode('child node', $('<span>child node 2</span>'));

      caret.insert_before('hello world');
      caret.insert_before(child_node);
      caret.node = text_node;
      assertEqual(caret.node, text_node);
      caret.pos  = this.text_node.last_pos_index();
      caret.insert_before('lala');
      assertEqual(16, caret.pos);

      // Moving caret backwards, into the child node
      caret.move_left(4);
      assertEqual(caret.node, child_node);
      assertEqual(10, caret.pos);

      // Moving caret forward, into the child node
      caret.node = text_node;
      caret.pos  = 11;
      caret.move_right(1);
      assertEqual(caret.node, child_node);
      assertEqual(0, caret.pos);

      // Moving caret from one child node into another, that is its neighboor
      caret.node = text_node;
      caret.pos  = 12;
      caret.insert_before(child_node2);
      caret.node = text_node;
      caret.pos  = 12;
      caret.move_right(1);
      assertEqual(caret.node, child_node2);
      assertEqual(0, caret.pos);

    }});

    it("doesn't change pos beyond node's border if there's nothing else out there", function()  { with(this) {
    }});

}});
