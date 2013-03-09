TypeRanger.KeyDispatcherSpec = JS.Test.describe(
'TypeRanger.KeyDispatcher', function() { with(this) {

    before(function() { with(this) {
      this.typeranger     = new TypeRanger.Base();
      this.key_dispatcher = typeranger.key_dispatcher;
    }});

    it('captures current input', function() { with(this) {
      expect(typeranger.text_container, 'push').given("a").exactly(1);
      key_dispatcher.input_container.val("a");
      key_dispatcher.input_container.trigger($.Event('change'));
    }});

}});
