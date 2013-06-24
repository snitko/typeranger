_ = _.extend(_, {

  foldedProp: function(obj, property_chain) {
    var properties = property_chain.split(".");
    var result = obj;
    for (i in properties) {
      result = result[properties[i]];
      if(_.isUndefined(result)) { return result; };
    };
    return result;
  }

});
