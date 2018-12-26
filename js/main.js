var slideIndex = 1;
var lang = getDefaultLang();//get language by default

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
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  //hide slides
  for (i = 0; i < slides.length; i++) {
      slides[i].className = slides[i].className.replace(" active", " bottom");
  }
  //hide dots
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  //show selected slide and dot
  slides[slideIndex-1].className = slides[slideIndex-1].className.replace(" bottom", " active");
  dots[slideIndex-1].className += " active";
}

// set cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// return cookie
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Initialize and add the map
function initMap() {
  // The location of studio
  var studio = {lat: 49.442916, lng: 32.049886};
  var pin = 'img/map_pin.svg';
  var popupContent = "<div class=\"container\"><h2><a name=\"contacts\">Наши контакты</a></h2><div class=\"info\"><img src=\"img/logo_black.svg\" alt=\"logo\"/><div class=\"adress container\"><span>адрес:</span><span>ул. Благовисна 144, г.Черкассы</span></div><div class=\"phone container\"><span><a class=\"phone\" href=\"tel:+380731332930\">+380 73 133-2930</a><br/>Татьяна</span></div></div></div>";

  var map = new google.maps.Map(document.getElementById('map'), {zoom: 16, center: studio});

  // The marker, positioned at studio
  var marker = new google.maps.Marker({
      position: studio,
      map: map,
      icon: pin
  });

  //add some usefull info
  var infowindow = new google.maps.InfoWindow({
    content: popupContent
  });
  //add eventlistener to pin
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}


//get language by default
function getDefaultLang() {
  //check cookie
  var lang = getCookie("lang");
  return (lang === "")?"RU":lang;//RU is lang by default
}


// translate content from dict
// dict - global// JSON with translated data
// lang - selected language
function translateContent(lang, dict) {
    $('[translate-key]').each(function(){
        $(this).text( dict[ lang ][$(this).attr('translate-key')]);
    });
}


// set language for website
function setLanguage(lang, pageLangSelector, dict) {
  // change lan of page
  pageLangSelector.attr("lang",lang);
  // change lang of content
  translateContent(lang, dict);
}

// document loaded
$(function() {
  //set language
  var pageLangSelector = $("head");
  setLanguage(lang, pageLangSelector, dict);
  var languageSelector = $(".lang");
  var howSelector = $(".process-description");
  showSlides(slideIndex);
  var slideShowSelector = $(".slider");
  var callToAction = $("#call-button");
  var toTop = $(".go-to-top");

  howSelector.on("click","h3", function(event) {
    howSelector.find(".line").not(".hide").addClass("hide");
    howSelector.find(".description").not(".hide").addClass("hide");
    $(event.target).prev(".line").removeClass("hide");
    $(event.target).next(".description").removeClass("hide");
  });

  // event listener for lang switcher
  languageSelector.on("click","a", function (event) {
    event.preventDefault();
    if (event.target.innerHTML !== lang) {
      // change language
      languageSelector.find(".checked").removeClass("checked");
      $(event.target).addClass("checked");
      lang = event.target.innerHTML;
      //translate page
      setLanguage(lang, pageLangSelector, dict);
      // set/change lang cookie (live for 30 days)
      setCookie("lang",lang,30);
    }
  });

  slideShowSelector.on("click", ".arrow", function(event){
    if ($(event.target).hasClass("right"))
        plusSlides(1);
      else
        plusSlides(-1);
  });

  callToAction.on("click", function(event){
    event.preventDefault();
    //go to contact section
    $('html, body').animate({
        scrollTop: $(".questions").offset().top
    }, 2000);
  });

  toTop.on("click", function(event){
    event.preventDefault();
    //scroll to top
    $('html, body').animate({
        scrollTop: $(".main").offset().top
    }, 2000);
  });
});
