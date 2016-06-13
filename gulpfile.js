var gulp        = require('gulp');
var server = require('gulp-express');
var shell = require('gulp-shell');

// launch server
gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']);
 
    // Restart the server when file changes 
    gulp.watch(['app.js'], server.notify);
});

// compile typscripts
gulp.task('compile', shell.task([
  'npm run tsc'
]));

gulp.task('watch', ['compile'], function() {
  gulp.watch('app/**/*.ts', ['compile']);
});

gulp.task('default', ['server', 'watch']);
