## sc-translate

A simple module that uses the `angular-translate` to initialize translations

## Dependencies

    pascalprecht.translate

## Usage

Make sure you set `window.locales` to the object/json that contains the
translations mapping.

```js
window.locales = {
  en: {
    'HELLO': 'Hello'
  },
  // ...
}
```

Then simply include

```js
angular.module('APP', [
  'sc-translate',
  ...
])
```

You can further extend this by adding more tranlsation modules
