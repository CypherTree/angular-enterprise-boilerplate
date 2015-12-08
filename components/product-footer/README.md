## product-footer

Display product-footer


## Usage

```javascript
var app = angular.module('product-footer', []);
```

```html
<ab-product-footer social="model.social" cities="model.cities" product-name="theArt Boutique">
</ab-product-footer>
```

####Outputs

```html
<ab-product-footer social="model.social" cities="model.cities" product-name="theArt Boutique" class="ng-isolate-scope">
  <div class="ab-product-footer">
    <div class="row ab-footer-upper">
      <div class="col-md-4 col-xs-12">
        <p class="footer-headings">CONNECT WITH US</p>
        <hr>
        <span>
	 			<a ng-href="#" ng-repeat="item in social" class="ng-scope" href="#">
	 				<i class="fa fa-phone fa-2x social-link link-alignment"></i>
 				</a>
 				<a ng-href="https://www.gmail.com" ng-repeat="item in social" class="ng-scope" href="https://www.gmail.com">
	 				<i class="fa fa-envelope fa-2x social-link link-alignment"></i>
 				</a>
 				<a ng-href="https://www.facebook.com/cyphertree" ng-repeat="item in social" class="ng-scope" href="https://www.facebook.com/cyphertree">
	 				<i class="fa fa-facebook fa-2x social-link link-alignment"></i>
 				</a>
 				<a ng-href="https://www.linkedin.com/cyphertree" ng-repeat="item in social" class="ng-scope" href="https://www.linkedin.com/cyphertree">
	 				<i class="fa fa-linkedin fa-2x social-link link-alignment"></i>
 				</a>
 				<a ng-href="https://www.twitter.com/cyphertree" ng-repeat="item in social" class="ng-scope" href="https://www.twitter.com/cyphertree">
	 				<i class="fa fa-twitter fa-2x social-link link-alignment"></i>
 				</a>
 				<a ng-href="https://www.pinterest.com/cyphertree" ng-repeat="item in social" class="ng-scope" href="https://www.pinterest.com/cyphertree">
	 				<i class="fa fa-pinterest fa-2x social-link link-alignment"></i>
 				</a>
	 		</span>
      </div>
      <div class="col-md-4 col-xs-12">
        <p class="footer-headings ng-binding">theArt Boutique</p>
        <hr>
        <div class="col-md-6 col-xs-6">
          <ul class="ab-footer-column">
            <a href="#">
              <li>About us</li>
            </a>
            <a href="#">
              <li class="ng-binding">Carees @ theArt Boutique</li>
            </a>
            <a href="#">
              <li>Blog</li>
            </a>
          </ul>
        </div>
        <div class="col-md-6 col-xs-6">
          <ul class="ab-footer-column">
            <a href="#">
              <li>Press Coverage</li>
            </a>
            <a href="#">
              <li>Team</li>
            </a>
          </ul>
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <p class="footer-headings">NEED HELP ?</p>
        <hr>
        <div class="col-md-6 col-xs-6">
          <ul class="ab-footer-column">
            <a href="#">
              <li>Privacy Policy</li>
            </a>
            <a href="#">
              <li>Payment &amp; Security</li>
            </a>
            <a href="#">
              <li>Shipping &amp; Delivery</li>
            </a>
            <a href="#">
              <li>Terms of Use</li>
            </a>
          </ul>
        </div>
        <div class="col-md-6 col-xs-6">
          <ul class="ab-footer-column">
            <a href="#">
              <li>Terms of Offer for Sale</li>
            </a>
            <a href="#">
              <li>No Worries</li>
            </a>
            <a href="#">
              <li>EMI on Credit Cards</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
	    <div class="col-md-12 col-xs-12">
	        <div class="ab-footer-lower">
	          	Delivering in:
	          	<span ng-repeat="city in cities" class="ng-binding ng-scope"> Pune | </span>
	          	<span ng-repeat="city in cities" class="ng-binding ng-scope"> Mumbai | </span>
	        </div>
	    </div>
    </div>
  </div>
</ab-product-footer>
```

## API:
`product-name`:  (required) The name of product.
`social`:  (required) Array of social sites.
`cities`:  (required) Array of cities.


## Classes available:

 - `ab-product-footer`

