const { constants: fsConstants, promises: fsPromises } = require('fs');
const { access } = fsPromises;
const { R_OK } = fsConstants;

const throwErrors = Boolean(process.env['BAD_APPLE_CONFIG_THROW_ERROR_NOT_READABLE']) || false;

async function isReadable(filePath) {
  try {
    await access(filePath, R_OK);
    return true;
  } catch (e) {
    if (throwErrors) throw e;
    return false;
  }
}

module.exports = isReadable;
