(function() {
  var Stringy, inflect, rules;

  rules = {
    plural: [],
    singular: [],
    irregular: [],
    uncountable: []
  };

  inflect = {
    plural: function(matcher, suffix) {
      return rules.plural.push([matcher, suffix]);
    },
    singular: function(matcher, suffix) {
      return rules.singular.push([matcher, suffix]);
    },
    irregular: function(matcher, suffix) {
      return rules.irregular.push([matcher, suffix]);
    },
    uncountable: function(words) {
      return rules.uncountable = words;
    }
  };

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

  inflect.uncountable(['equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'jeans', 'bacon']);

  Stringy = function(obj) {
    return this.stringy = obj;
  };

  Stringy.prototype = {
    capitalize: function() {
      var lowerCased, word;
      if (this.stringy === '') return this.stringy;
      lowerCased = this.stringy.toLowerCase();
      word = lowerCased[0].toUpperCase() + lowerCased.substring(1);
      return word;
    },
    numbers: function() {
      return parseFloat(this.stringy.replace(/[^0-9.-]+/g, ""));
    },
    underscore: function() {
      var ch, underscored;
      underscored = [];
      for (ch in this.stringy.split("")) {
        if (ch !== 0 && this.stringy[ch].match(/[A-Z|\s]/)) underscored.push("_");
        if (!this.stringy[ch].match(/\s/)) {
          underscored.push(this.stringy[ch].toLowerCase());
        }
      }
      underscored = underscored.join("");
      return underscored.replace(/^_?/, "");
    },
    humanize: function() {
      var ch, humanized;
      humanized = [];
      for (ch in this.stringy.split("")) {
        if (ch !== 0 && this.stringy[ch].match(/[A-Z]/)) humanized.push("_");
        if (!this.stringy[ch].match(/\-/)) humanized.push(this.stringy[ch]);
      }
      humanized = humanized.join("").split("_");
      humanized[0] = f(humanized[0]).capitalize();
      return humanized.join(" ").trim();
    },
    pluralize: function() {
      var i, r;
      if (rules.uncountable.indexOf(this.stringy) > 0) return this.stringy;
      i = rules.irregular.length;
      while (i > 0) {
        r = rules.irregular[i - 1];
        if (this.stringy === r[0]) return r[1];
        i--;
      }
      i = rules.plural.length;
      while (i > 0) {
        r = rules.plural[i - 1];
        if (this.stringy.match(r[0])) return this.stringy.replace(r[0], r[1]);
        i--;
      }
    },
    singularize: function() {
      var i, r;
      if (rules.uncountable.indexOf(this.stringy) > 0) return this.stringy;
      i = rules.irregular.length;
      while (i > 0) {
        r = rules.irregular[i - 1];
        if (this.stringy === r[1]) return r[0];
        i--;
      }
      i = rules.singular.length;
      while (i > 0) {
        r = rules.singular[i - 1];
        if (this.stringy.match(r[0])) return this.stringy.replace(r[0], r[1]);
        i--;
      }
    },
    titleize: function() {}
  };

  window.ALT159 = window.f = (function(obj) {
    var ALT159;
    ALT159 = function(obj) {
      if (typeof obj === "string") return new Stringy(obj);
      return null;
    };
    return ALT159;
  })();

}).call(this);
