var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');
var data = require('./mock/data/data.json');
var mock = require('./mock/data.js');
var babel = require('gulp-babel');
var minjs = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var mincss = require('gulp-clean-css');
var minhtml = require('gulp-htmlmin');
gulp.task('default', function () {
    gulp.src('src')
        .pipe(server({
            port: 6060,
            host: 'localhost',
            open: true,
            middleware: function (req, res) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    if (/\/api\/send/.test(pathname)) {
                        var arr = [];
                        req.on('data', function (chunk) {
                            arr.push(chunk);
                        });
                        req.on('end', function () {
                            var a = require('querystring').parse(Buffer.concat(arr).toString());
                            if (pathname === '/api/send') {
                                data.data.forEach(function (v, i) {
                                    if (a.name === v.name && a.pwd === v.pwd) {
                                        return res.end(JSON.stringify({'code': 1}));
                                    };
                                });
                                res.end(JSON.stringify({'code': 0, 'mesg': '请输入正确的用户名或密码'}));
                            } else {
                                data.data.push(a);
                                fs.writeFileSync(path.join(__dirname, 'mock', 'data', 'data.json'), JSON.stringify(data));
                                res.end('注测成功');
                            }
                        });
                    } else {
                        res.end(JSON.stringify(mock(req.url)));
                    }
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});
gulp.task('minjs', function () {
    gulp.src('src/js/page/word.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(minjs())
        .pipe(gulp.dest('build/js/page'));
});
gulp.task('mincss', function () {
    gulp.src('src/scss/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(mincss())
        .pipe(gulp.dest('build/css'));
});
gulp.task('minhtml', function () {
    gulp.src('src/myself/search.html')
        .pipe(minhtml({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build/myself'));
});
gulp.task('build', function () {
    gulp.src('build')
        .pipe(server({
            port: 6060,
            host: 'localhost',
            open: true,
            middleware: function (req, res) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    if (/\/api\/send/.test(pathname)) {
                        var arr = [];
                        req.on('data', function (chunk) {
                            arr.push(chunk);
                        });
                        req.on('end', function () {
                            var a = require('querystring').parse(Buffer.concat(arr).toString());
                            if (pathname === '/api/send') {
                                data.data.forEach(function (v, i) {
                                    if (a.name === v.name && a.pwd === v.pwd) {
                                        return res.end(JSON.stringify({'code': 1}));
                                    };
                                });
                                res.end(JSON.stringify({'code': 0, 'mesg': '请输入正确的用户名或密码'}));
                            } else {
                                data.data.push(a);
                                fs.writeFileSync(path.join(__dirname, 'mock', 'data', 'data.json'), JSON.stringify(data));
                                res.end('注测成功');
                            }
                        });
                    } else {
                        res.end(JSON.stringify(mock(req.url)));
                    }
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'build', pathname)));
                }
            }
        }));
});