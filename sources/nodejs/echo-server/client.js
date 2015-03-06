// Generated by CoffeeScript 1.8.0
'use strict';
var DependencyResolver, GameProtocol, Logger, SecurityProtocol, colors, log, net, resolver, sys;

colors = require('colors');

DependencyResolver = require('./System/DependencyResolver');

Logger = require('./System/Logger');

log = new Logger;

resolver = new DependencyResolver(log);

global.resolver = resolver;

sys = global.resolver.load('sys', 'sys');

net = global.resolver.load('net', 'net');

GameProtocol = global.resolver.load('GameProtocol', 'Communication/GameProtocol');

global.resolver.load('Constants', 'System/Constants');

SecurityProtocol = global.resolver.load('SecurityProtocol', 'Communication/SecurityProtocol');

(function() {
  var client, security, stdin;
  stdin = process.openStdin();
  client = new net.Socket;
  security = new SecurityProtocol(null, null);
  client.connect(global.constants.PORT, global.constants.HOST, function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
    return stdin.addListener('data', function(data) {
      var encryptedData;
      data = (data.toString('utf-8')).trim();
      if ((data != null) && data === 'exit') {
        client.destroy();
        return stdin.destroy();
      } else {
        encryptedData = security.encrypt(data);
        return client.write(encryptedData);
      }
    });
  });
  client.on('data', (function(_this) {
    return function(data) {
      var decryptedData;
      data = (data.toString('utf-8')).trim();
      decryptedData = security.decrypt(data);
      return console.log("Received: " + decryptedData);
    };
  })(this));
  return client.on('close', function() {
    return console.log('Connection closed');
  });
})();
