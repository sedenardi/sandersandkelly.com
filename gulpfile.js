'use strict';

const gulp = require('gulp');
const path = require('path');
const uglify = require('gulp-uglify');
const del = require('del');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const sass = require('gulp-sass');
const nano = require('gulp-cssnano');

const styleDir = path.resolve(__dirname, './src/css');
const distDir = path.resolve(__dirname, './public');

gulp.task('cleanDistBuild', () => { return del([path.join(distDir, '/js/**/*')]); });
gulp.task('cleanDistStyle', () => { return del([path.join(distDir, '/css/**/*')]); });
gulp.task('cleanDistHtml', () => { return del([path.join(distDir, '/*.html')]); });
gulp.task('cleanDistImage', () => { return del([path.join(distDir, '/img/**/*')]); });
gulp.task('cleanDistAll', gulp.parallel(
  'cleanDistBuild',
  'cleanDistStyle',
  'cleanDistHtml',
  'cleanDistImage'
));

gulp.task('copyImages', () => {
  return gulp.src(path.resolve(__dirname, './src/img/**/*'))
    .pipe(gulp.dest(path.join(distDir, '/img')));
});

gulp.task('copyStatic', gulp.parallel(
  'copyImages'
));

gulp.task('webpack', () => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) return reject(err);

      const info = stats.toString({
        hash: true,
        version: true,
        timings: true,
        assets: false,
        chunks: true,
        chunkModules: false,
        modules: false,
        cached: false,
        reasons: false,
        source: false,
        errorDetails: true,
        chunkOrigin: false,
        colors: true
      });
      console.log(info);
      resolve();
    });
  });
});

gulp.task('uglifyJs', () => {
  return gulp.src(distDir + '/js/**/*')
    .pipe(uglify())
    .pipe(gulp.dest(distDir + '/js'));
});

gulp.task('buildJsDev', gulp.series(
  'webpack'
));

gulp.task('buildJs', gulp.series(
  'webpack',
  'uglifyJs'
));

gulp.task('compileStyles', () => {
  return gulp.src(path.join(styleDir, '/app.scss'))
    .pipe(sass({
      includePaths: path.resolve(__dirname, './node_modules')
    }).on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest(path.join(distDir, '/css')));
});

gulp.task('copyPage', () => {
  return gulp.src(path.resolve(__dirname, './src/**/*.html'))
    .pipe(gulp.dest(path.join(__dirname, './public/')));
});

gulp.task('defaultDev', gulp.series(
  'cleanDistAll',
  gulp.parallel(
    'buildJsDev',
    'compileStyles',
    'copyPage',
    'copyStatic'
  )
));

gulp.task('default', gulp.series(
  'cleanDistAll',
    gulp.parallel(
    'buildJs',
    'compileStyles',
    'copyPage',
    'copyStatic'
  )
));

gulp.task('watchJs', () => {
  gulp.watch(['src/js/**/*'], gulp.series(
    'cleanDistBuild',
    'buildJsDev'
  ));
});

gulp.task('watchStyles', () => {
  gulp.watch('src/css/**/*', gulp.series(
    'cleanDistStyle',
    'compileStyles'
  ));
});

gulp.task('watchPage', () => {
  gulp.watch('src/**/*.html', gulp.series(
    'cleanDistHtml',
    'copyPage'
  ));
});

gulp.task('watchImages', () => {
  gulp.watch('img/**/*', gulp.series(
    'cleanDistImage',
    'copyImages'
  ));
});

gulp.task('watch', gulp.series(
  'defaultDev',
  gulp.parallel(
    'watchJs',
    'watchStyles',
    'watchPage',
    'watchImages'
  )
));
