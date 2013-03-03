TypeRanger.Cursor = new JS.Singleton({

  move_to_end_of_selection: function(s,r) {
    var empty_node = document.createTextNode('NODE');
    var cr = r.cloneRange();
    cr.collapse(false);
    cr.insertNode(empty_node);
    cr.detach();
    r.setStartAfter(empty_node);
    r.setEndAfter(empty_node);
    s.removeAllRanges();
    s.addRange(r);
  }

});
