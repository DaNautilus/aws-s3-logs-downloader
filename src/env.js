const dotenv = require('dotenv');
const path = require('path');

/**
 * Helper functions
 */
const getOsEnv = key => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return process.env[key];
}

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });


/**
 * Environment variables
 */
const env = {
  aws: {
    bucketName: getOsEnv('AWS_BUCKET_NAME'),
  },
  local: {
    s3targetDirectory: path.resolve(process.cwd(), 's3-files'),
    logsTargetDirectory: path.resolve(process.cwd(), 'logs'),
  }
};

module.exports = env;
