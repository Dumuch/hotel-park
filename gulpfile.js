const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fileinclude = require('gulp-file-include');
const babel = require("gulp-babel");
const plumber = require('gulp-plumber');
// const bundle = require('gulp-bundle-assets');

gulp.task('babel', function(done) {
  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/assets/js'));

  browserSync.reload();
  done();
});


gulp.task('fileinclude', function(done) {
  gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build/'));

  browserSync.reload();

  done();
});


// less to css
gulp.task('less', function(done) {

  gulp.src("src/less/*.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest("build/assets/css"))
    .pipe(browserSync.stream());

  browserSync.reload();

  done();
});

gulp.task('fonts_img', function(done) {
  gulp.src("src/fonts/*")
    .pipe(gulp.dest("build/assets/fonts"))
  gulp.src("src/img/*")
    .pipe(gulp.dest("build/assets/img"))
    .pipe(browserSync.stream());

  browserSync.reload();

  done();
});

gulp.task('inline', function(done) {
  const plugins = [
    autoprefixer({
      overrideBrowserslist: ['last 1 version']
    }),
    cssnano()
  ];
  gulp.src('build/assets/css/inline.css')
    .pipe(plumber())
    .pipe(postcss(plugins))
    .pipe(rename("inline.min.css"))
    .pipe(gulp.dest('build/assets/css-min'));

  done();
});

gulp.task('style', function(done) {
  const plugins = [
    autoprefixer({
      overrideBrowserslist: ['last 1 version']
    }),
    cssnano()
  ];
  gulp.src('build/assets/css/style.css')
    .pipe(plumber())
    .pipe(postcss(plugins))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('build/assets/css-min'));

  done();
});


// css to min.css
gulp.task('css', function() {
  const plugins = [
    autoprefixer({
      overrideBrowserslist: ['last 1 version']
    }),
    cssnano()
  ];
  return gulp.src('build/assets/css/style.css')
    .pipe(plumber())
    .pipe(postcss(plugins))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('build/assets/css-min'));
});


// localhost
gulp.task('serve', function(done) {
  browserSync.init({
    server: "build/"
  });

  gulp.watch("src/*.html", gulp.series('fileinclude'));
  gulp.watch("src/blocks-html/*/*.html", gulp.series('fileinclude'));
  gulp.watch("src/blocks-html/*.html", gulp.series('fileinclude'));

  gulp.watch("src/blocks-less/**/*", gulp.series('less'));
  gulp.watch("src/less/style.less", gulp.series('less'));
  gulp.watch("build/assets/css/style.css", gulp.series('style'));

  gulp.watch("src/less/inline.less", gulp.series('less'));
  gulp.watch("build/assets/css/inline.css", gulp.series('inline'));

  gulp.watch("src/blocks-less/*.less", gulp.series('less'));

  gulp.watch("src/js/*.js", gulp.series('babel'));

  gulp.watch("build/assets/css-min/*.css").on('change', () => {
    browserSync.reload();
    done();
  });

  gulp.watch("src/*.html").on('change', () => {
    browserSync.reload();
    done();
  });

  done();
});

gulp.task('default', gulp.series('serve'));





// png or jpg to webp
gulp.task("webp", function() {
  return gulp.src("build/assets/images/*.{png,jpg,jpeg}")
    .pipe(webp({
      quality: 85
    }))
    .pipe(gulp.dest("build/assets/images/"));
});


// svg to sprite.svg
gulp.task("sprite", function() {
  return gulp.src("img/*.svg")
    .pipe(svgstore({
      inLineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("img"))
});