/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'javascripts',
    '@angular':                   'node_modules/@angular',
    'moment':                     'node_modules/moment/moment.js',
    'rxjs':                       'node_modules/rxjs',

    'angular2localization':       'node_modules/angular2localization',
    'angular2-cookie':            'node_modules/angular2-cookie',
    
    'angular2-notifications':     'node_modules/angular2-notifications',
    'angular2-clipboard':         'node_modules/angular2-clipboard',
    'clipboard':                  'node_modules/clipboard/dist/clipboard.js',
    'jquery':                     'node_modules/jquery/dist/jquery.min.js',
    'bootstrap-js':               'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'angulartics2':               'node_modules/angulartics2'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2localization':       { format: 'cjs', defaultExtension: 'js' },
    'angular2-cookie':            { main: 'core.js',  defaultExtension: 'js' },

    'angular2-notifications':     { main: 'components.js', defaultExtension: 'js' },
    'clipboard' :                 { defaultExtension: 'js' },
    'angular2-clipboard':         { main: 'index.js', defaultExtension: 'js' },
    "angulartics2":               { defaultExtension: "js", main: 'index.js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  };
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  }
  System.config(config);
})(this);
