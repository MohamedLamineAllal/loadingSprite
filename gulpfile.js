const {
    series,
    parallel,
    src,
    dest,
    watch
} = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    colors = require('colors'),
    cleanCss = require('gulp-clean-css'),
    strip = require('gulp-strip-comments'),
    prettify = require('gulp-jsbeautifier'),
    // rollup = require('rollup-stream'),
    // source = require('vinyl-source-stream'),
    rollup = require('gulp-better-rollup'),
    PATH = require('path')

    const gulpSass = require('gulp-sass');
    gulpSass.compiler = require('node-sass');
// const sourcemaps = require('gulp-sourcemaps');

function jsCopy(done, source) {
    console.log('js copy task start'.yellow);
    if (!source) {
        source = 'src/js/*.js';
    }

    return src(source)
        .pipe(strip({
            trim: true
        }))
        .pipe(dest('dist/js/esm'))
        .on('end', function () {
            console.log('js copy task end'.yellow);
            done();
        });;
}


function jsIIFE(done, source) {
    if (!source) {
        source = 'src/js/*.js';
    }

    src(source)
    .pipe(rollup({
      plugins: [require('rollup-plugin-babel')],
      name: 'LoadingSpring',
      format: 'iife'
    }))
    .pipe(dest('dist/js/iife'))
    .on('end', function () {
        console.log('js iife task end'.yellow);
        done();
    });
}

function jsIIFEminify(done, source) {
    console.log('js minify task start'.yellow);
    if (!source) {
        source = 'src/js/*.js';
    }

    src(source)
    .pipe(rollup({
      plugins: [require('rollup-plugin-babel')],
      name: 'LoadingSpring',
      format: 'iife'
    }))
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(dest('dist/js/iife'))
    .on('end', function () {
        console.log('js iife minify task end'.yellow);
        done();
    });

    // return src(source)
    //     //.pipe(babel())   
    //     .pipe(uglify())
    //     .pipe(rename({
    //         extname: '.min.js'
    //     }))
    //     .pipe(dest('dist/js/')).on('end', function () {
    //         console.log('js minify task end'.yellow);
    //         done();
    //     });
}

function css(done, source) {
    if (!source) {
        source = 'src/style/**/*.css';
    }
    Promise.all([
            new Promise(function (resolve, reject) {
                src(source)
                    // .pipe(sourcemaps.init())
                    .pipe(cleanCss({
                        compatibility: 'ie8'
                    }))
                    // .pipe(sourcemaps.write())
                    .pipe(rename({
                        extname: '.min.css'
                    }))
                    .pipe(dest('dist/css')).on('end', function () {
                        console.log('css minify task end'.yellow);
                        src
                        resolve();
                    });
            }),
            new Promise(function (resolve, reject) {
                src(source)
                    .pipe(strip.text({
                        trim: true
                    }))
                    .pipe(dest('dist/css/').on('end', function () {
                        console.log('css copy task end'.yellow);
                        resolve();
                    }))
            })
        ])
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.error(err.red);
        });
}

function sass(done, source) {
    if (!source) {
        source = ['src/style/**/*.{scss,sass}', '!(src/style/spinners/**)', '!(src/style/_variables.scss)'];
    } else {
        if (isSubPath('src/style/spinners', source)) {
            source = 'src/style/spinkit.scss'
        }
    }


    Promise.all([
            new Promise(function (resolve, reject) {
                src(source)
                    .pipe(gulpSass().on('error', gulpSass.logError))
                    // .pipe(sourcemaps.init())
                    .pipe(cleanCss({
                        compatibility: 'ie8'
                    }))
                    // .pipe(sourcemaps.write())
                    .pipe(rename({
                        extname: '.min.css'
                    }))
                    .pipe(dest('dist/css')).on('end', function () {
                        console.log('sass compile and optimisation task end'.yellow);
                        resolve();
                    });
            }),
            new Promise(function (resolve, reject) {
                src(source)
                    .pipe(gulpSass().on('error', gulpSass.logError))
                    .pipe(strip.text({
                        trim: true
                    }))
                    .pipe(prettify())
                    .pipe(dest('dist/css')).on('end', function () {
                        console.log('sass compile task end'.yellow);
                        resolve();
                    });
            })
        ])
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.error(err.red);
        });
}


function style() {
    return parallel(css, sass);
}


const data = {
    jsIIFE: {
        src: null
    },
    jsIIFEminify: {
        src: null
    },
    jsCopy: {
        src: null
    },
    css: {
        src: null
    },
    sass: {
        src: null
    }
}

const delayed = {
    jsIIFE: delay(jsIIFE, 2000).bind(data.jsIIFE),
    jsIIFEminify: delay(jsIIFEminify, 2000).bind(data.jsIIFEminify),
    jsCopy: delay(jsCopy, 2000).bind(data.jsCopy),
    css: delay(css, 2000).bind(data.css),
    sass: delay(sass, 2000).bind(data.sass)
}

const srcOnChange = function (path) {
    console.log((path + ' is changed').gray);
    let ext = PATH.extname(path);
    console.log('ext = ' + ext);
    switch (ext) {
        case '.js':
            data.jsIIFEminify.src = path;
            data.jsIIFE.src = path;
            data.jsCopy.src = path;
            parallel(
                delayed.jsIIFE, delayed.jsIIFEminify,
                delayed.jsCopy
            )();
            break;
        case '.sass':
        case '.scss':

            data.sass.src = path;
            series(delayed.sass)();
            break;
        case '.css':
            data.css.src = path;
            series(delayed.css)();
            break;
        default:
    }
};

const srcOnAdd = function (path) {
    if (fs.readFileSync(path).length > 0) {
        srcOnChange(path);
    } else {
        // console.log('new empty created file'.gray);
    }
};

function watchTask() {
    watch(['src/**/*.{js,css,scss,sass}', /*'!(src/style/spinners/**)'*/ , '!(src/style/_variables.scss)'])
        .on('change', srcOnChange)
        .on('add', srcOnAdd); // when a changment happen to one of the files, this will be triggered, but, this get executed after 2000 ms , and only if not other triggering happen, otherwise counting start all over
}


exports.default = series(watchTask);

exports.jsESM = jsCopy;
exports.jsIIFE = jsIIFE;
exports.jsIIFEminify = jsIIFEminify;
exports.css = css;
exports.sass = sass;
exports.style = style;

function delay(cb, ms) {
    let timer = null;

    return function (done) {
        clearTimeout(timer);
        setTimeout(cb.bind(null, done, this.src), ms);
    }
}

function isSubPath(parent, path) {
    const relative = PATH.relative(parent, path);
    return !!relative && !relative.startsWith('..') && !PATH.isAbsolute(relative); // may need some tweaking (all the cases [check your notes])
}