TypeRanger.TextNodeSpec = JS.Test.describe(
'TypeRanger.TextNode', function() { with(this) {

    before(function() { with(this) {
      this.text_node = new TypeRanger.TextNode("hello", $("<b></b>"));
    }});

    it('pushes every newly created node into the TextNodeStorage', function() { with(this) {
      assertEqual(text_node, TypeRanger.TextNodeStorage.get(text_node.id));
    }});

    it('updates the corresponding DOM-element whenever its text content changes', function() { with(this) {
      text_node.push(" world");
      assertEqual("hello world", text_node.el.html());
    }});


    it('updates the corresponding DOM-element and re-renders all children as well', function() { with(this) {
      var child = new TypeRanger.TextNode("world", $("<i></i>"));
      text_node.push_child(child);
      assertEqual("hello<i>world</i>", text_node.el.html());
    }});

}});
