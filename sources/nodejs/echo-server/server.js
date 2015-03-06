// Generated by CoffeeScript 1.8.0
'use strict';
var DependencyResolver, GameProtocol, Logger, colors, log, net, resolver;

colors = require('colors');

DependencyResolver = require('./System/DependencyResolver');

Logger = require('./System/Logger');

log = new Logger;

resolver = new DependencyResolver(log);

global.resolver = resolver;

net = global.resolver.load('net', 'net');

GameProtocol = global.resolver.load('GameProtocol', 'Communication/GameProtocol');

global.resolver.load('Constants', 'System/Constants');

(function() {
  var server;
  server = net.createServer(function(socket) {
    var protocol;
    protocol = new GameProtocol(server, socket);
    return console.log('new client connected'.green);
  });
  log.message("\r\nserver version " + global.constants.VERSION + " listening on port: " + global.constants.PORT + "\r\n");
  return server.listen(global.constants.PORT, global.constants.HOST);
})();
