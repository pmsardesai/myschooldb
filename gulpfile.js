var babel = require('gulp-babel'),
	babelify = require('babelify'),	
	browserify = require('browserify'),
	eslint = require('gulp-eslint'),
	fs = require('fs'),
	gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
 
// ********** config **********
var config = {
	start: 'app.js',
	entry: './src/client.jsx',
	bundleDir: './build',
	bundleJS: 'build/bundle.js',
	jsx: {
		src: 'src/**/*.jsx'
	},
	styles: {
		src: './public/styles/*.scss',
		dest: './build'
	},
	watch : {
		jsx: 'src/**/*.jsx',
		sass: 'public/styles/*.scss'
	}
};

// ********** lint **********
// Lint all JSX files
gulp.task('build:lint', function() {
  return gulp.src(config.jsx.src)
    .pipe(eslint())
    .pipe(eslint.format());
});

// ********** compile **********
// Compile JSX files
gulp.task('build:jsx', ['build:lint'], function () {
	var bundle = browserify({
		entries: config.entry,
		extensions: ['.jsx'],
		debug: true,
		transform: [babelify]
	});

	return bundle.bundle()
		.pipe(fs.createWriteStream(config.bundleJS, 'utf8'));
});

// Compile SCSS files
gulp.task('build:sass', function() {
	return gulp.src(config.styles.src)
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest(config.styles.dest))
		.pipe(browserSync.stream());
});

// ********** watch **********
gulp.task('watch', function() {
	nodemon({
		script: config.start,
		ext: 'js css' // if any changes to js or css, compile
	});

	// watch for any changes in jsx or sass files
	gulp.watch(config.watch.jsx, ['build:jsx']);
	gulp.watch(config.watch.sass, ['build:sass']);

	browserSync.init( {
		server: config.bundleDir
	});
});

// ********** combined ************
gulp.task('all', 
	['build:all',
	 'watch']);

gulp.task('build:all', 
	['build:jsx', 
	 'build:sass']);