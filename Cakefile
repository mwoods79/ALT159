{exec} = require 'child_process'

#task 'build', 'Build project from src/*.coffee to build/*.js', ->
#  exec 'coffee --compile --output ./ src/ALT159.coffee', (err, stdout, stderr) ->
#    throw err if err
#    console.log stdout + stderr

task 'print', 'Build project from src/*.coffee to build/*.js', ->
  exec 'coffee --compile --print src/ALT159.coffee', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'build', 'Build project from src/*.coffee to build/*.js', ->
  exec 'coffee --join ./src/ALT159.js --compile src/types src/ALT159', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr


