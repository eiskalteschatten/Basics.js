Basics.js
=========

A script with a few basic JavaScript functions

Requirements
------------

- jQuery

Browser Detection
-----------------

There is one method to call for getting the user's browser:

- `bsGetBrowser()` : detects the type of browser and returns the following possible values: 
 * `IE Mobile`
 * `IE`
 * `Firefox Mobile`
 * `Firefox`
 * `Android`
 * `Chrome Mobile`
 * `Chrome`
 * `Opera Mini`
 * `Opera Mobile`
 * `Opera`
 * `Safari Mobile`
 * `Safari`
 * `Blackberry`
 * If none of these browsers are detected, the user agent string is returned for parsing.

Image Lazy Loading
------------------

There are five methods to call for lazy loading images:

- `bsLazyLoadImages(fadeIn)` : "fadeIn" is true/false; this lazy loads all images on the page with the required parts in the image tag (see below)
- `bsLazyLoadImagesWithOffset(fadeIn, offset)` : "fadeIn" is true/false; "offset" is the number of pixels outside of the viewport the image should load
- `bsLazyLoadImagesWithCallback(fadeIn, callback)` : "fadeIn" is true/false; "callback" is the name of the method to be called (can be null); this lazy loads all images on the page with the required parts in the image tag (see below)
- `bsLazyLoadImagesWithOffsetAndCallback(fadeIn, offset, callback)` : "fadeIn" is true/false; "offset" is the number of pixels outside of the viewport the image should load; "callback" is the name of the method to be called (can be null)
- `bsLazyLoadImage(img, fadeIn, callback)` : load a specific image (must be passed as a jQuery object, i.e. `$('#myImage')`); "fadeIn" is true/false; "callback" is the name of the method to be called (can be null)

You should call these methods on window load, on window scroll, or whenever you want the images to load. A few examples:

```javascript
	$(document).ready(function() {	 				
		bsLazyLoadImages(true);
	});
```

```javascript
	$(window).scroll(function() {	 				
		bsLazyLoadImagesWithOffset(false, 300);
	});
```

```javascript
	$('#myButton').click(function() {	 				
		bsLazyLoadImages(false);
	});
```

```javascript
	$(window).scroll(function() {	 				
		bsLazyLoadImagesWithOffsetAndCallback(true, 1000, "imageCallback();");
	});
```

There are two parts that the image tag requires in order for the script to lazily load the images:

- `class="bsLazyLoad"`
- `data-src="path/to/image/to/be/loaded.jpg"` 

If you want to automatically load larger images for a Retina screen, add this to your image tag as well as the normal 'data-src':

- `data-retina-src="path/to/retina/image/to/be/loaded.jpg"`

An example image tag:

```html
	<img src="blank.gif" data-src="image-to-load.jpg" class="bsLazyLoad">
```

Preload Images
--------------

There is one method to call for preloading images:

- `bsPreloadImages(arrayOfImages)` : "arrayOfImages" must be an array of image element objects, i.e.:

```javascript
	var arrayOfImages = document.getElementsByClassName('images-to-preload');
```


Animated Scrolling
------------------

There are three methods for animated scrolling:

- `bsScrollTo(px)` : scrolls vertically to a certain pixel on the page
- `bsScrollToId(id)` : scrolls to an element with a certain id
- `bsScrollToTop()` : scrolls to the top of the page


Check if an element is in the viewport or is about to come into the viewport
----------------------------------------------------------------------------

There are two methods for checking if an element is already in the viewport or is about to come into the viewport:

- `bsIsScrolledIntoView(elem)` : always checks whether the passed element is fully in the viewport with no offset
- `bsIsScrolledIntoViewWithOffset(elem, offset)` : checks whether the passed element is in the viewport or is about to enter the viewport based on the passed offset in pixels


Check if device is a touch screen
----------------------------------

There is one method which checks whether the user's device is a touch device or not:

- `bsIsTouch()` : returns true or false


Check if device is has a retina display
---------------------------------------

There is one method which checks whether the user's device has a retina display or not:

- `bsIsRetina()` : returns true or false


Check if device is a mobile device
----------------------------------

There is one method which checks whether the user is using a mobile device:

- `bsIsMobileBrowser()` : returns true or false


Set and get cookies
-------------------

There are two methods for managing cookies:

- `bsSetCookie(c_name, value, exdays)` : all passed variables are strings; "c_name" is the name of the cookie, "value" is the value to be set, and "exdays" are the number of days the cookie should be valid for
- `bsGetCookie(c_name)` : returns the value of the specified cookie; "c_name" is a string with the name of the cookie