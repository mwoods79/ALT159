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




Stringy = (obj) ->
  @stringy = obj

Stringy:: = 
  capitalize: -> 
    return @stringy if(@stringy is '')
    lowerCased = @stringy.toLowerCase()
    word = lowerCased[0].toUpperCase() + lowerCased.substring(1)
    return word

  # Returns only the numbers out of a string
  numbers: ->
    parseFloat(@stringy.replace(/[^0-9.-]+/g, ""))
    #return isNaN(n) ? null : n

  underscore: ->
    underscored = []
    for ch of @stringy.split("")
      underscored.push "_"  if ch isnt 0 and @stringy[ch].match(/[A-Z|\s]/)
      underscored.push @stringy[ch].toLowerCase()  unless @stringy[ch].match(/\s/)
    underscored = underscored.join ""
    underscored.replace(/^_?/,"")

  humanize: ->
    humanized = []
    for ch of @stringy.split("")
      humanized.push "_"  if ch isnt 0 and @stringy[ch].match(/[A-Z]/)
      humanized.push @stringy[ch]  unless @stringy[ch].match(/\-/)
    humanized = humanized.join("").split("_")
    humanized[0] = f(humanized[0]).capitalize()
    humanized.join(" ").trim()

  pluralize: ->
    return @stringy  if rules.uncountable.indexOf(@stringy) > 0
    i = rules.irregular.length
    while i > 0
      r = rules.irregular[i - 1]
      return r[1]  if @stringy is r[0]
      i--
    i = rules.plural.length
    while i > 0
      r = rules.plural[i - 1]
      return @stringy.replace(r[0], r[1])  if @stringy.match(r[0])
      i--

  singularize: ->
    return @stringy  if rules.uncountable.indexOf(@stringy) > 0
    i = rules.irregular.length
    while i > 0
      r = rules.irregular[i - 1]
      return r[0]  if @stringy is r[1]
      i--
    i = rules.singular.length
    while i > 0
      r = rules.singular[i - 1]
      return @stringy.replace(r[0], r[1])  if @stringy.match(r[0])
      i--

  titleize: ->
    #cap = (x) -> 
    #  f(x).capitalize
    #cap x for x in (@stringy.split(/ /))
    #@stringy.split(/ /).each( (x)-> f(x)  ).join(" ")