rules = {
  plural      : []
  singular    : []
  irregular   : []
  uncountable : []
}

inflect = {
  plural      : (matcher, suffix )-> rules.plural.push( [matcher, suffix] )
  singular    : (matcher, suffix )-> rules.singular.push( [matcher, suffix] )
  irregular   : (matcher, suffix )-> rules.irregular.push( [matcher, suffix] )
  uncountable : (words) -> rules.uncountable = words
}

# stollen shamelessly from rails source
inflect.plural(/$/, 's')
inflect.plural(/s$/i, 's')
inflect.plural(/^(ax|test)is$/i, '$1es')
inflect.plural(/(octop|vir)us$/i, '$1i')
inflect.plural(/(octop|vir)i$/i, '$1i')
inflect.plural(/(alias|status)$/i, '$1es')
inflect.plural(/(bu)s$/i, '$1ses')
inflect.plural(/(buffal|tomat)o$/i, '$1oes')
inflect.plural(/([ti])um$/i, '$1a')
inflect.plural(/([ti])a$/i, '$1a')
inflect.plural(/sis$/i, 'ses')
inflect.plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves')
inflect.plural(/(hive)$/i, '$1s')
inflect.plural(/([^aeiouy]|qu)y$/i, '$1ies')
inflect.plural(/(x|ch|ss|sh)$/i, '$1es')
inflect.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices')
inflect.plural(/(m|l)ouse$/i, '$1ice')
inflect.plural(/(m|l)ice$/i, '$1ice')
inflect.plural(/^(ox)$/i, '$1en')
inflect.plural(/^(oxen)$/i, '$1')
inflect.plural(/(quiz)$/i, '$1zes')
inflect.singular(/s$/i, '')
inflect.singular(/(ss)$/i, '$1')
inflect.singular(/(n)ews$/i, '$1ews')
inflect.singular(/([ti])a$/i, '$1um')
inflect.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i, '$1$2sis')
inflect.singular(/(^analy)(sis|ses)$/i, '$1sis')
inflect.singular(/([^f])ves$/i, '$1fe')
inflect.singular(/(hive)s$/i, '$1')
inflect.singular(/(tive)s$/i, '$1')
inflect.singular(/([lr])ves$/i, '$1f')
inflect.singular(/([^aeiouy]|qu)ies$/i, '$1y')
inflect.singular(/(s)eries$/i, '$1eries')
inflect.singular(/(m)ovies$/i, '$1ovie')
inflect.singular(/(x|ch|ss|sh)es$/i, '$1')
inflect.singular(/(m|l)ice$/i, '$1ouse')
inflect.singular(/(bus)(es)?$/i, '$1')
inflect.singular(/(o)es$/i, '$1')
inflect.singular(/(shoe)s$/i, '$1')
inflect.singular(/(cris|test)(is|es)$/i, '$1is')
inflect.singular(/^(a)x[ie]s$/i, '$1xis')
inflect.singular(/(octop|vir)(us|i)$/i, '$1us')
inflect.singular(/(alias|status)(es)?$/i, '$1')
inflect.singular(/^(ox)en/i, '$1')
inflect.singular(/(vert|ind)ices$/i, '$1ex')
inflect.singular(/(matr)ices$/i, '$1ix')
inflect.singular(/(quiz)zes$/i, '$1')
inflect.singular(/(database)s$/i, '$1')
inflect.irregular('person', 'people')
inflect.irregular('man', 'men')
inflect.irregular('woman', 'women')
inflect.irregular('child', 'children')
inflect.irregular('sex', 'sexes')
inflect.irregular('move', 'moves')
inflect.irregular('cow', 'kine')
inflect.irregular('zombie', 'zombies')
inflect.uncountable(['equipment','information','rice','money','species','series','fish','sheep','jeans','bacon'])


#add all of Stringys functions onto a new String
chainable = (str) ->
  str = new String(str)
  addFunction = (obj, func, key) ->
    obj[key] = ->
      func.apply
        value: this.toString()
      , arguments
  for key of Stringy::
    addFunction str, Stringy::[key], key  #unless str[key]
  str.end = -> this.toString()
  str


Stringy = (obj) ->
  @value = obj

Stringy:: = 
  capitalize: -> 
    return @value if(@value is '')
    lowerCased = @value.toLowerCase()
    word = lowerCased[0].toUpperCase() + lowerCased.substring(1)
    chainable(word)

  # Returns only the numbers out of a string
  numbers: ->
    parseFloat(@value.replace(/[^0-9.-]+/g, ""))

  underscore: ->
    underscored = []
    for ch of @value.split("")
      underscored.push "_"  if ch isnt 0 and @value[ch].match(/[A-Z|\s]/)
      underscored.push @value[ch].toLowerCase()  unless @value[ch].match(/\s/)
    underscored = underscored.join ""
    chainable underscored.replace(/^_?/,"")

  camel: ->
    #f(f(@value).underscore()).titleize().replace(RegExp(" ","g"), "")
    chainable f(@value).underscore().titleize().replace(RegExp(" ","g"), "")

  humanize: ->
    humanized = []
    for ch of @value.split("")
      humanized.push "_"  if ch isnt 0 and @value[ch].match(/[A-Z]/)
      humanized.push @value[ch]  unless @value[ch].match(/\-/)
    humanized = humanized.join("").split("_")
    humanized[0] = f(humanized[0]).capitalize()
    chainable humanized.join(" ").trim()

  pluralize: ->
    return chainable @value if rules.uncountable.indexOf(@value) > 0
    i = rules.irregular.length
    while i > 0
      r = rules.irregular[i - 1]
      return chainable r[1]  if @value is r[0]
      i--
    i = rules.plural.length
    while i > 0
      r = rules.plural[i - 1]
      return chainable @value.replace(r[0], r[1])  if @value.match(r[0])
      i--

  singularize: ->
    return chainable @value  if rules.uncountable.indexOf(@value) > 0
    i = rules.irregular.length
    while i > 0
      r = rules.irregular[i - 1]
      return chainable r[0] if @value is r[1]
      i--
    i = rules.singular.length
    while i > 0
      r = rules.singular[i - 1]
      return chainable @value.replace(r[0], r[1])  if @value.match(r[0])
      i--

  money: (options) ->
    options or (options = {})
    defaults =
      precision: 2
      symbol: "$"
      dot: "."
      seperator: ","
      default: "-"
    for prop of defaults
      (options[prop] isnt undefined) or (options[prop] = defaults[prop])
    unless @value
      chainable options.defaults 
    else
      val = parseFloat(@value)
      sign = (if val < 0 then "-" else "")
      i = parseInt(val = Math.abs(+val or 0).toFixed(options.precision)) + ""
      j = (if (j = i.length) > 3 then j % 3 else 0)
      first = (sign + options.symbol + (if j then i.substr(0, j) + options.seperator else ""))
      middle = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + options.seperator)
      last = (if options.precision then options.dot + Math.abs(val - i).toFixed(options.precision).slice(2) else "")
      chainable( first + middle + last )

  number: (opts) ->
    opts = opts or {}
    opts.symbol = ""
    chainable( f(@value).money opts )

  titleize: ->
    parts = @value.split RegExp('[ _]')
    parts = (f(word).capitalize() for word in parts)
    chainable parts.join " "

  isBlank: ->
    clean = @value || ""
    clean = clean.replace RegExp(' ','g'), ""
    clean is ""

  truncate: (amount, tail="...")->
    parts = []
    parts = (str for str in @value when _i < amount)
    chainable parts.join("") + tail



