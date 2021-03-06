const gulp = require('gulp');
const prettier = require('gulp-prettier');
const rename = require("gulp-rename");
const postcssFunctions = require('postcss-functions');

function darken(value, frac) {
    return [1,2,3,4];
}

const pcssFunctions = postcssFunctions({
    functions: { darken }
});

const css = async () => {
    const postcss = require('gulp-postcss')
    const sourcemaps = require('gulp-sourcemaps')

    return gulp.src('src/*.pcss')
        .pipe(sourcemaps.init())
        .pipe(postcss([require('precss'), require('autoprefixer'), require('postcss-for'), pcssFunctions, require('postcss-each')]))
        .pipe(prettier({ singleQuote: true }))
        .pipe(rename(function (path) {
            // Updates the object in-place
            path.extname = ".css";
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'))
};

exports.css = css;
