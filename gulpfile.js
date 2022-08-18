'use strict';

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

exports.sass = function () {
    return src('./src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist'));
}

exports.min_js = function () {
    return src('./src/scripts/script.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist'));
}

exports.watch = function () {
    watch('./src/styles/*.scss', series('sass'));
    watch('./src/scripts/script.js', series('min_js'));
};
