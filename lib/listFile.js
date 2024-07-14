const { readdir } = require('fs').promises;


async function listFile(directory) {
  try {
    const files = await readdir(directory);
    return files;
  } catch (e) {
    throw e;
  }
}

module.exports = listFile;
