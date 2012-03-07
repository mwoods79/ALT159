(function() {
  var stringy;

  stringy = require('./stringy');

  window.ALT159 = window.f = (function(obj) {
    var ALT159;
    ALT159 = function(obj) {
      if (typeof obj === "string") return new Stringy(obj);
      if (obj === void 0) return new Lagniappe();
      return null;
    };
    return ALT159;
  })();

}).call(this);
