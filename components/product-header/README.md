## product-header

Display Product Header


## Usage

```javascript
var app = angular.module('product-header', []);
```

```html
<ab-product-header ng-model="item">
</ab-product-header>
```

####Outputs

```html
<div class="row ab-header" ng-repeat="item in items">
</div>
```

## API:
`ng-model`:  (required) array of product header items, following json example

```javascript
  {
  	header: "The Art Boutique",
  	placeholder: "Search",
  	currencies: [
  		{label: "INR",
  		value: "rupees"}
  	],
  	socialLinks: [ 
  	{"facebook" : {
  	url: "https://www.facebook.com/",
  	icon: "facebook"
  	} }
  	]
  }

## Classes available:

-`ab-header`