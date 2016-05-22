# reverse-tunnel-ssh
Easy ssh reverse tunnel

![Tunnel-SSH Logo](https://i.imgur.com/2pdoADB.png)


##How to use
```sh
npm i reverse-tunnel-ssh (--save)
```

```js

// Tunnel your local port 8000 to tunneltest.com 

//tunnel is a ssh2 clientConnection object
var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: 'tunneltest.com',
  username: 'root',
  dstHost: '0.0.0.0', // bind to all interfaces
  dstPort: 8000,
  //srcHost: '127.0.0.1', // default
  //srcPort: dstPort // default is the same as dstPort
}, function(error, clientConnection) {
  // 
});
```


If you plan to expose a local port on a remote machine (external interface) you need to enable the "GatewayPorts" option in your 'sshd_config'

```sh
# What ports, IPs and protocols we listen for
Port 22
GatewayPorts yes
```




