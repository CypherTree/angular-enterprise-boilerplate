## nav-header

Display navigation menu


## Usage

```javascript
var app = angular.module('nav-header', []);
```

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
`ng-model`:  (required) array of menu items, following json example

```javascript
{
	title: 'Menuitem',
	categories: [
		{
			title: 'Submenuitem1',
			href: '/submenuitem1'
		},
		{
			title: 'Submenuitem2',
			href: '/submenuitem2'
		}
	]
}
```

## Classes available:

 - `ab-nav-header`

