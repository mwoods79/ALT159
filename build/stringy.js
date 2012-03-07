(function() {
  var Stringy;

  Stringy = (function() {

    function Stringy() {}

    Stringy = function(obj) {
      return this.stringy = obj;
    };

    return Stringy;

  })();

  exports.Stringy = Stringy;

}).call(this);
