const gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		sourcemaps 			= require('gulp-sourcemaps'),
		concat 				= require('gulp-concat'),
		autoprefixer 		= require('gulp-autoprefixer'),
		cleanCSS 			= require('gulp-clean-css'),
		uglify 				= require('gulp-uglify'),
		del 					= require('del'),
		browserSync 		= require('browser-sync').create();

function styles(){
	return gulp.src('./src/sass/**/*.sass')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(cleanCSS({ 
			level: 2 
		}))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}

function scripts(){
	return gulp.src('./src/js/**/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function clean(){
	return del(['build/*']);
}

function watch(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch('./src/sass/**/*.sass', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));







// gulp.task('scripts', scripts);
// .pipe(minCSS()) Минимизируем
// gulp.task('styles', styles);		
// const cssFiles = [     file connection order (порядок подключения файлов)
// 	'./src/sass/_container.sass'
// 	'./src/sass/main.sass',
// ]