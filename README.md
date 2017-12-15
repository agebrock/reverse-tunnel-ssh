# reverse-tunnel-ssh
Easy ssh reverse tunnel

![Tunnel-SSH Logo](https://i.imgur.com/2pdoADB.png)


##How to use
```sh
npm i reverse-tunnel-ssh (--save)
```

```js

// Tunnel your local port 8000 to tunneltest.com:8000

//tunnel is a ssh2 clientConnection object
var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: 'tunneltest.com',
  username: 'root',
  dstHost: '0.0.0.0', // bind to all IPv4 interfaces
  dstPort: 8000,
  //srcHost: '127.0.0.1', // default
  //srcPort: dstPort // default is the same as dstPort
  //privateKey: require('fs').readFileSync('/Your/Private/Key');
}, function(error, clientConnection) {
  //
});

// Tunnel your local port 8000 to a free port on tunneltest.com

var conn = tunnel({
  host: 'tunneltest.com',
  username: 'somebody',
  dstHost: '0.0.0.0', // bind to all IPv4 interfaces
  dstPort: 0, // dynamically choose an open port on tunneltest.com
  //srcHost: '127.0.0.1', // default
  srcPort: 8000, // must be specified if dstPort=0
  //privateKey: require('fs').readFileSync('/Your/Private/Key');

}, function (error, clientConnection) {
  //
});
conn.on('forward-in', function (port) {
  console.log('Forwarding from tunneltest.com:' + port);
});
```

If you plan to expose a local port on a remote machine (external interface) you need to enable the "GatewayPorts" option in your 'sshd_config'

```sh
# What ports, IPs and protocols we listen for
Port 22
GatewayPorts yes
```
