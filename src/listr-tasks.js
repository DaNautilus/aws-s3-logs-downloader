const getS3Objects = require('./s3/get-s3-objects');
const downloadS3files = require('./s3/download-s3-files');
const extractFiles = require('./extract-files');

const listrTasks = [
  {
    title: 'Get objects from S3',
    task: async context => context.s3Objects = await getS3Objects(),
  },
  {
    title: 'Download files from S3',
    task: async context => await downloadS3files(context.s3Objects),
  },
  {
    title: 'Extract logs',
    task: () => extractFiles(),
  }
];

module.exports = listrTasks;
