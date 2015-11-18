## nav-header

Display navigation menu

## Preview



## Usage

js
var app = angular.module('nav-header', []);


html

<div  ng-controller='navHeaderSampleCtrl'>
<ab-nav-header ng-model="categories">
</ab-nav-header>
</div>


Outputs

html

<div class="ab-nav-header">
    <div class="breadcrumbs"
        ng-repeat="item in items"
        ng-include="'nav-header-item-template'" 
        ng-click="expand(item, $event, $index)">
        </div>
</div>


## API:



## Classes available:


