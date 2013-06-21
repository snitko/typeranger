TypeRanger.DebugLoggerView = new JS.Class(TypeRanger.View, {

  initialize: function() {
    // TODO: These settings should be passed as argument
    this.el             = $(".TypeRangerDebugLoggerView");          
    this.log_to_console = true;
  },

  // Updates only a specific part of the block related to the data
  // being fed to it. For example, if log data is coming from a class called Caret,
  // then only the "#typeranger-debug-Caret" element will be updated.
  render: function(stuff) {
    var el = this.el;
    _.each(_.pairs(stuff.data), function(property) {
      el.find("#typeranger-debug-" + stuff.class_name + '-' + property[0].replace(".", "-")).text(property[1]);
    });
    if(this.log_to_console) {
      console.log(stuff.class_name + "#" + stuff.method_name + ": " + JSON.stringify(stuff.data));
    }
  }

});
