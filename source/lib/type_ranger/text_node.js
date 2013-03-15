// Holds text along with its child nodes. Child nodes are
// referenced within the text with {{child_node_id}}
TypeRanger.TextNode = new JS.Class(TypeRanger.Element, {

  initialize: function(text, el, parent_id) {
    
    this.id = hex_md5((new Date().getTime()).toString() + Math.random().toString());
    TypeRanger.TextNodeStorage.push(this.id, this);
    
    this.parent_id = parent_id; 
    this.el        = el;

    // Contains an array with single characters and links to other nodes.
    // Links to other nodes are identified easily because they their length is more
    // than 1 character.
    this.objects = text.split('');
  },

  // Adds string or another node at the position specified in the second argument.
  // If second argument is null, then pushes to the end of the node.
  push: function(t, pos) {
    if(!pos) { pos = this.objects.length; }
    var before = this.objects.slice(0, pos);
    var after  = this.objects.slice(pos);
    if(typeof t == 'string') { t = t.split(''); }
    else                     { t = [t.id]; }
    this.objects  = before.concat(t).concat(after);
    this.render();
  },

  // Removes the object at the position specified in the argument.
  // If argument is null, then removes the last object in the #objects array.
  pop: function(pos, length) {
    if(!pos)    { pos    = this.objects.length-1; }
    if(!length) { length = 1; }
    this.objects.splice(pos, 1);
    this.render();
  },

  render: function() {
    rendered_content = '';
    _.each(this.objects, function(i) {
      // Must be a node reference!
      if(i.length > 1) {
        rendered_content = rendered_content + TypeRanger.TextNodeStorage.get(i).render();
      }
      // Must be a character!
      else { rendered_content = rendered_content + i; }
    });
    this.el.html(rendered_content);
    return this.el[0].outerHTML;
  }

});
