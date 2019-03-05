'use strict'

import gulp from 'gulp'
import scss from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'
import gif from 'gulp-if'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import terser from 'gulp-terser'
import del from 'del'
import rename from 'gulp-rename'

const liveEnv = process.argv.indexOf('--live') !== -1

const gSrc = {
  css: [
    './src/sass/**/*.scss'
  ],
  js: [
    './src/js/*.js'
  ],
  images: [
    './src/img/**/*.{gif,jpg,png,svg,ico}'
  ],
  fonts: [
    './src/fonts/**/*.{eot,svg,ttf,woff,woff2}'
  ]
}

const gDist = {
  css: './css/components/',
  js: './js',
  images: './img',
  fonts: './fonts'
}

let SASS_INCLUDE_PATHS = []

let LIB_JS_INCLUDE_PATHS = []

function handleError (err) {
  console.log(err.toString())
  this.emit('end')
}

export function css () {
  return gulp.src(gSrc.css)
    .pipe(plumber({errorHandler: handleError}))
    .pipe(gif(!liveEnv, sourcemaps.init()))
    .pipe(scss({includePaths: SASS_INCLUDE_PATHS}))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 8',
        'ie 11',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    }))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gif(!liveEnv, sourcemaps.write()))
    .pipe(gulp.dest(gDist.css))
}
//
// export function libsJs () {
//   return gulp.src(LIB_JS_INCLUDE_PATHS)
//     .pipe(plumber({errorHandler: handleError}))
//     .pipe(gif(!liveEnv, sourcemaps.init()))
//     .pipe(babel({compact: true}))
//     .pipe(concat('libs.min.js'))
//     .pipe(terser())
//     .pipe(gif(!liveEnv, sourcemaps.write()))
//     .pipe(gulp.dest(gDist.js))
// }

export function js () {
  return gulp.src(gSrc.js)
    .pipe(plumber({errorHandler: handleError}))
    .pipe(gif(!liveEnv, sourcemaps.init()))
    .pipe(babel({compact: true}))
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(gif(!liveEnv, sourcemaps.write()))
    .pipe(gulp.dest(gDist.js))
}

export function images () {
  return gulp.src(gSrc.images)
    .pipe(imagemin())
    .pipe(gulp.dest(gDist.images))
}

export function fonts () {
  return gulp.src(gSrc.fonts)
    .pipe(gulp.dest(gDist.fonts))
}

export function clean () {
  return del(['css', 'js'])
}

export function watch () {
  gulp.watch(gSrc.css, css)
  gulp.watch(gSrc.js, js)
}

function build (done) {
  return gulp.series(
    'css', 'js', 'images'
  )(done)
}

export default build