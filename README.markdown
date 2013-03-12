Typeranger
============================

A framework to create custom text editors for the web.

*Problem*: if you want to create a browser-based custom rich/programming text editor you're doomed to countless hours of doing things from scratch, fighting DOM and implementing basic features.

*Solution*: Typeranger is an attempt to provide the basic functionality: caret movement, correct handling of dom-nodes inside the editor block, keyboard shortcuts, mouse events and various other things. This basic functionality can then be used as a framework and extended to produce a custom text editor, that behaves exactly the way you want it to. It abstracts browser API and provides a set of classes that you can inherit from.

This is a work in progress at an early stage. This project employs the following libraries so far: [JS.Class](http://jsclass.jcoglan.com/), [keymaster.js](https://github.com/madrobby/keymaster), [rangy](https://code.google.com/p/rangy/).
