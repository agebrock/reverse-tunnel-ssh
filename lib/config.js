var defaults = require('lodash.defaults');

function createConfig(userConfig) {
  var env = process.env;

  var config = defaults(userConfig || {}, {
    username: env.TUNNELSSH_USER || env.USER || env.USERNAME,
    sshPort: 22,
    srcHost: 'localhost',
    dstPort: null,
    dstHost: 'localhost',
    localHost: 'localhost',
    privateKey: null
  });

  // Try to use ssh-agent if no auth information was set
  if (!config.password && !config.privateKey) {
    config.agent = config.agent || process.env.SSH_AUTH_SOCK;
  }

  if (userConfig.privateKey !== null) {
    config.privateKey = userConfig.privateKey
  } 

  // No local route, no remote route.. exit here
  if (config.dstPort === null || !config.dstHost || !config.host) {
    throw new Error('invalid configuration.');
  }

  // Use the same port number local
  if (config.srcPort === undefined) {
    if (!config.dstPort) {
      throw new Error('must specify srcPort or dstPort');
    }
    config.srcPort = config.dstPort;
  }

  return config;
};

module.exports = createConfig;
