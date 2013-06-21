// Helps TypeRanger classes manage their logging by providing them with #debug_log() method
// that works with TypeRanger.DebugLogger and feeds it object properties pre-defined
// in this.loggable_properties_names.
TypeRanger.Debuggable = new JS.Module({

  debug_log: function(method_name) { // method_name is optional

    var loggable_properties = {};
    if(this.loggable_properties_names) {
      self = this;
      _.each(this.loggable_properties_names, function(n) {
        loggable_properties[n] = _.chain_call(self, n);
      });
    }
               
    TypeRanger.DebugLogger.log({
      class_name:  this.klass.displayName,
      method_name: method_name,
      data:        loggable_properties
    });       
  }
  

});
