//require('../node_modules/jsdom/lib/jsdom');

//var jsdom = require("jsdom").jsdom;

//JS.ENV.window = jsdom().createWindow()
//JS.ENV.document = JS.DOM.window.document;
//JS.ENV.key = {};

JS.Packages(function() { with(this) {
  autoload(/^(.*)Spec$/, {from: ROOT + 'test/lib', require: '$1'});
}});

JS.require("TypeRanger.Base", "JS.Test", function() {
  TR = new TypeRanger.Base();
  JS.require(
    'TypeRanger.KeyDispatcherSpec',
    'TypeRanger.TextNodeSpec',
    'TypeRanger.CaretSpec',
    JS.Test.method('autorun')
  );
});

//JS.require('JS.Test', function() {});
