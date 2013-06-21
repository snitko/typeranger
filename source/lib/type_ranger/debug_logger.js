// Allows various classes to log all sorts of stuff.
// Keeps track of that stuff and prints it to a corresponsind view.
TypeRanger.DebugLogger = new JS.Singleton('DebugLogger', TypeRanger.Element, {

  // Most important method. Recieves data, sorts it and stores it.
  // Expects stuff to be an object of the following format:
  // { class_name: Something, method: method_name, data {} }
  log: function(stuff) {
    this.view.render(stuff);
  },

  // TODO: stores debug info somewhere (memory, localstorage?) for later inspection
  store: function(stuff) {},

  // TODO: retrieves n last records from the storage
  tail: function(no_of_records) {}

});

TypeRanger.DebugLogger.view = new TypeRanger.DebugLoggerView();
