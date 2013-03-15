TypeRanger.KeyDispatcherSpec = JS.Test.describe(
'TypeRanger.KeyDispatcher', function() { with(this) {

    before(function() { with(this) {
      this.key_dispatcher = TR.key_dispatcher;
    }});

    it('captures current input', function() { with(this) {
      expect(TR.text_container, 'push').given("a").exactly(1);
      key_dispatcher.input_container.val("a");
      key_dispatcher.input_container.trigger($.Event('change'));
    }});

    it('invokes custom callback when a special key is pressed', function() { with(this) {
      // We'll just check one key event here, the one for Backspace
      // becayse keymaster.js handles special_keys this and we don't really have to test each
      // special key.
      expect(TR.text_container, 'pop').exactly(1);
      expect(TR.text_container, 'push').exactly(0);
      key.triggerKey('backspace');
    }});

}});
