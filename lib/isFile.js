const { lstat } = require('fs').promises;

async function isFile(filePath) {
  try {
    const fileStats = await lstat(filePath);
    return fileStats.isFile();
  } catch (e) {
    if (e.code === 'ENOENT') return false;
    throw e;
  }
}

module.exports = isFile;
