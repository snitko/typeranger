JSCLASS_PATH = 'node_modules/jsclass/min';

JS.Packages(function() { with(this) {

    TypeRanger = {};

    file(JSCLASS_PATH + '/core.js')
        .provides('JS.Module',
                  'JS.Class',
                  'JS.Kernel',
                  'JS.Singleton');

    file('vendor/jquery-1.9.1.min.js')
        .provides('jQuery');

    file('vendor/rangy-1.3alpha.772/rangy-core.js')
        .provides('rangy');

    file('vendor/keymaster.min.js')
        .provides('key');

    file('lib/typeranger/element.js')
      .provides('TypeRanger.Element')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'jQuery');

    file('lib/typeranger/key_dispatcher.js')
      .provides('TypeRanger.KeyDispatcher')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'jQuery', 'TypeRanger.Element');

    file('lib/typeranger/text_container.js')
      .provides('TypeRanger.TextContainer')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'jQuery', 'TypeRanger.Element');

    file('lib/typeranger/caret.js')
      .provides('TypeRanger.Caret')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'jQuery', 'rangy', 'TypeRanger.Element');

    file('lib/typeranger/base.js')
      .provides('TypeRanger.Base')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'jQuery', 'rangy', 'key', 'TypeRanger.Caret', 'TypeRanger.KeyDispatcher', 'TypeRanger.TextContainer');

}});
