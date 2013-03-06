JS.Class.extend({

  // f1 is a name of the function to be called
  // f2 is a function to be passed to f1
  // subject is an object that will become _this_ inside f2
  call_with_self: function(subject, f1, f2) {
    //var self = this;                
    subject[f1].call(subject, f2);
  }

});
