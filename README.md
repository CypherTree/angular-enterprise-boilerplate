## art-boutique-ui

Art boutique UI

## Dependencies

* [node](http://nodejs.org)
* [npm](http://npmjs.org)
* [bower](http://bower.io) (`npm install bower -g`)
* [gulp](http://gulpjs.com) (`npm install gulp -g`)

## Installation

Clone the repo and

```
$ npm install
$ npm link
$ npm start
```

Open `http://localhost:3000/APP` where `APP` is one of apps in `public/apps`


## Tests

```sh
$ gulp test               # tests all apps and components
$ gulp test:components    # tests only components
$ gulp test:app1          # tests only app1
```

Or you can also run

```sh
$ npm test
```

which would test all the apps, modules and components.

## Coverage

You can find all the test coverage in `public/coverage` after you run the tests. This is not included in git.

## Releases

```sh
$ gulp release:app1       # bumps patch
$ gulp release:app1:minor # bumps minor
$ gulp release:app1:major # bumps major
$ gulp release:minor      # bumps minor for all apps
$ gulp release            # bumps patch for all apps
```

## Publish

Before you pubish

```sh
$ cp config/s3.example.json config/s3.json
```

Get the credentials from anit.rai@cyphertree.com and fill it in `config/s3.json`.

Then to publish

```sh
$ gulp publish:testing:app1
$ gulp publish:staging:app1
$ gulp publish:production:app1
```

## zap

> coz building apps should be like zap!

Generator for components, apps and modules.

to use it, run

```sh
$ npm link
```

Then

```sh
$ zap component name        # add a new component `name`
$ zap component name app    # add a new component `name` to app `app`
$ zap app name              # add a new app `name`
$ zap module name app       # add a new module `name` to app `app`

# add module about to app app1 with route '/about' and controller 'AboutCtrl'
$ zap module about app1 /about AboutCtrl
```

Need help?

```sh
$ zap --help
```

Adding a new app will also add a locale file to all the locales under `public/locales/`.

P.S: Make sure

- Name of a component, app or module should not contain Uppercase characters, underscores.

## Further reading

- [zap](https://www.youtube.com/watch?v=pqlsWZ9Jhks) - Introduction to zap
- [gulp](https://medium.com/@contrahacks/gulp-3828e8126466) - Introduction to gulp

## Some angular issues to be aware of

- https://github.com/angular/angular.js/issues/1699
- https://github.com/angular/angular.js/issues/738
- https://github.com/angular-ui/bootstrap/pull/2984
