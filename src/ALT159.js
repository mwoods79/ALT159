/*
   Copyright (c) 2012 Micah Woods

   Permission is hereby granted, free of charge, to any person obtaining a copy of
   this software and associated documentation files (the "Software"), to deal in
   the Software without restriction, including without limitation the rights to
   use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
   of the Software, and to permit persons to whom the Software is furnished to do
   so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
   FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
   COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
   IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
   CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */

ALT159 = \u0192 = f = (function(obj) {

  var Stringy = function(obj) {
    this.stringy = obj;
  };

  Stringy.prototype = {

    capitalize: function () {
      var lowerCased = this.stringy.toLowerCase();
      var word = lowerCased[0].toUpperCase() + lowerCased.substring(1);
      return word;
    }

    // Returns only the numbers out of a string
  , numbers: function () {
      var n = parseFloat(this.stringy.replace(/[^0-9.-]+/g, ""));
      return isNaN(n) ? null: n;
    }

    // C style format method
  , format: function () {
      var formatted = this.stringy;
      for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
      }
      return formatted;
    }

  , underscore: function () {
     var underscored = [];
     for (var ch in this.stringy.split('')){
       if (ch != 0 && this.stringy[ch].match(/[A-Z|\s]/)){
         underscored.push('_');
       }
       if(!this.stringy[ch].match(/\s/)){
         underscored.push(this.stringy[ch].toLowerCase());
       }
     }
     return underscored.join('');
    }

  , humanize: function () {
      var humanized = [];
      for (var ch in this.stringy.split('')){
        if (ch != 0 && this.stringy[ch].match(/[A-Z]/)){
          humanized.push('_');
        }
        if (!this.stringy[ch].match(/\-/)) {
          humanized.push(this.stringy[ch]);
        }
      }
      humanized = humanized.join('').split('_');
      humanized[0] = f(humanized[0]).capitalize();
      return humanized.join(' ');
    }

  };

  var ALT159 = function(obj) {
    if (typeof obj === "string") {
      return new Stringy(obj);
    }
  }

  return ALT159;

})();

