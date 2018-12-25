let slideIndex = 1;
let lang = getDefaultLang();//get language by default

//next slide
function plusSlides(n) {
  showSlides(slideIndex += n);
}

//show current slide
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = $(".slide");
  const dots = $(".dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].className = slides[i].className.replace(" active", " bottom");
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].className = slides[slideIndex-1].className.replace(" bottom", " active");
  dots[slideIndex-1].className += " active";
}

//set cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//return cookie
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
  const studio = {lat: -25.344, lng: 131.036};
  const pin = 'img/map_pin.svg';
  const popupContent = "<div class=\"container\"><h2><a name=\"contacts\">Наши контакты</a></h2><div class=\"info\"><img src=\"img/logo_black.svg\" alt=\"logo\"/><div class=\"adress container\"><span>адрес:</span><span>г. Черкассы, XXXX улица, дом 12/2 офис 88</span></div><div class=\"phone container\"><span> телефон:</span><span>+353 (083) 234-88-09</span></div></div></div>";

  const map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: studio});

  // The marker, positioned at studio
  const marker = new google.maps.Marker({
      position: studio,
      map: map,
      icon: pin
  });

  //add some usefull info
  const infowindow = new google.maps.InfoWindow({
    content: popupContent
  });
  //add eventlistener to pin
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}


//get language by default
function getDefaultLang() {
  //TODO check cookie
  const lang = getCookie("lang")
  return (lang === "")?"RU":lang;//RU is lang by default
}

//translate content from dict
//dict - global// JSON with translated data
//lang - selected language
function translateContent(lang, dict) {
    $('[translate-key]').each(function(){
        $(this).text( dict[ lang ][$(this).attr('translate-key')]);
    });
}

//document loaded
$(function() {
  const languageSelector = $(".lang");
  const howSelector = $(".process-description");
  showSlides(slideIndex);
  const slideShowSelector = $(".slider");
  const callToAction = $("#call-button");
  const toTop = $(".go-to-top");

  howSelector.on("click","h3", function(event) {
    howSelector.find(".line").not(".hide").addClass("hide");
    howSelector.find(".description").not(".hide").addClass("hide");
    $(event.target).prev(".line").removeClass("hide");
    $(event.target).next(".description").removeClass("hide");
  });

  //event listener for lang switcher
  languageSelector.on("click","a", function (event) {
    event.preventDefault();
    if (event.target.innerHTML !== lang) {
      //change language
      languageSelector.find(".checked").removeClass("checked");
      $(event.target).addClass("checked");
      lang = event.target.innerHTML;
      //translate page
      translateContent(lang, dict);
      //set/change lang cookie (live for 30 days)
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
