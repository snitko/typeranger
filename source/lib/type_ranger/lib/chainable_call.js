_ = _.extend(_, {

  chain_call: function(obj, properties) {
    var property_chain = properties.split(".");
    var result = obj;
    _.each(property_chain, function(next_property) {
      result = result[next_property];
    });
    return result;
  }

});
