const env = require('../env');
const s3 = require('./s3');

const getS3ObjectsPromise = options => new Promise((resolve, reject) => {
  s3.listObjects(options, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

const getS3Objects = async () => {
  const data = await getS3ObjectsPromise({ Bucket: env.aws.bucketName });
  return data && data.Contents ? data.Contents : [];
};

module.exports = getS3Objects;
