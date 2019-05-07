import * as dotenv from 'dotenv';
import * as path from 'path';

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
dotenv.config({ path: path.join(__dirname, `../`, `.env.${process.env.DEPLOY_TYPE}`) });

/**
 * Environment variables
 */
const env = {
  aws: {
    bucketName: getOsEnv('AWS_BUCKET_NAME'),
  }
};

module.exports = env;
