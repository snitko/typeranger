// Holds text along with its child nodes. Child nodes are
// referenced within the text with {{child_node_id}}
TypeRanger.TextNode = new JS.Class(TypeRanger.Element, {

  initialize: function(text, el, parent_id) {
    
    this.id = hex_md5((new Date().getTime()).toString() + Math.random().toString());
    TypeRanger.TextNodeStorage.push(this.id, this);
    
    this.parent_id = parent_id; 
    this.el        = el;
    this.text      = text.split(''); // A text is actually an Array of characters and links to other nodes
  },

  push: function(t) {
    this.text = this.text.concat(t.split(''));
    this.render();
  },

  push_child: function(c) {
    c.parent_id = this.id;
    this.text = this.text.concat([c.id]);      
    this.render();
  },

  render: function() {
    rendered_content = '';
    _.each(this.text, function(i) {
      // Must be a node reference!
      if(i.length > 1) {
        rendered_content = rendered_content + TypeRanger.TextNodeStorage.get(i).render();
      }
      // Must be a character
      else { rendered_content = rendered_content + i; }
    });
    this.el.html(rendered_content);
    return this.el[0].outerHTML;
  }

});
