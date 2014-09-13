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
..* `IE Mobile`
..* `IE`
..* `Firefox Mobile`
..* `Firefox`
..* `Android`
..* `Chrome Mobile`
..* `Chrome`
..* `Opera Mini`
..* `Opera Mobile`
..* `Opera`
..* `Safari Mobile`
..* `Safari`
..* `Blackberry`
... If none of these browsers are detected, the user agent string is returned for parsing.

Image Lazy Loading
------------------

There are three methods to call for lazy loading images:

- `bsLazyLoadImages(fadeIn)` : fadeIn is true/false; this lazy loads all images on the page with the required parts in the image tag (see below)
- `bsLazyLoadImagesWithOffset(fadeIn, offset)` : fadeIn is true/false; offset is the number of pixels outside of the viewport the image should load
- `bsLazyLoadImage(img, fadeIn)` : load a specific image (must be passed as a jQuery object, i.e. `$('#myImage')`); fadeIn is true/false

You should call these methods on window load, on window scroll, or whenever you want the images to load:

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

There are two parts that the image tag requires in order for the script to lazily load the images:

- `class="bsLazyLoad"`
- `data-src="path/to/image/to/be/loaded.jpg"`

An example image tag:

```html
	<img src="blank.gif" data-src="image-to-load.jpg" class="bsLazyLoad">
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