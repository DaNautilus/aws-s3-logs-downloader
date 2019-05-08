const chalk = require('chalk');
const Listr = require('listr');
const listrTasks = require('./listr-tasks');

const s3LogParser = async () => {
  const listr = new Listr(listrTasks);

  await listr.run();

  console.log('Your logs are downloaded, have fun!', chalk.green.bold('DONE'));
};

s3LogParser();
