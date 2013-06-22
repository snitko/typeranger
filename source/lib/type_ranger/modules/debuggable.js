// Helps TypeRanger classes manage their logging by providing them with #debug_log() method
// that works with TypeRanger.DebugLogger and feeds it object properties pre-defined
// in this.loggable_properties_names.
//
// To properly use this mixin, check out the docs for .loggable class method.
TypeRanger.Debuggable = new JS.Module({

  // You can use method directly, however it is preferred that you use
  // .loggable class method on you class to specify which methods perform
  // the logging on which properties.
  debug_log: function(method_name, properties) { // method_name is optional

    var loggable_properties = {};
    if(properties) {
      self = this;
      _.each(properties, function(n) {
        loggable_properties[n] = _.chain_call(self, n);
      });
    }
               
    TypeRanger.DebugLogger.log({
      class_name:  this.klass.displayName,
      method_name: method_name,
      data:        loggable_properties
    });       
  },

  extend: {

    included: function(klass) {
  
      // So what the hell this scary piece of code does, you ask?
      // It creates a simple callback method which is called #loggable.
      // You can call this method on a class that you wish logged what objects of this class do.
      // It takes an object as an argument, which must have 2 keys: 'methods' and 'properties'.
      //   - 'methods' defines which methods call the #debug_log() method after the finish;
      //   - 'properties' defines which properties are logged in #debug_log();
      // Both keys take an array of strings for values.
      //
      // Usage example:
      //
      //    TypeRanger.Caret.loggable({
      //      methods:    ['update_position'],
      //      properties: ["pos", "node.id"]
      //    });
      klass.extend({
        loggable: function(options) {

          var debuggable_class = this;
          _.each(options.methods, function(m) {
            var old_method = debuggable_class[m];
            var alias      = {}; alias["_no_debug_log_" + m] = m; 
            debuggable_class.alias(alias);
            debuggable_class.define(m, function() {
              var result = this["_no_debug_log_"+m].apply(this, arguments);
              this.debug_log(m, options.properties);
              return result;
            });
          });

        }
      });

    }
          
  }


});
