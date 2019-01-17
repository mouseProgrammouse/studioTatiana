/**
 * This class uses for manipulating with cookie
 */
// Constructor function
function Cookie(cname) {
    // cookie name
    this.name = cname;

    /**
     * Method that stores the name and value cookie
     *
     * cname - name of the cookie
     * cvalue - value of that cookie
     * exdays - the number of days until the cookie should expire
     */
    this.setCookie = function (cvalue, exdays) {
        // uses a Date object for manipulating with date
        var d = new Date();
        // calculated time in milliseconds
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        // set cookie name, cookie value and expire days
        document.cookie = this.name + "=" + cvalue + ";" + expires + ";path=/";
    };

    /**
     * Method that return the value of cookie by its name
     * "" return by default
     *
     * cname - name of the cookie
     */
    this.getCookie = function () {
        var name = this.name + "=";
        // decodes a URI component
        var decodedCookie = decodeURIComponent(document.cookie);
        // split a string into an array of substrings,
        // ";" is used as the separator
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            // if the cookie is found
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        // return "" if cookie is not founded
        return "";
    };
}

//-----------------------------------------------------------------------------


var slideIndex = 1;
// creating a Cookie object
var myCookie = new Cookie("lang");
var lang = getDefaultLang(myCookie); // get language by default


// next slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// show current slide
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = $(".slide");
    var dots = $(".dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    // hide slides
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" active", " bottom");
    }
    // hide dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // show selected slide and dot
    slides[slideIndex - 1].className = slides[slideIndex - 1].className.replace(" bottom", " active");
    dots[slideIndex - 1].className += " active";
}

// Initialize and add the map
function initMap() {
    // The location of studio
    var studioCoordinate = {
        lat: 49.442916,
        lng: 32.049886
    };

    // info window for map
    var contentString = '<div>' +
        '<p class="adress">адрес: ул. Благовисна 144, г.Черкассы</p>' +
        '<p class="phone">телефон: +380 73 133-2930 Татьяна</p>' +
        '</div>';

    // icon for map's pin
    var pinIcon = 'img/map_pin.svg';

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: studioCoordinate
    });

    // add some usefull info about studio
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // The marker, positioned at studio
    var marker = new google.maps.Marker({
        position: studioCoordinate,
        map: map,
        icon: pinIcon
    });

    // add eventlistener to pin
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}


// get language by default
function getDefaultLang(cookie) {
    // check cookie
    var lang = cookie.getCookie();
    return (lang === "") ? "RU" : lang; // RU is lang by default
}


// translate content from dict
// dict - global ( translated data )
// lang - selected language
function translateContent(lang, dict) {
    $("[translate-key]")
        .each(function () {
            $(this)
                .text(dict[lang][$(this)
                    .attr("translate-key")
                ]);
        });
}

// translate meta description for site
function translateMetaDescription(lang, dict) {
    $("meta[name=description]")
        .attr("content", dict[lang]["meta-description"]);
}

//set language on page
function setLang(lang, pageLangSelector) {
    pageLangSelector.each(function () {
        if (($(this)[0].innerHTML) === lang) {
            $(this)
                .addClass("checked");
        }
    })
}


// set language for website
function setLanguage(lang, pageLangSelector, metaLangSelector, dict) {
    // change lan of page
    $(metaLangSelector)
        .attr("lang", lang);
    // change class="checked"
    setLang(lang, pageLangSelector);
    // change lang of content
    translateContent(lang, dict);
    // translate meta description
    translateMetaDescription(lang, dict);
}

// document loaded
$(function () {
    // set language
    var metaLangSelector = $("head");
    var pageLangSelector = $(".lang a");
    setLanguage(lang, pageLangSelector, metaLangSelector, dict);
    var languageSelector = $(".lang");
    var howSelector = $(".process-description");
    showSlides(slideIndex);
    var slideShowSelector = $(".slider");
    var callToAction = $("#call-button");
    var toTop = $(".go-to-top");

    howSelector.on("click", "h3", function (event) {
        howSelector.find(".line")
            .not(".hide")
            .addClass("hide");
        howSelector.find(".description")
            .not(".hide")
            .addClass("hide");
        $(event.target)
            .prev(".line")
            .removeClass("hide");
        $(event.target)
            .next(".description")
            .removeClass("hide");
    });

    // event listener for lang switcher
    languageSelector.on("click", "a", function (event) {
        event.preventDefault();
        if (event.target.innerHTML !== lang) {
            // change language
            languageSelector.find(".checked")
                .removeClass("checked");
            $(event.target)
                .addClass("checked");
            lang = event.target.innerHTML;
            // translate page
            setLanguage(lang, pageLangSelector, metaLangSelector, dict);
            translateMetaDescription(lang, dict);
            // set/change lang cookie (live for 30 days)
            myCookie.setCookie(lang, 30);
        }
    });

    slideShowSelector.on("click", ".arrow", function (event) {
        if ($(event.target)
            .hasClass("right"))
            plusSlides(1);
        else
            plusSlides(-1);
    });

    callToAction.on("click", function (event) {
        event.preventDefault();
        // go to contact section
        $('html, body')
            .animate({
                scrollTop: $(".questions")
                    .offset()
                    .top
            }, 2000);
    });

    toTop.on("click", function (event) {
        event.preventDefault();
        // scroll to top
        $('html, body')
            .animate({
                scrollTop: $(".main")
                    .offset()
                    .top
            }, 2000);
    });
});
