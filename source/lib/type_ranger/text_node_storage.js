TypeRanger.TextNodeStorage = new JS.Singleton('TextNodeStorage', {
  
  initialize: function() {
    this.nodes = {};            
  },

  get: function(id) {
    return this.nodes[id];
  },

  push: function(id, node) {
    this.nodes[id] = node;
  }

});
