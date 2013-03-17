TypeRanger.TextNodeSpec = JS.Test.describe(
'TypeRanger.TextNode', function() { with(this) {

    before(function() { with(this) {
      this.text_node = new TypeRanger.TextNode("hello", $("<b></b>"));
    }});

    it('pushes every newly created node into the TextNodeStorage', function() { with(this) {
      assertEqual(text_node, TypeRanger.TextNodeStorage.get(text_node.id));
    }});

    it('pushes text at a specific position within the node', function() { with(this) {
      this.text_node.push('oo', 4);
      assertEqual('hellooo', text_node.el.html());
    }});

    it('updates the corresponding DOM-element whenever its text content changes', function() { with(this) {
      text_node.push(" world");
      assertEqual("hello world", text_node.el.html());
    }});

    it('updates the corresponding DOM-element and re-renders all children as well', function() { with(this) {
      var child = new TypeRanger.TextNode("world", $("<i></i>"));
      text_node.push(child);
      assertEqual("hello<i>world</i>", text_node.el.html());
    }});

    it('removes the character at the specified position', function() { with(this) {
      text_node.pop(5);
      assertEqual(['h', 'e', 'l', 'l'], text_node.objects);
      assertEqual('hell', text_node.el.html());
      text_node.pop(4);
      assertEqual(['h', 'e', 'l'], text_node.objects);
      assertEqual('hel', text_node.el.html());
    }});

    it('knows the position at which a pushed line of text or a pushed node ends', function() { with(this) {
      assertEqual(11, text_node.push(" world"));
    }});

    it('knows the position at which poped line of text or a poped node started', function() { with(this) {
      assertEqual(0, text_node.pop(1));
    }});

}});
