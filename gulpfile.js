'use strict';

/*!
 * Module dependencies.
 */

var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var aws = require('gulp-awspublish');
var parallelize = require("concurrent-transform");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var footer = require('gulp-footer');
var replace = require('gulp-replace');
var karma = require('karma').server;
var less = require('less-stream');
var gulpif = require('gulp-if');
var gulp = require('gulp');
var fs = require('fs');
var closureCompiler = require('gulp-closure-compiler');


// conventions
var fonts = ['.eot', '.svg', '.ttf', '.woff', '.otf'];
var images = ['.png', '.jpeg', '.jpg', '.gif'];
var envs = ['dev', 'staging', 'production'];
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
  envs.forEach(function (env) {
    gulp.task('release:' + app + ':' + env, function () {
      return release.call(this, app, env);
    });
  });
});

// used to make releases and tests
var pkg;          // app.json file of the app
var dist;         // dist directory
var path;         // path to the app
var files = [];   // js files required by the app

/**
 * Bump
 */

gulp.task('bump', function () {
  return gulp.src(path + '/app.json')
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
    .pipe(concat('app.js', {newLine: ';'}))
    .pipe(header('window.locales = ' + appLocale))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist + '/'));
});

/**
 * Minify js
 *
 */

gulp.task('minify', ['concat'], function () {
  return gulp.src(dist + '/app.js')
    .pipe(uglify({mangle: false}))
    .pipe(closureCompiler({
      compilerPath: 'public/bower_components/closure-compiler/compiler.jar',
      fileName: 'app.' + pkg.version + '.min.js',
      continueWithWarnings: true,
      compilerFlags: {
        warning_level: 'QUIET',
      }
    }))
    .pipe(gulp.dest(dist))
    .pipe(header(banner, {pkg: pkg}))
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
      'fa-font-path'  : '"fonts"',
      'icon-font-path': '"fonts/"',
      'cs-font-path'  : '"fonts"',
      'img-path'      : '""',
      'component-root': ''
    },
    paths          : ['./components']
  };

  return gulp.src(path + '/app.less')
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(less(options))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist));
});

/**
 * Minify css
 *
 */

gulp.task('minify-css', ['less'], function () {
  return gulp.src(dist + '/app.css')
    .pipe(minifyCSS())
    .pipe(rename('app.' + pkg.version + '.min.css'))
    .pipe(header(banner, {pkg: pkg}))
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
    .pipe(templateCache({module: pkg.name, root: '/apps/' + pkg.name}))
    .pipe(gulp.dest(dist));
});

/**
 * component-templates
 */

gulp.task('component-templates', ['templates'], function () {
  files.push(dist + '/component-tpls-' + pkg.version +'/templates.js');

  var _tpls = [];

  pkg.components.forEach(function (com) {
    _tpls.push('./components/' + com.split('/')[0] + '/**/*.html');
  });

  _tpls.push('!./components/**/*_test.html');
  _tpls.push('!./components/**/*_example*.html');
  

  // ignore coverage folder
  return gulp.src(_tpls)
    .pipe(templateCache({
      module: pkg.name,
      base  : function (file) {
        var arr = file.path.split('/components/');
        return '/' + arr[1]
      }
    }))
    .pipe(gulp.dest(dist + '/component-tpls-' + pkg.version));
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
  return gulp.src([__dirname + '/public/assets/fonts/**'])
    .pipe(gulp.dest(dist + '/assets/fonts'))
    .pipe(gulp.dest(dist + '/fonts'));
});

/**
 * copy images
 */

gulp.task('copy:img', function () {
  return gulp.src([__dirname + '/public/assets/img/**'])
    .pipe(gulp.dest(dist + '/assets/img'))
    .pipe(gulp.dest(dist + '/img'));
});


/**
 * copy favicons
 */

gulp.task('copy:favicons', function () {
  return gulp.src([__dirname + '/public/assets/favicons/**'])
    .pipe(gulp.dest(dist + '/assets/favicons'))
    .pipe(gulp.dest(dist + '/favicons'));
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

function test(app, done) {
  karma.start({
    configFile: __dirname + '/public/apps/' + app + '/karma.conf.js'
  }, done);
}

/**
 * test all apps
 */

function tests() {
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
 * release:app1:env   => release app1 with env settings
 * release:env        => release all with env settings
 * release:app1       => release app1 app with dev env
 *
 * test:app1          => test app1 app
 */

function prepare() {
  var releases = [];

  // release:env
  envs.forEach(function (env) {
    var _tasks = [];
    // all apps with `env` settings
    apps.forEach(function (app) {
      _tasks.push('release:' + app + ':' + env);
    });
    releases.push({
      task: 'release:' + env,
      arr : _tasks
    });
  });

  // release:app1
  apps.forEach(function (app) {
    // `app` with dev settings
    releases.push({
      task: 'release:' + app,
      arr : ['release:' + app + ':dev']
    });
  });

  // release:app1:env
  apps.forEach(function (app) {
    envs.forEach(function (env) {
      releases.push({
        task: 'release:' + app + ':' + env,
        arr : ['release:' + app + ':' + env]
      });
    });
  });

  var _tasks = [];
  apps.forEach(function (app) {
    _tasks.push('release:' + app + ':dev');
  });

  releases.push({
    task: 'release',
    arr : _tasks
  });

  return releases;
}

/**
 * releases
 */

function releases(tasks) {
  // for gulp release:app|env
  tasks.forEach(function (o) {
    gulp.task(o.task, o.arr);
  });
}

/**
 * release
 */

function release(name, env) {
  path = './public/apps/' + name;
  pkg = require(path + '/app.json');
  dist = './public/dist/' + pkg.name;
  env = env;

  files = pkg.dependencies.map(function (dep) {
    return 'public/bower_components/' + dep;
  });
  files = files.concat(pkg.components.map(function (com) {
    return 'components/' + com;
  }));
  files = files.concat(pkg.files.map(function (file) {
    return 'public/apps/' + name + '/' + file;
  }));

  var cssJsIncludes = [
    '<link rel="stylesheet" href="app.' + pkg.version + '.min.css"/>',
    '<script src="app.' + pkg.version + '.min.js" type="text/javascript"></script>',
    '<script src="component-tpls-' + pkg.version +'/templates.js" type="text/javascript"></script>'
  ].join('')

  var config = '<script>' + 'window.CONFIG =  window.CONFIG || ' + JSON.stringify(pkg.config[env]) + ';</script>';
  gulp.src([__dirname + '/public/apps/' + pkg.name + '/production.html'])
    .pipe(rename('index.html'))
    .pipe(replace('<!-- INSERT_CONFIG -->', config))
    .pipe(replace('<!-- INSERT_CSS_JS -->', cssJsIncludes))
    .pipe(gulp.dest(dist));

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
    'copy:favicons'
  );
}

/**
 * Publish
 *
 * gulp publish:[env]:app1
 */

function publish() {
  apps.forEach(function (app) {
    // This is mostly used by wercker
    // $ gulp publish:app1
    if (process.env.NODE_ENV) {
      gulp.task('publish:' + app, function () {
        return upload.call(this, process.env.NODE_ENV, app);
      });
    }

    // $ gulp publish:[env]:app1
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

function upload(env, app) {
  var pkg = JSON.parse(fs.readFileSync('public/apps/' + app + '/app.json'));

  if(process.env.S3_KEY && process.env.S3_SECRET && process.env.S3_BUCKET) {
    console.log("Environments variables preset.")
  } else {
    try {
      var config = JSON.parse(fs.readFileSync(__dirname + '/config/s3.json'));
      Object.keys(config[env]).forEach(function (key) {
        process.env['S3_' + key.toUpperCase()] = config[env][key];
      });
    } catch (err) {
      console.log('Make sure you copy config/s3.example.json to config/s3.json or declare environment variables');
      console.log(err);
    }
  }

  // require it again so that the process.env's are replaced
  var s3creds = require('./config/s3');
  var creds = s3creds[env];

  creds.params = { Bucket: creds.bucket };
  console.log('creds are ', creds);
  var s3 = aws.create(creds);

  // Set max-age depending on env
  var maxAge = require('./config/max-age.json')[process.env.NODE_ENV || 'dev'];

  // custom headers
  var headers = {
    'Cache-Control': 'max-age=' + maxAge + ', no-transform, public'
  };

  var opts = {
    force: true // skip cache
  };

  // pseudo dir on s3
  function pseudoDir(prefix) {
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

  function cssOrJs(file) {
    // .css (4 chars) and .js (3 chars)
    var ext = file.path.slice(-4);
    return ~ext.indexOf('.js') || ~ext.indexOf('.css');
  }

  gulp.src('./public/dist/' + pkg.name + '/**/**')
    .pipe(gulpif(cssOrJs, aws.gzip()))
    .pipe(parallelize(s3.publish(headers, opts)))
    .pipe(aws.reporter());
}

/**
 * Build locales object
 */

function buildLocales() {
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

function dir(path) {
  return function (app) {
    return fs.statSync(path + '/' + app).isDirectory();
  };
}
