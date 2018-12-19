const {series, src, dest, watch} = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const fs = require('fs');
const colors = require('colors');

function minify(done, source) {
    console.log('minify task start'.yellow);
    if (!source) {
        source = 'src/*/*.js';
    }

    return src(source)
        //.pipe(babel())   
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/')).on('end', function () {
            console.log('minify task end'.yellow);
            done();
        });
}

const dminifyData = {
    src: null
};

const delayedMinify = delay(minify, 2000).bind(dminifyData);

const t = function () {
    console.log('args');
    console.log(arguments);
}


const srcOnChange = function (path) {
    dminifyData.src = path;
    console.log((path + ' is changed').gray);
    console.dir(arguments);
    series(delayedMinify)();
};

const srcOnAdd = function (path) {
    if (fs.readFileSync(path).length > 0) {
        dminifyData.src = path;
        console.log(path + ' is added');
        series(delayedMinify)();
    } 
    // else {
    //     console.log('new empty created file'.gray);
    // }
};

function watchTask() {
    watch('src/**/*.js')
    .on('change', srcOnChange)
    .on('add', srcOnAdd)
    ; // when a changment happen to one of the files, this will be triggered, but, this get executed after 2000 ms , and only if not other triggering happen, otherwise counting start all over
}


exports.default =  series(watchTask);

exports.minify = minify;

function delay(cb, ms) {
    let timer = null;

    return function (done) {
        clearTimeout(timer);
        setTimeout(cb.bind(null, done, this.src), ms);
    }
}