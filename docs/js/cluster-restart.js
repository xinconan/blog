// 多进程启动，自动重启服务

const { cpus } = require('os');
const cluster = require('cluster');

const cpuNum = cpus.length();

// cluster.isPrimary
if (cluster.isMaster) {
  for (let i = 0; i < cpuNum - 1; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  require('./app.js'); // 执行app.js
}
