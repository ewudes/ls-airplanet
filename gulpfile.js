var gulp = require('gulp');
var rename = require('gulp-rename');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function pug_html(done) {
	gulp.src('./src/pages/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
	done()
}

function css_style(done) {
	gulp.src('./src/styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.on('error', console.error.bind(console))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream())
	done()
}

function sync(done) {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 3000
	})
}

function browserReload(done) {
	browserSync.reload()
}

function watchFile() {
	gulp.watch('./src/pages/**/*', pug_html);
	gulp.watch('./src/styles/**/*', css_style);
	gulp.watch('./**/*.html', browserReload);
	gulp.watch('./**/*.js', browserReload);
}

gulp.task('default', gulp.parallel(watchFile, sync))
