const fs = require('fs');
const path = require('path');
const env = require('../env');
const s3 = require('./s3');
const createLocalDirectory = require('../helpers/create-local-directory');

const downLoadS3filesPromise = options => new Promise((resolve, reject) => {
  const fileName = path.basename(options.Key);
  const filePath = path.resolve(env.local.s3targetDirectory, fileName);
  const writeStream = fs.createWriteStream(filePath);
  const readStream = s3.getObject(options).createReadStream();
  readStream.pipe(writeStream);

  readStream
    .on('end', () => resolve())
    .on('error', error => reject(error));
});

function* downloadS3FilesPagedGenerator(s3Objects, amount = 5) {
  let currentIndex = 0;

  while (currentIndex <= s3Objects.length - 1) {
    const endIndex = currentIndex + amount - 1;
    const promises = s3Objects
      .slice(currentIndex, currentIndex + amount)
      .map(({ Key }) => downLoadS3filesPromise({ Bucket: env.aws.bucketName, Key }));

    currentIndex = endIndex + 1;

    yield Promise.all(promises);
  }
}

const downloadS3files = async s3Objects => {
  const downloadS3filesPaged = downloadS3FilesPagedGenerator(s3Objects, 5);
  let data = [];

  createLocalDirectory(env.local.s3targetDirectory);

  for await (const pagedData of downloadS3filesPaged) {
    data = [...data, ...pagedData];
  }
};

module.exports = downloadS3files;
