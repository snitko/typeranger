// Holds text along with its child nodes. Child nodes are
// referenced within the text with {{child_node_id}}
TypeRanger.TextNode = new JS.Class('TextNode', TypeRanger.Element, {

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
  // Returns the position at which a pushed line of text or a pushed node ends.
  push: function(t, pos) {
    if(!pos) { pos = this.objects.length; }
    var before = this.objects.slice(0, pos);
    var after  = this.objects.slice(pos);
    if(typeof t == 'string') { t = t.split(''); }
    else                     { t = [t.id]; }
    this.objects      = before.concat(t);
    var push_end_position = this.objects.length;
    this.objects  = this.objects.concat(after);
    this.render();
    return push_end_position;
  },

  // Removes the object at the position specified in the argument.
  // If argument is null, then removes the last object in the #objects array.
  pop: function(pos, length) {
    if(pos < 1) { return 0; }
    if(!pos)    { pos    = this.objects.length; }
    if(!length) { length = 1; }
    this.objects.splice(pos-1, 1);
    this.render();
    return pos-1;
  },

  // Returns the index of the last position within #objects array.
  // For example, if node has 10 characters in it, this method would return 9.
  last_pos_index: function() {
    return this.objects.length;     
  },

  // Responsible for rendering a DOM element (and all its children)
  // associated with this node; we call it from #push(), #pop() and all other
  // methods that change the node in some way.
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
    // update caret position
    return this.el[0].outerHTML;
  }

});

TypeRanger.TextNode.loggable({methods: ['pop', 'push'], properties: ['id', 'parent_id']});
