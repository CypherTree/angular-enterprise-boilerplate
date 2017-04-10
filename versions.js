
/**
 * Spits out the current versions of the apps
 */

var fs = require('fs');
var path = __dirname + '/public/apps';
var apps = fs.readdirSync(path);

console.log();

apps.forEach(function (app) {
  if (~app.indexOf('.')) return;
  var pkg = JSON.parse(fs.readFileSync(path + '/' + app + '/app.json'));
  console.info('\t' + app + ' ' + pkg.version);
});

console.log();
