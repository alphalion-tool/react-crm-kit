var spawnSync = require('child_process').spawnSync;
var flow = require('flow-bin');

var store = {
  error: null,
  flowOptions: [
    'status',
    '--color=always',
  ],
};


function flowErrorCode(status) {
  var error;
  switch (status) {
    /*
    case 0:
      error = null;
      break;
    */
    case 1:
      error = 'Server Initializing';
      break;
    case 2:
      error = 'Type Error';
      break;
    case 3:
      error = 'Out of Time';
      break;
    case 4:
      error = 'Kill Error';
      break;
    case 6:
      error = 'No Server Running';
      break;
    case 7:
      error = 'Out of Retries';
      break;
    case 8:
      error = 'Invalid Flowconfig';
      break;
    case 9:
      error = 'Build Id Mismatch';
      break;
    case 10:
      error = 'Input Error';
      break;
    case 11:
      error = 'Lock Stolen';
      break;
    case 12:
      error = 'Could Not Find Flowconfig';
      break;
    case 13:
      error = 'Server Out of Date';
      break;
    case 14:
      error = 'Server Client Directory Mismatch';
      break;
    case 15:
      error = 'Out of Shared Memory';
      break;
  }

  return error;
}


function checkFlowStatus(compiler, next) {
  store.error = null;

  var res = spawnSync(flow, store.flowOptions);
  var status = res.status;

  if (status !== 0) {
    var errorCode = flowErrorCode(status);
    var errorDetails = res.stdout.toString() + res.stderr.toString();
    store.error = new Error('Flow: ' + errorCode + '\n\n' + errorDetails);
  }

  next();
}


function pushError(compilation) {
  if (store.error) {
    compilation.errors.push(store.error);
  }
}


function FlowFlowPlugin() {}

FlowFlowPlugin.prototype.apply = function(compiler) {
  compiler.plugin('run', checkFlowStatus);
  compiler.plugin('watch-run', checkFlowStatus);

  compiler.plugin('compilation', pushError);
};

module.exports = FlowFlowPlugin;
