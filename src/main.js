#!/usr/bin/env node
const { readFile } = require('fs').promises;
const { isFile, isReadable, listFile } = require('../utils/filesystem.js').promises;
const { join } = require('path');
const { setTimeout: sleep } = require('timers-promises');
const { mergeSort } = require('sort-algorithms');
const { yellow, green } = require('colors/safe');

const LOG_LEVEL = {
  warn: Boolean(process.env['BAD_APPLE_CONFIG_LOG_WARN']) || false,
}

const FRAMES_DIR = process.env['BAD_APPLE_CONFIG_FRAMES_DIR'] || join(__dirname, '../ascii');
const FPS = Number(process.env['BAD_APPLE_CONFIG_FPS']) || 30;

async function main() {
  try {
    const files = mergeSort(await listFile(FRAMES_DIR)).filter(file => !file.startsWith('.'));

    for (const file of files) {
      const filePath = join(FRAMES_DIR, file);
      
      if (await isFile(filePath)) {	    
        if (!(await isReadable(filePath))) {
          if (!LOG_LEVEL.warn) console.warn(yellow(`Warning: Frame file ${green.underline(file)} is not readable, this frame will be skipped`));
        }
	
	const data = await readFile(filePath, 'utf8');
	console.log(data);
      }
      
      await sleep(1000 * (1 / FPS));
      console.clear()
    }
  } catch (e) {
    console.error(e);
  }

  console.clear();
}

console.clear();
main();
