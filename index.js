#!/usr/bin/env node

var net = require('net')
var websocket = require('websocket-stream')
var minimist = require('minimist')
var pump = require('pump')

var argv = minimist(process.argv.slice(2), {
  alias: {
    from: 'f',
    to: 't'
  }
})

if (!argv.from || !argv.to) {
  console.error('Usage: ws-to-tcp --from [ws-port] --to [tcp-port]')
  process.exit(1)
}

websocket.createServer({port: argv.from}, handle)

function handle (stream) {
  pump(stream, net.connect(argv.to), stream)
}
