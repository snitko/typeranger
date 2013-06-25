// Contains a #proxy() method which is similar to jQuery.proxy,
// bu unlike it, doesn't break mock expectations in JS.Test
Proxy = new JS.Module({

  proxy: function(f, args) {
    var self = this;
    return function() { f.call(self, args); }    
  }

});
