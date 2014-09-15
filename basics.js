/*
*	Basics.js
*	Version 0.2
*	Copyright (c) Alex Seifert 2014
*	http://www.alexseifert.com
*	https://github.com/eiskalteschatten/Basics.js
*/

window.onload = function() {

	// Check for jQuery & load from Google CDN if not available

	if (typeof jQuery == 'undefined') {
		var jq = document.createElement('script'); jq.type = 'text/javascript';
		jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
		document.getElementsByTagName('head')[0].appendChild(jq);
	} 
}


// Browser detection
//		- Following browsers will be detected: Internet Explorer (desktop & mobile), Firefox, Chrome, Chrome mobile, Opera (desktop, mini, mobile), Safari, Safari mobile, Android browser, Blackberry

function bsGetBrowser() {
	var objAgent = navigator.userAgent;
	
	if (objAgent.indexOf("IEMobile") != -1) {
		return "IE Mobile";
	}
	else if (objAgent.indexOf("MSIE") != -1 || objAgent.indexOf("Trident") != -1) {
		return "IE";
	}
	else if (objAgent.indexOf("Firefox") != -1 && bsIsTouch()) {
		return "Firefox Mobile";
	}
	else if (objAgent.indexOf("Firefox") != -1) {
		return "Firefox";
	}
	else if (objAgent.indexOf("Android") != -1) {
		return "Android";
	}
	else if (objAgent.indexOf("Chrome") != -1 && bsIsTouch()) {
		return "Chrome Mobile";
	}
	else if (objAgent.indexOf("Chrome") != -1) {
		return "Chrome";
	}
	else if (objAgent.indexOf("Opera Mini") != -1) {
		return "Opera Mini";
	}
	else if (objAgent.indexOf("Opera Mobi") != -1) {
		return "Opera Mobile";
	}
	else if (objAgent.indexOf("Opera") != -1) {
		return "Opera";
	}
	else if (objAgent.indexOf("Safari") != -1 && bsIsTouch()) {
		return "Safari Mobile";
	}
	else if (objAgent.indexOf("Safari") != -1) {
		return "Safari";
	}
	else if (objAgent.indexOf("Blackberry") != -1) {
		return "Blackberry";
	}
	else {
		return objAgent;
	}
}


// Animated Scrolling

function bsScrollTo(px) {
	$('html, body').animate({scrollTop: px+'px'}, 2000, 'easeInOutCubic');
}

function bsScrollToId(id) {
	if (id.indexOf('#') == -1) {
		id = "#" + id;
	}
	
	$('html, body').animate({scrollTop: $(id).offset().top}, 2000, 'easeInOutCubic');
}

function bsScrollToTop() {
	bsScrollTo('0');
}


// Check if an element is in the viewport

function bsIsScrolledIntoView(elem) {
	return bsIsScrolledIntoViewWithOffset(elem, 0);
}


// Check if an element is in the viewport or is about to come into the viewport with an offset

function bsIsScrolledIntoViewWithOffset(elem, offset) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = $(window).scrollTop() + $(window).height();

	if (!isNaN(offset)) {
		docViewTop -= parseInt(offset);
		docViewBottom += parseInt(offset);
	}

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


// Image lazy loading
// 		- All images that should be lazily loaded require the class "bsLazyLoad" and 
//		  the attribute "data-src" with the path to the image
//		- fadeIn: true/false - Images will fade in after loading

function bsLazyLoadImages(fadeIn) {
	$('img.bsLazyLoad').each(function() {
		bsLazyLoadImage($(this), fadeIn);
	});
}


// Lazy load images with an offset
//		- offset: Pixel offset for when the images should be loaded

function bsLazyLoadImagesWithOffset(fadeIn, offset) {
	$('img.bsLazyLoad').each(function() {
		if (bsIsScrolledIntoViewWithOffset($(this), offset)) {
			bsLazyLoadImage($(this), fadeIn);
		}
	});
}

function bsLazyLoadImage(img, fadeIn) {
	var lazySrc = img.attr('data-src');
	var newImg = $("<img />").attr('src', lazySrc).load(function() {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            console.log("Image not found: "+lazySrc);
        }
        else {
	    	img.css('opacity', 0);
            img.attr('src', lazySrc);
            img.removeClass('bsLazyLoad');
            img.removeAttr('data-src');
	        
	        if (fadeIn) {
		    	img.animate({opacity: 1});
	        }
	        else {
    	    	img.css('opacity', 1);
			}
        }
    });
}


// Preload images

function bsPreloadImages(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}


// Check if device is a touch screen

function bsIsTouch() {
	return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}


// Set and get cookies

function bsSetCookie(c_name, value, exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function bsGetCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	
	if (c_start == -1) {
	    c_start = c_value.indexOf(c_name + "=");
	}
	
	if (c_start == -1) {
	    c_value = null;
	}
	else {
	    c_start = c_value.indexOf("=", c_start) + 1;
	    var c_end = c_value.indexOf(";", c_start);
	    if (c_end == -1) {
	    	c_end = c_value.length;
	    }
	    c_value = unescape(c_value.substring(c_start,c_end));
	}
	
	return c_value;
}