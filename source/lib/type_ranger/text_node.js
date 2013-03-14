// Holds text along with its child nodes. Child nodes are
// referenced within the text with {{child_node_id}}
TypeRanger.TextNode = new JS.Class(TypeRanger.Element, {

  initialize: function(text, el, parent_id) {
    
    this.id = hex_md5((new Date().getTime()).toString() + Math.random().toString());
    TypeRanger.TextNodeStorage.push(this.id, this);
    
    this.parent_id = parent_id; 
    this.el        = el;
    this.text      = text;
  },

  push: function(t) {
    this.text = this.text + t;
    this.render();
  },

  push_child: function(c) {
    c.parent_id = this.id;
    this.text = this.text + '{{' + c.id + '}}';      
    this.render();
  },

  render: function() {
    var children_ids     = this.text.match(/\{\{(.*?)\}\}/g);
    var rendered_content = this.text;
    
    // Has children? Alright, render them too first!
    if(children_ids) {
      this.el.html(this.text);
      for(i=0; i < children_ids.length; i++) {
        var text_node_id = children_ids[i].replace(/\{\{(.*?)\}\}/, "$1");
        rendered_content = rendered_content.replace(children_ids[i],
                           TypeRanger.TextNodeStorage.get(text_node_id).render());
      }
    }
    
    this.el.html(rendered_content);
    return this.el[0].outerHTML;
  }

});
