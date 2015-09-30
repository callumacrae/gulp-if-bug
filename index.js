'use strict';

const vfsFake = require('vinyl-fs-fake');
const gulpIf = require('gulp-if');
const through = require('through2');

function plugin(name) {
	let files = 0;

	return through.obj(function (file, enc, cb) {
		files++;
		cb(null, file);
	}, function (cb) {
		console.log(`${name}: ${files} files`);
		cb();
	});
}

vfsFake.src([{ path: 'file.txt', contents: new Buffer('abc') }])
	.pipe(gulpIf(() => true, plugin('true'), plugin('false')));
