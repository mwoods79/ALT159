(function() {
  var ALT159, f;

  (ALT159 = f = function(obj) {
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
        var n, _ref;
        n = parseFloat(this.stringy.replace(/[^0-9.-]+/g, ""));
        return (_ref = isNaN(n)) != null ? _ref : {
          "null": n
        };
      },
      underscore: function() {
        var char, underscored, _i, _len, _ref;
        underscored = [];
        _ref = this.stringy.split('');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          char = _ref[_i];
          if (char.match(/[A-Z|\s]/)) underscored.push('_');
          if (!char.match(/\s/)) underscored.push(char.toLowerCase());
        }
        return underscored.join('').gsub(/^_/, '');
      },
      humanize: function() {
        var char, humanized, _i, _len, _ref;
        humanized = [];
        _ref = this.stringy.split('');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          char = _ref[_i];
          if (char.match(/[A-Z|]/)) humanized.push('_');
          if (!char.match(/\-/)) humanized.push(char);
        }
        humanized = humanized.join('').split('_').gsub(/^_/, '');
        humanized[0] = f(humanized[0]).capitalize();
        return humanized.join(' ');
      },
      pluralize: function() {
        return this.__toggle_plural_singular(0, 1);
      },
      singularize: function() {
        return this.__toggle_plural_singular(1, 0);
      },
      __toggle_plural_singular: function(first, second) {
        var rule, _i, _j, _len, _len2, _ref, _ref2;
        if (rules.uncountable.indexOf(this.stringy) > 0) return this.stringy;
        _ref = rules.irregular.reverse();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          if (this.stringy === rule[first]) return rules[second];
        }
        _ref2 = rules.pluralize.reverse();
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          rule = _ref2[_j];
          if (this.stringy.match(rule[first])) {
            return this.stringy.replace(rules[first], rules[second]);
          }
        }
      },
      money: function(options) {
        var defaults, field, value, _len;
        if (options == null) options = {};
        defaults = {
          precision: 2,
          symbol: '$',
          dot: '.',
          seperator: ',',
          "default": '-'
        };
        for (value = 0, _len = defaults.length; value < _len; value++) {
          field = defaults[value];
          if (options[field] === void 0) options[field] = value;
        }
        if (!this.stringy) return options["default"];
      },
      number: function(opts) {
        opts = opts || {};
        opts.symbol = "";
        return f(this.stringy).money(opts);
      }
    };
    ALT159 = function(obj) {
      if (typeof obj === "string") return new Stringy(obj);
      return null;
    };
    return ALT159;
  })();

}).call(this);
