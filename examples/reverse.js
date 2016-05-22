var tunnel = require('reverse-tunnel-ssh');


// This is a very handy way to test your next webhook !

// Please set up your /etc/hosts or change the hostname befor
// running the example.


var config = {
  host: 'tunneltest.com',
  username: 'root',
  dstHost: '0.0.0.0', // bind to all interfaces (see hint in the readme)
  dstPort: 8000,
  //srcHost: '127.0.0.1', // default
  //srcPort: dstPort // default is the same as dstPort
}
tunnel(config, function(error, clientConnection) {
  console.log(clientConnection._forwarding);
});

require('http').createServer(function(res, res){
  res.end('SSH-TUNNEL: Gate to heaven !');
}).listen(config.dstPort);

console.log('Tunnel created: http://'+config.host+':'+config.dstPort);
