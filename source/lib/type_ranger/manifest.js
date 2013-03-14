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

    file(ROOT + 'vendor/keymaster.js')
        .provides('key');

    file(ROOT + 'vendor/md5.js')
        .provides('hex_md5');

    file(TR_LIB_PATH + '/proxy.js')
      .provides('Proxy')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton');

    file(TR_LIB_PATH + '/element.js')
      .provides('TypeRanger.Element')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'Proxy', 'jQuery');

    file(TR_LIB_PATH + '/views/view.js')
      .provides('TypeRanger.View')
      .requires('JS.Module', 'JS.Class', 'JS.Kernel', 'JS.Singleton', 'Proxy', 'jQuery');

    file(TR_LIB_PATH + '/key_dispatcher.js')
      .provides('TypeRanger.KeyDispatcher')
      .requires('key', 'TypeRanger.Element');

    file(TR_LIB_PATH + '/text_node_storage.js')
      .provides('TypeRanger.TextNodeStorage')

    file(TR_LIB_PATH + '/text_node.js')
      .provides('TypeRanger.TextNode')
      .requires('TypeRanger.Element', 'TypeRanger.TextNodeStorage', 'hex_md5');

    file(TR_LIB_PATH + '/text_container.js')
      .provides('TypeRanger.TextContainer')
      .requires('TypeRanger.Element', 'TypeRanger.TextNode');

    file(TR_LIB_PATH + '/views/caret_view.js')
      .provides('TypeRanger.CaretView')
      .requires('TypeRanger.View');
    file(TR_LIB_PATH + '/caret.js')
      .provides('TypeRanger.Caret')
      .requires('TypeRanger.Element', 'TypeRanger.CaretView');

    file(TR_LIB_PATH + '/base.js')
      .provides('TypeRanger.Base')
      .requires('TypeRanger.Caret', 'TypeRanger.KeyDispatcher', 'TypeRanger.TextContainer');

}});
