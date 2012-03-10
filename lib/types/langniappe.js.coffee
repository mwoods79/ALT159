Lagniappe = ->

Lagniappe:: =

  extendPrototypes: ->
    addFunction = (obj, func, key) ->
      obj::[key] = ->
        func.apply
          value: this
        , arguments
    unnicer = (obj, to_add) ->
      for key of to_add::
        addFunction obj, to_add::[key], key  unless obj::[key]
    unnicer String, Stringy
    unnicer Number, Numbery

  #Adds ALT159 functions to this Instance of an object
  chain: (value, type) ->
    f().extendPrototypes()
    value

  reloadStylesheets: ->
    queryString = "?reload=" + new Date().getTime()
    links = document.getElementsByTagName("link")
    i = 0
    while i < links.length
      links[i].href = links[i].href.replace(/\?.*|$/, queryString)  if links[i] and links[i].ref is "stylesheet"
      i++
    true
