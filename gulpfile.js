const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');


//gulp.task --> görev oluşturmak için
//gulp.src --> kaynak dosyaları belirtmek için
//gulp.dest --> dosyalarda değişiklik olduktan sonra hedef dizin
//gulp.watch --> izleme ve görev çalıştırma 
//gulp.pipe --> modify 

gulp.task('img', (cb) => {
    // gulp.src('./src/images/*.svg');//sadece svg uzantılı dosyaları oku
    // gulp.src('./src/images/*');//bütün dosyaları oku
    gulp.src('./src/images/**/*')//bütün klasör ve altındaki dosyaları oku
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.stream());
    cb();
});

gulp.task('html', (cb) => {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
    cb();
});

gulp.task('css', (cb) => {
    gulp.src('./src/styles/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(browserSync.stream());
    cb();
});

gulp.task('js', (cb) => {
    gulp.src('./src/scripts/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(browserSync.stream());
    cb();
});

gulp.task('sass', (cb) => {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(browserSync.stream());
    cb();
});

gulp.task('serve', gulp.series(['html', 'css', 'js', 'img']), () => {
    browserSync.init({
        server: './dist/'
    });
    gulp.watch('./src/styles/**/*.css', 'css');
    gulp.watch('./src/scripts/*.js', 'js');
    gulp.watch('./src/images/*', 'img');
    gulp.watch('./src/*.html', 'html');
})


gulp.task('default', gulp.series('serve'));