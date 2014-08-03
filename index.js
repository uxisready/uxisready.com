"use strict";

jQuery.fn.random = function() {
    var randomIndex = Math.floor(Math.random() * this.length);
    return jQuery(this[randomIndex]);
};

function equalHeights( selector ) {
  var maxHeight = 0;
  $( selector )
    .height( "auto" )
    .each( function() {
      if ( $( this ).outerHeight() > maxHeight ) {
        maxHeight = $( this ).outerHeight();
      }
    } )
    .height( maxHeight +20);
}

$(window).on( "resize", function(){
  equalHeights(".carousel-inner > DIV");
  equalHeights(".quotes");
}).resize();

$(".quotes").removeClass("active").random().addClass("active");

$("#carousel2").carousel({
   interval : 6000
});

$( "#carousel2" ).on( "slid.bs.carousel", function() {
  var idx = $(".carousel-inner > DIV").index( $(".carousel-inner > DIV.active") )|| 0;
  $("ul.process-nav li").removeClass("active").eq(idx).addClass("active");
});
