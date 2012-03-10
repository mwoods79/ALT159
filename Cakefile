{exec} = require 'child_process'

task 'print', 'Build project from lib/*.coffee to build/*.js', ->
  exec 'coffee --compile --print lib/ALT159.js.coffee', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'build', 'Build project from src/*.coffee to build/*.js', ->
  exec 'coffee --join bin/ALT159.js --compile lib/types lib', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr


