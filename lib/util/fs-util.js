'use strict'

const shell = require('shelljs'),
	fs = require('fs')

exports.ensureCleanDir = function (dirPath) {
  shell.rm('-rf', dirPath)
  return shell.mkdir('-p', dirPath)
}

exports.rmDir = function (dirPath) {
  return shell.rm('-rf', dirPath)
}

exports.fileExists = function (filePath) {
  return shell.test('-e', filePath)
}

exports.isDir = function (filePath) {
  return shell.test('-d', filePath)
}

exports.isFile = function (filePath) {
  return shell.test('-f', filePath)
}

exports.copy = function (from, to) {
  return shell.cp('-r', from, to)
}
exports.recursiveList = function (dirPath) {
  return shell.ls('-R', dirPath)
}
exports.makeDir = function (dirPath) {
	'use strict';
	shell.mkdir('-p', dirPath);
	return Promise.resolve();
}
exports.replaceStringInFile = function (searchPattern, replacePattern, filePath) {
	shell.sed('-i', searchPattern, replacePattern, filePath)
	return Promise.resolve();
}
exports.copyFile = function (fromFile, toFile) {
	'use strict';
	const readStream = fs.createReadStream(fromFile);
	readStream.pipe(fs.createWriteStream(toFile));
	return new Promise((resolve, reject) => {
		readStream.once('error', (err) => reject(err));
		readStream.once('end', () => resolve());
	});
};
exports.copyAndReplaceInFile = function (searchFor, replaceWith, fromFile, toFile) {
	'use strict';
	const readStream = fs.createReadStream(fromFile, 'utf8'),
		writeStream = fs.createWriteStream(toFile);
	let fileContents = '';
	readStream.once('data', (chunk) => {
		fileContents += chunk.toString().replace(searchFor, replaceWith);
		writeStream.write(fileContents);
	});
	return new Promise((resolve, reject) => {
		readStream.once('error', (err) => reject(err));
		readStream.once('end', () => {
			writeStream.end();
			resolve();
		});
	});
};