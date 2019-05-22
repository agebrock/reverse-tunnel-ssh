var Client = require('ssh2').Client;
var Socket = require('net').Socket;
var debug = require('debug')('reverse-tunnel-ssh');

var createConfig = require('./lib/config');

function createClient(rawConfig, callback) {
  var config = createConfig(rawConfig);
  var remoteHost = config.dstHost;
  var remotePort = config.dstPort;
  var srcHost = config.srcHost;
  var srcPort = config.srcPort;

  var conn = new Client();
  var errors = [];

  conn.on('ready', function() {
    debug('ready');
    conn.forwardIn(remoteHost, remotePort, function(err, port) {
      if (err) {
        errors.push(err);
        conn.emit('error', err);
      }
      conn.emit('forward-in', port);
    });
  });

  conn.on('tcp connection', function(info, accept, reject) {
    var remote;
    var srcSocket = new Socket();

    debug('tcp connection', info);
    srcSocket.on('error', function(err) {
      errors.push(err);
      if (remote === undefined) {
        reject();
      } else {
        remote.end();
      }
    });

    srcSocket.connect(srcPort, srcHost, function() {
      remote = accept();
      debug('accept remote connection');
      srcSocket.pipe(remote).pipe(srcSocket);
      if (errors.length === 0) {
        callback(null, conn);
      } else {
        callback(errors, null);
      }
    });

  });
  conn.connect(config);
  return conn;
}

module.exports = createClient;
