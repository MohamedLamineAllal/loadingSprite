const path  = require('path')

console.log(path.relative('/test/te', '/test/te/bs'));
console.log(path.relative('/test/te', '/test/te'));
console.log(path.relative('/test/te/ms', '/test/te/bk/lk'));
console.log(path.relative('/test/te/ms/ls', '/test/te/bk/lk'));