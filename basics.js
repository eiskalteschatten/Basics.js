/*
*   Basics.js
*   Version 0.3.5.1
*   Copyright (c) Alex Seifert 2014-2016
*   https://www.alexseifert.com
*   https://github.com/eiskalteschatten/Basics.js
*/

window.onload = function() {

    // Check for jQuery & load from Google CDN if not available

    if (typeof jQuery == 'undefined') {
        var jq = document.createElement('script'); jq.type = 'text/javascript';
        jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(jq);
    } 
}


// Browser detection
//      - Following browsers will be detected: Internet Explorer (desktop & mobile), Firefox, Chrome, Chrome mobile, Opera (desktop, mini, mobile), Safari, Safari mobile, Android browser, Blackberry

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
	bsScrollToIdWithOffset(id, 0);
}

function bsScrollToIdWithOffset(id, offset) {
    if (id.indexOf('#') == -1) {
        id = "#" + id;
    }
    
    $('html, body').animate({scrollTop: $(id).offset().top + offset}, 2000, 'easeInOutCubic');
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
//      - All images that should be lazily loaded require the class "bsLazyLoad" and 
//        the attribute "data-src" with the path to the image
//      - fadeIn: true/false - Images will fade in after loading

function bsLazyLoadImages(fadeIn) {
	bsLazyLoadImagesWithClass(fadeIn, "bsLazyLoad");
}


// Image lazy loading with custom class
//      - All images that should be defined with a custom class and 
//        the attribute "data-src" with the path to the image
//      - fadeIn: true/false - Images will fade in after loading
//      - customClass: The name of the custom class

function bsLazyLoadImagesWithClass(fadeIn, customClass) {
    $('img.' + customClass).each(function() {
        bsLazyLoadImage($(this), fadeIn, null);
    });
}


// Lazy load images with an offset
//      - fadeIn: true/false - Images will fade in after loading
//      - offset: Pixel offset for when the images should be loaded

function bsLazyLoadImagesWithOffset(fadeIn, offset) {
	bsLazyLoadImagesWithOffsetAndClass(fadeIn, offset, "bsLazyLoad");
}

// Lazy load images with an offset and custom class
//      - fadeIn: true/false - Images will fade in after loading
//      - offset: Pixel offset for when the images should be loaded
//      - customClass: The name of the custom class

function bsLazyLoadImagesWithOffsetAndClass(fadeIn, offset, customClass) {
    $('img.' + customClass).each(function() {
		if (bsIsScrolledIntoViewWithOffset($(this), offset)) {
            bsLazyLoadImage($(this), fadeIn, null);
        }
    });
}


// Lazy load images with a callback function
//      - fadeIn: true/false - Images will fade in after loading
//      - callback: The name of the JavaScript function to be called

function bsLazyLoadImagesWithCallback(fadeIn, callback) {
    $('img.bsLazyLoad').each(function() {
        bsLazyLoadImage($(this), fadeIn, callback);
    });
}


// Lazy load images with an offset
//      - fadeIn: true/false - Images will fade in after loading
//      - offset: Pixel offset for when the images should be loaded
//      - callback: The name of the JavaScript function to be called

function bsLazyLoadImagesWithOffsetAndCallback(fadeIn, offset, callback) {
    $('img.bsLazyLoad').each(function() {
        if (bsIsScrolledIntoViewWithOffset($(this), offset)) {
            bsLazyLoadImage($(this), fadeIn, callback);
        }
    });
}


// Lazy load a specific image with an offset
//      - img: images as a jQuery Object; i.e. $('#myImage')
//      - fadeIn: true/false - Images will fade in after loading
//      - offset: Pixel offset for when the images should be loaded
//      - callback: The name of the JavaScript function to be called

function bsLazyLoadAnImageWithOffsetAndCallback(img, fadeIn, offset, callback) {
    if (bsIsScrolledIntoViewWithOffset(img, offset)) {
        bsLazyLoadImage(img, fadeIn, callback);
    }
}


function bsLazyLoadImage(img, fadeIn, callback) {
    var lazySrc = undefined;
    lazySrc = img.attr('data-retina-src');

    if (!bsIsRetina() || lazySrc === undefined || bsIsMobileBrowser()) {
        lazySrc = img.attr('data-src');
    }

    var newImg = $("<img />").attr('src', lazySrc).load(function() {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            console.log("Image not found: "+lazySrc);
        }
        else {
            img.css('opacity', 0);
            img.attr('src', lazySrc);
            img.removeClass('bsLazyLoad');
            img.removeAttr('data-src');
			img.removeAttr('data-retina-src');
			
            if (fadeIn) {
                img.animate({opacity: 1});
            }
            else {
                img.css('opacity', 1);
            }
            
            if (callback) {
                eval(callback);
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


// Preload image by path

function bsPreloadImage(urlOfImage) {
    $('<img/>')[0].src = urlOfImage;
}


// Check if device is a touch screen

function bsIsTouch() {
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}


// Check if device has a retina display

function bsIsRetina() {
    return window.devicePixelRatio > 1;
}


// Check if the user is using a mobile browser

function bsIsMobileBrowser() {
    var check = false;
    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
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


// Send a virtual form to a URL via get or post
//      - path: url to submit the form to
//      - params: the parameters as JSON string

function bsPostToUrl(path, params) {
    bsFormSubmit(path, params, "post");
}

function bsGetToUrl(path, params) {
    bsFormSubmit(path, params, "get");
}

function bsFormSubmit(path, params, method) {
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}