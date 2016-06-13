var gulp = require('gulp');
var server = require('gulp-express');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var exec = require('child_process').exec;

// launch server
gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']);
 
    // Restart the server when file changes 
    gulp.watch(['app.js'], server.notify);
});

// compile typescripts 
gulp.task('compile', function (cb) {
  exec('npm run tsc', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
    gulp.start('reload');
  });
})

// reload browsersync
gulp.task('reload', function(){
  reload();
});

// start browser sync
gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
        browser: "google chrome",
        port: 8000,
  });
});

// watch for file changes
gulp.task('watch', ['compile'], function() {
  gulp.watch('app/**/*.ts', ['compile']);
});

// run everything
gulp.task('default', ['server', 'watch', 'browser-sync']);
