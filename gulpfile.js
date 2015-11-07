'use strict';

/*!
 * Module dependencies.
 */

var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var gulpIgnore = require('gulp-ignore');
var aws = require('gulp-awspublish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var footer = require('gulp-footer');
var karma = require('karma').server;
var less = require('less-stream');
var bump = require('gulp-bump');
var gulpif = require('gulp-if');
var gulp = require('gulp');
var fs = require('fs');

// conventions
var fonts = ['.eot', '.svg', '.ttf', '.woff', '.otf'];
var images = ['.png', '.jpeg', '.jpg', '.gif'];
var envs = ['testing', 'staging', 'production'];
var versions = ['patch', 'minor', 'major'];
var apps = fs.readdirSync(__dirname + '/public/apps');
var locales = fs.readdirSync(__dirname + '/public/locales');

// make sure apps only contains dirs
apps = apps.filter(dir(__dirname + '/public/apps'));

// banner
var banner = [
  '/**',
  ' * <%= pkg.name %>',
  ' * <%= pkg.description %>',
  ' * @version <%= pkg.version %>',
  ' * Copyright(c) Safety Changer',
  ' */',
  '', ''
].join('\n');

// create tasks for release
releases(prepare());

// create tasks for test
tests();

// create tasks for publishing to s3
publish();

// put all the locales and translations per app in one object
// allLocales[app1][en],
// allLocales[app1][nl]
// this makes it easier to inject to window.locales
var allLocales = {};
buildLocales();

// create all release tasks
apps.forEach(function (app) {
  versions.forEach(function (version) {
    gulp.task('release:' + app + ':' + version, function () {
      return release.call(this, app, version);
    });
  });
});

// used to make releases and tests
var pkg;          // app.json file of the app
var dist;         // dist directory
var path;         // path to the app
var version;      // bumped version
var files = [];   // js files required by the app

/**
 * Bump
 */

gulp.task('bump', function () {
  return gulp.src(path + '/app.json')
    .pipe(bump({ type: version }))
    .pipe(gulp.dest(path + '/'));
});

/**
 * Concat js
 */

gulp.task('concat', ['bump', 'templates'], function () {
  // don't use require here as it will be cached and doesn't get the
  // appropriate result
  pkg = JSON.parse(fs.readFileSync(path + '/app.json'));
  var appLocale = JSON.stringify(allLocales[pkg.name]) + ';\n';
  return gulp.src(files)
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(header('window.locales = ' + appLocale))
      .pipe(header(banner, { pkg: pkg }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist + '/'));
});

/**
 * Minify js
 *
 * TODO (madhums): add sourcemaps for minified files
 */

gulp.task('minify', ['concat'], function () {
  return gulp.src(dist + '/app.js')
    .pipe(uglify({ mangle: false }))
    .pipe(rename('app.min.js'))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(footer('//# sourceMappingURL=app.js.map'))
    .pipe(gulp.dest(dist + '/'));
});

/**
 * Less to css
 *
 * concat is a dependency coz we need pkg to be populated with bumped version.
 * we can also just read the file and parse it here. but its ok!
 */

gulp.task('less', ['bump', 'concat'], function () {
  // modify vars for releases and production
  var options = {
    modifyVariables: {
      'fa-font-path': '"fonts"',
      'icon-font-path': '"fonts/"',
      'sc-font-path': '"fonts"',
      'img-path': '""',
      'sc-root': ''
    },
    paths: ['./components']
  };

  return gulp.src(path + '/app.less')
    .pipe(sourcemaps.init())
      .pipe(concat('app.css'))
      .pipe(less(options))
      .pipe(header(banner, { pkg: pkg }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist));
});

/**
 * Minify css
 *
 * TODO (madhums): add sourcemaps for minified files
 */

gulp.task('minify-css', ['less'], function () {
  return gulp.src(dist + '/app.css')
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(dist));
});

/**
 * Templates
 */

gulp.task('templates', ['bump'], function () {
  files.push(dist + '/templates.js');
  // ignore coverage folder
  return gulp.src([
      path + '/**/*.html',
      '!' + path + '/development.html',
      '!' + path + '/production.html'
    ])
    .pipe(templateCache({ module: pkg.name, root: '/apps/' + pkg.name }))
    .pipe(gulp.dest(dist));
});

/**
 * component-templates
 */

gulp.task('component-templates', ['templates'], function () {
  files.push(dist + '/component-tpls/templates.js');

  var _tpls = [];

  pkg.components.forEach(function (com) {
    _tpls.push('./components/' + com.split('/')[0] + '/*.html');
  });

  _tpls.push('!./components/**/*_test.html');

  // ignore coverage folder
  return gulp.src(_tpls)
    .pipe(templateCache({
      module: pkg.name,
      base: function (file) {
        var arr = file.path.split('/');
        return '/' + arr[arr.length - 2] + '/' + arr[arr.length - 1];
      }
    }))
    .pipe(gulp.dest(dist + '/component-tpls'));
});

/**
 * test components
 */

gulp.task('test:components', function (done) {
  karma.start({
    configFile: __dirname + '/components/karma.conf.js'
  }, done);
});

/**
 * copy fonts
 */

gulp.task('copy:fonts', function () {
  return gulp.src([ __dirname + '/public/assets/fonts/**' ])
    .pipe(gulp.dest(dist + '/fonts'));
});

/**
 * copy images
 */

gulp.task('copy:img', function () {
  return gulp.src([ __dirname + '/public/assets/img/**' ])
    .pipe(gulp.dest(dist + '/img'));
});

/**
 * copy html
 */

gulp.task('copy:html', function () {
  return gulp.src([ __dirname + '/public/apps/'+ pkg.name +'/production.html'])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(dist));
});

/**
 * Default
 */

gulp.task('default', [
  'test',
  'release'
]);

/**
 * test an app
 */

function test (app, done) {
  karma.start({
    configFile: __dirname + '/public/apps/'+ app +'/karma.conf.js'
  }, done);
}

/**
 * test all apps
 */

function tests () {
  var tasks = ['test:components'];
  apps.forEach(function (app) {
    tasks.push('test:' + app);
    gulp.task('test:' + app, function (done) {
      return test.call(this, app, done);
    });
  });
  // gulp test
  gulp.task('test', tasks);
}

/**
 * prepare
 *
 * Prepare tasks
 *
 * Parse the following to produce an array of tasks
 *
 * Examples:
 *
 * release:app1:minor   => release app1 with minor
 * release:minor        => release all with minor bump
 * release:app1         => release app1 app with patch
 *
 * test:app1            => test app1 app
 */

function prepare () {
  var releases = [];

  // release:minor
  versions.forEach(function (version) {
    var _tasks = [];
    // all apps with `version` bump
    apps.forEach(function (app) {
      _tasks.push('release:' + app + ':' + version);
    });
    releases.push({
      task: 'release:' + version,
      arr: _tasks
    });
  });

  // release:app1
  apps.forEach(function (app) {
    // `app` with patch bump
    releases.push({
      task: 'release:' + app,
      arr: ['release:' + app + ':patch']
    });
  });

  // release:app1:minor
  apps.forEach(function (app) {
    versions.forEach(function (version) {
      releases.push({
        task: 'release:' + app + ':' + version,
        arr: ['release:' + app + ':' + version]
      });
    });
  });

  var _tasks = [];
  apps.forEach(function (app) {
    _tasks.push('release:' + app + ':patch');
  });

  releases.push({
    task: 'release',
    arr: _tasks
  });

  return releases;
}

/**
 * releases
 */

function releases (tasks) {
  // for gulp release:app|version
  tasks.forEach(function (o) {
    gulp.task(o.task, o.arr);
  });
}

/**
 * release
 */

function release (name, ver) {
  path = './public/apps/' + name;
  pkg = require(path + '/app.json');
  dist = './public/dist/' + pkg.name;
  version = ver;

  files = pkg.dependencies.map(function (dep) {
    return 'public/bower_components/' + dep;
  });
  files = files.concat(pkg.components.map(function (com) {
    return 'components/' + com;
  }));
  files = files.concat(pkg.files.map(function (file) {
    return 'public/apps/' + name + '/' + file;
  }));

  return gulp.start(
    'bump',
    'templates',
    'component-templates',
    'concat',
    'minify',
    'less',
    'minify-css',
    'copy:fonts',
    'copy:img',
    'copy:html'
  );
}

/**
 * Publish
 *
 * gulp publish:testing:app1
 */

function publish () {
  apps.forEach(function (app) {
    // This is mostly used by wercker
    // $ gulp publish:app1
    if (process.env.NODE_ENV) {
      gulp.task('publish:' + app, function () {
        return upload.call(this, process.env.NODE_ENV, app);
      });
    }

    // $ gulp publish:testing:app1
    envs.forEach(function (env) {
      gulp.task('publish:' + env + ':' + app, function () {
        return upload.call(this, env, app);
      });
    });
  });
}

/**
 * upload
 */

function upload (env, app) {
  var pkg = JSON.parse(fs.readFileSync('public/apps/' + app + '/app.json'));

  try {
    var config = JSON.parse(fs.readFileSync(__dirname + '/config/s3.json'));
    Object.keys(config[env]).forEach(function (key) {
      process.env['S3_' + key.toUpperCase()] = config[env][key];
    });
  } catch (err) {
    console.log('Make sure you copy config/s3.example.json to config/s3.json');
    console.log(err);
  }

  // require it again so that the process.env's are replaced
  var s3creds = require('./config/s3');
  var creds = s3creds[env];
  var s3 = aws.create(creds);

  // Set max-age depending on env
  var maxAge = require('./config/max-age.json')[process.env.NODE_ENV || 'testing'];

  // custom headers
  var headers = {
    'Cache-Control': 'max-age='+ maxAge +', no-transform, public'
  };

  var opts = {
    force: true // skip cache
  };

  // pseudo dir on s3
  function pseudoDir (prefix) {
    return function (path) {
      path.dirname = '/' + pkg.name + '/' + prefix;
      if (~fonts.indexOf(path.extname)) {
        path.basename = 'fonts/' + path.basename;
      }
      if (~images.indexOf(path.extname)) {
        path.basename = 'img/' + path.basename;
      }
    };
  }

  function cssOrJs (file) {
    // .css (4 chars) and .js (3 chars)
    var ext = file.path.slice(-4);
    return ~ext.indexOf('.js') || ~ext.indexOf('.css');
  }

  // Pre-release (Automated PR deployments to s3)
  // Deploy to s3 APP_NAME/BRANCH_NAME
  if (env === 'testing' &&
    process.env.WERCKER_GIT_BRANCH &&
    !~'develop staging master'.indexOf(process.env.WERCKER_GIT_BRANCH)) {
    gulp.src('./public/dist/' + pkg.name + '/**/**')
      .pipe(rename(pseudoDir(process.env.WERCKER_GIT_BRANCH)))    // app1/feature/blabla
      .pipe(gulpif(cssOrJs, aws.gzip()))
      .pipe(s3.publish(headers, opts))
      .pipe(aws.reporter());
    return;
  }

  // TODO (madhums): figure out a way to pipe source streams to multiple
  // destination streams
  // http://stackoverflow.com/q/21951497/232619

  // The dist will be uploded to app/version directory
  gulp.src('./public/dist/' + pkg.name + '/**/**')
    .pipe(rename(pseudoDir(pkg.version))) // app1/0.2.3
    .pipe(gulpif(cssOrJs, aws.gzip()))
    .pipe(s3.publish(headers, opts))
    .pipe(aws.reporter());

  gulp.src('./public/dist/' + pkg.name + '/**/**')
    .pipe(rename(pseudoDir('latest')))    // app1/latest
    .pipe(gulpif(cssOrJs, aws.gzip()))
    .pipe(s3.publish(headers, opts))
    .pipe(aws.reporter());
}

/**
 * Build locales object
 */

function buildLocales () {
  apps.forEach(function (app) {
    allLocales[app] = {};
    locales.forEach(function (locale) {
      var file = __dirname + '/public/locales/' + locale + '/' + app + '.json';
      allLocales[app][locale] = JSON.parse(fs.readFileSync(file));
    });
  });
}

/**
 * dir
 */

function dir (path) {
  return function (app) {
    return fs.statSync(path + '/' + app).isDirectory();
  };
}
