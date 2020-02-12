var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var fileinclude = require('gulp-file-include');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');
var spritesmith = require('gulp.spritesmith');

gulp.task('header', function () {
    return gulp.src('./src/header/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./src/header/shape/'));
});

gulp.task('info', function () {
    return gulp.src('./src/info/icon/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./src/info/activity/'));
});

gulp.task('structure', function () {
    return gulp.src('./src/structure/icon/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./src/structure/brain/'));
});

gulp.task('article', function () {
    return gulp.src('./src/article/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./src/article/shape/'));
});

gulp.task('leader', function () {
    return gulp.src('./src/leader/photo/*')
        .pipe(imageResize({ width: 300 }))
        .pipe(imagemin())
        .pipe(gulp.dest('./src/leader/leader/'));
});

gulp.task('schedule', function () {
    return gulp.src('./src/schedule/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./src/schedule/shape/'));
});

gulp.task('place', function () {
    return gulp.src('./src/place/screenshot.png')
        .pipe(imagemin())
        .pipe(rename("map.png"))
        .pipe(gulp.dest('./src/place/'));
});

gulp.task('residence', function () {
    return gulp.src('./src/residence/photo/*')
        .pipe(imageResize({ width: 300 }))
        .pipe(imagemin())
        .pipe(gulp.dest('./src/residence/residence/'));
});

gulp.task('facebook', function () {
    return gulp.src('./src/facebook/thumbnail.png')
        .pipe(imagemin())
        .pipe(rename("facebook.png"))
        .pipe(gulp.dest('./src/facebook/'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/leader/*.jpeg')
        .pipe(spritesmith({
            imgName: 'sprite.jpeg',
            cssName: 'sprite.css'
        }));

    return spriteData.pipe(gulp.dest('./src/leader/sprite/'));
});

var replaceHeader = `<!doctype html>
<html lang="en">

<head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="./../style.css" />
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <style>
        body {
            background-color: magenta;
        }
    </style>
</head>

<body>`;
var replaceFooter = `</body>

</html>`;

gulp.task('index', function (cb) {
    gulp.src(['./src/index/index.html'])
        .pipe(fileinclude())
        .pipe(replace(replaceHeader, ''))
        .pipe(replace(replaceFooter, ''))
        .pipe(htmlmin({
            minifyCSS: true,
            minifyJS: true,
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(gulp.dest('./docs/'));

    gulp.src('./src/structure/brain/*')
        .pipe(gulp.dest('./docs/brain/'));

    gulp.src('./src/info/activity/*')
        .pipe(gulp.dest('./docs/activity/'));

    gulp.src('./src/leader/leader/*')
        .pipe(gulp.dest('./docs/leader/'));

    gulp.src('./src/place/map.png')
        .pipe(gulp.dest('./docs/'));

    gulp.src('./src/residence/residence/*')
        .pipe(gulp.dest('./docs/residence/'));

    gulp.src('./srcc/article/shape/*')
        .pipe(gulp.dest('./docs/shape/'));

    gulp.src('./src/schedule/shape/*')
        .pipe(gulp.dest('./docs/shape/'));

    gulp.src('./src/header/shape/*')
        .pipe(gulp.dest('./docs/shape/'));

    gulp.src('./src/facebook/facebook.png')
        .pipe(gulp.dest('./docs/'));

    cb();
});

