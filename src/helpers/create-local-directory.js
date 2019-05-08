const fs = require('fs');
const { sync: rimraf } = require('rimraf');

const createLocalDirectory = directory => {
  const directoryExists = fs.existsSync(directory);

  if (directoryExists) {
    rimraf(directory);
  }

  fs.mkdirSync(directory)
};

module.exports = createLocalDirectory;
