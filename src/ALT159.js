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

   
    var rules = {
      plural      : [],
      singular    : [],
      irregular   : [],
      uncountable : []
    };

    var inflect = {
      plural      : function(matcher, suffix){ rules.plural.push( [matcher, suffix] ) },
      singular    : function(matcher, suffix){ rules.singular.push( [matcher, suffix] ) },
      irregular   : function(matcher, suffix){ rules.irregular.push( [matcher, suffix] ) },
      uncountable : function(words){ rules.uncountable = words }
    };

    //stollen shamelessly from rails source
    inflect.plural(/$/, 's');
    inflect.plural(/s$/i, 's');
    inflect.plural(/^(ax|test)is$/i, '$1es');
    inflect.plural(/(octop|vir)us$/i, '$1i');
    inflect.plural(/(octop|vir)i$/i, '$1i');
    inflect.plural(/(alias|status)$/i, '$1es');
    inflect.plural(/(bu)s$/i, '$1ses');
    inflect.plural(/(buffal|tomat)o$/i, '$1oes');
    inflect.plural(/([ti])um$/i, '$1a');
    inflect.plural(/([ti])a$/i, '$1a');
    inflect.plural(/sis$/i, 'ses');
    inflect.plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves');
    inflect.plural(/(hive)$/i, '$1s');
    inflect.plural(/([^aeiouy]|qu)y$/i, '$1ies');
    inflect.plural(/(x|ch|ss|sh)$/i, '$1es');
    inflect.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');
    inflect.plural(/(m|l)ouse$/i, '$1ice');
    inflect.plural(/(m|l)ice$/i, '$1ice');
    inflect.plural(/^(ox)$/i, '$1en');
    inflect.plural(/^(oxen)$/i, '$1');
    inflect.plural(/(quiz)$/i, '$1zes');
    inflect.singular(/s$/i, '');
    inflect.singular(/(ss)$/i, '$1');
    inflect.singular(/(n)ews$/i, '$1ews');
    inflect.singular(/([ti])a$/i, '$1um');
    inflect.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i, '$1$2sis');
    inflect.singular(/(^analy)(sis|ses)$/i, '$1sis');
    inflect.singular(/([^f])ves$/i, '$1fe');
    inflect.singular(/(hive)s$/i, '$1');
    inflect.singular(/(tive)s$/i, '$1');
    inflect.singular(/([lr])ves$/i, '$1f');
    inflect.singular(/([^aeiouy]|qu)ies$/i, '$1y');
    inflect.singular(/(s)eries$/i, '$1eries');
    inflect.singular(/(m)ovies$/i, '$1ovie');
    inflect.singular(/(x|ch|ss|sh)es$/i, '$1');
    inflect.singular(/(m|l)ice$/i, '$1ouse');
    inflect.singular(/(bus)(es)?$/i, '$1');
    inflect.singular(/(o)es$/i, '$1');
    inflect.singular(/(shoe)s$/i, '$1');
    inflect.singular(/(cris|test)(is|es)$/i, '$1is');
    inflect.singular(/^(a)x[ie]s$/i, '$1xis');
    inflect.singular(/(octop|vir)(us|i)$/i, '$1us');
    inflect.singular(/(alias|status)(es)?$/i, '$1');
    inflect.singular(/^(ox)en/i, '$1');
    inflect.singular(/(vert|ind)ices$/i, '$1ex');
    inflect.singular(/(matr)ices$/i, '$1ix');
    inflect.singular(/(quiz)zes$/i, '$1');
    inflect.singular(/(database)s$/i, '$1');
    inflect.irregular('person', 'people');
    inflect.irregular('man', 'men');
    inflect.irregular('woman', 'women');
    inflect.irregular('child', 'children');
    inflect.irregular('sex', 'sexes');
    inflect.irregular('move', 'moves');
    inflect.irregular('cow', 'kine');
    inflect.irregular('zombie', 'zombies');
    inflect.uncountable(['equipment','information','rice','money','species','series','fish','sheep','jeans','bacon']);
  
  
  
  
  var Stringy = function(obj) {
    this.stringy = obj;
  };


  Stringy.prototype = {

    capitalize: function () {
      if(this.stringy === '')return this.stringy;
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

  , pluralize: function() {
      //irregular Words
      if( rules.uncountable.indexOf(this.stringy) > 0) return this.stringy;
      //irregular Words
      for (var i = rules.irregular.length; i > 0; i--) {
        var r = rules.irregular[i - 1];
        if(this.stringy == r[0] ) return r[1];
      }
      //Normal Words
      for (var i = rules.plural.length; i > 0; i--) {
        var r = rules.plural[i - 1];
        if(this.stringy.match(r[0]) ) return this.stringy.replace(r[0],r[1]);
      }
    }


  , singularize: function() {
      //irregular Words
      if( rules.uncountable.indexOf(this.stringy) > 0) return this.stringy;
      //irregular Words
      for (var i = rules.irregular.length; i > 0; i--) {
        var r = rules.irregular[i - 1];
        if(this.stringy == r[1] ) return r[0];
      }
      //Normal Words
      for (var i = rules.singular.length; i > 0; i--) {
        var r = rules.singular[i - 1];
        if(this.stringy.match(r[0]) ) return this.stringy.replace(r[0],r[1]);
      }
    }


  };

  var Lagniappe = function(obj) {
  };

  Lagniappe.prototype = {
    reloadStylesheets: function() {
      var queryString = '?reload=' + new Date().getTime();
      var links = document.getElementsByTagName("link");
      for (var i = links.length; i > 0; i--) 
        if(links[i] && links[i].ref === "stylesheet")
          links[i].href = links[i].href.replace(/\?.*|$/, queryString);
    },

    extendPrototypes: function() {
      var addFunction = function(obj, func, key){
        obj.prototype[key] = function(){
          return func.apply( {stringy: this }, arguments );  
        };
      }
      var unnicer  = function(obj, to_add){
        for( var key in to_add.prototype)
          if( !obj.prototype[key] )
            addFunction(obj, to_add.prototype[key], key );
      };
      unnicer(String, Stringy);
    },
  };

  var ALT159 = function(obj) {
    if(typeof obj === "string") return new Stringy(obj);
    if(obj === void 0) return new Lagniappe();
    return null;
  }

  return ALT159;

})();

