


const path = require('path');
const Gulp = require('gulp');
const Less = require('gulp-less');
const Cssnano = require('gulp-cssnano');
const Concat = require('gulp-concat');
const Uglify = require('gulp-uglify');
const Htmlmin = require('gulp-htmlmin');
const Imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const BrowserSync = require('browser-sync');

// 1.styles 编译 合并 压缩
Gulp.task('style',() => {
    Gulp.src(['./src/styles/*.less','!./src/styles/_*.less'])
        .pipe(Less({
             paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(Cssnano())
        .pipe(Gulp.dest('dist/css'))
        .pipe(BrowserSync.reload({
            stream: true
        }));
});

// 2.images 直接导入
Gulp.task('image',() => {
    Gulp.src('./src/images/*.*')
        // .pipe(Imagemin())
        .pipe(Gulp.dest('./dist/iamges'))
        .pipe(BrowserSync.reload({
            stream: true
        }));
});

// 3.scripts 合并 混淆 压缩 
Gulp.task('script',() => {
    Gulp.src('./src/scripts/*.js')
        .pipe(Concat('main.js'))
        .pipe(Uglify())
        .pipe(Gulp.dest('./dist/scripts'))
        .pipe(BrowserSync.reload({
            stream: true
        }));
});

// 4.html 压缩
Gulp.task('html',() => {
    Gulp.src('./src/index.html')
    .pipe(Htmlmin({collapseWhitespace: true}))
    .pipe(Gulp.dest('./dist'))
    .pipe(BrowserSync.reload({
            stream: true
    }));    
});

Gulp.task('serve',() => {
    BrowserSync({
        server: {
        baseDir: ['dist']
        },
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
   Gulp.watch('./src/styles/*.less',['style']);
   Gulp.watch('./src/images/*.*',['image']);
   Gulp.watch('./src/index.html',['html']);
   Gulp.watch('./src/scripts/*.js',['script']);
});




