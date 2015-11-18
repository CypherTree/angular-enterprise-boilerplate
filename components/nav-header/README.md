## nav-header

Display navigation menu


## Usage

js
var app = angular.module('nav-header', []);


```html
<ab-nav-header ng-model="items">
</ab-nav-header>
```

####Outputs

```html
<div class="ab-nav-header">
    <div class="breadcrumbs"
        ng-repeat="item in items"
        ng-include="'nav-header-item-template'" 
        ng-click="expand(item, $event, $index)">
    </div>
</div>
```

## API:
`ng-model`:  (required) to fetch the value of given menu items and sub-menu items


## Classes available:

 - `ab-nav-header`

