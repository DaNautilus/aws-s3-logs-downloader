const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { local: { s3targetDirectory, logsTargetDirectory } } = require('./env');
const createLocalDirectory = require('./helpers/create-local-directory');


const extractArchivePromise = archiveFileName => new Promise((resolve, reject) => {
  const archiveFile = path.resolve(s3targetDirectory, archiveFileName);
  const archiveFileExtensionLength = path.extname(archiveFileName).length;

  const targetFileName = archiveFileName.slice(0, archiveFileName.length - archiveFileExtensionLength);
  const targetFile = path.resolve(logsTargetDirectory, targetFileName);

  const readStream = fs.createReadStream(archiveFile);
  const writeStream = fs.createWriteStream(targetFile);
  const unzip = zlib.createGunzip();

  readStream.pipe(unzip).pipe(writeStream);

  readStream
    .on('end', () => resolve())
    .on('error', error => reject(error));
});

function* extractFilesPagedGenerator(archives, amount = 5) {
  let currentIndex = 0;

  while (currentIndex <= archives.length - 1) {
    const endIndex = currentIndex + amount - 1;
    const promises = archives
      .slice(currentIndex, currentIndex + amount)
      .map(archive => extractArchivePromise(archive));

    currentIndex = endIndex + 1;

    yield Promise.all(promises);
  }
}

const extractFiles = async () => {
  const archives = fs.readdirSync(s3targetDirectory);
  const extractFilesPaged = extractFilesPagedGenerator(archives);

  createLocalDirectory(logsTargetDirectory);

  while (true) {
    const { done } = await extractFilesPaged.next();

    if (done) {
      return;
    };
  }

  extractFilesPaged.next();
};

module.exports = extractFiles;
