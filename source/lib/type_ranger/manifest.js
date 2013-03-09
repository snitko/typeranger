JSCLASS_PATH = ROOT + 'node_modules/jsclass/min';
TR_LIB_PATH  = ROOT + 'source/lib/type_ranger';

JS.Packages(function() { with(this) {

    TypeRanger = {};

    file(JSCLASS_PATH + '/core.js')
        .provides('JS.Module',
                  'JS.Class',
                  'JS.Kernel',
                  'JS.Singleton');

    file(ROOT + 'vendor/jquery-1.9.1.min.js')
        .provides('jQuery');

    file(ROOT + 'vendor/rangy-1.3alpha.772/rangy-core.js')
        .provides('rangy');

    file(ROOT + 'vendor/keymaster.min.js')
        .provides('key');

    file(TR_LIB_PATH + '/proxy.js')
      .provides('Proxy')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton');

    file(TR_LIB_PATH + '/element.js')
      .provides('TypeRanger.Element')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'Proxy');

    file(TR_LIB_PATH + '/key_dispatcher.js')
      .provides('TypeRanger.KeyDispatcher')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'key', 'TypeRanger.Element');

    file(TR_LIB_PATH + '/text_container.js')
      .provides('TypeRanger.TextContainer')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'TypeRanger.Element');

    file(TR_LIB_PATH + '/caret.js')
      .provides('TypeRanger.Caret')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'rangy', 'TypeRanger.Element');

    file(TR_LIB_PATH + '/base.js')
      .provides('TypeRanger.Base')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'rangy', 'TypeRanger.Caret', 'TypeRanger.KeyDispatcher', 'TypeRanger.TextContainer');

}});
