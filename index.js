/*global window:false, $:false, jQuery:false */
"use strict";

$( "#processSwitch" ).click( function() {
  $( "#processImage" ).slideToggle();
} );

function equalHeights( selector ) {

  var maxHeight = 0;

  $( selector )
    .height( "auto" )
    .each( function() {
      if ( $( this ).height() > maxHeight ) {
        maxHeight = $( this ).height();
      }
    } )
    .height( maxHeight );

}

equalHeights( "#carousel1 blockquote" );
$( "#carousel1" ).carousel( {
  interval: 5500
} );

$( ".btn-prev" ).click( function() {
  $( "#carousel1" ).carousel( "prev" );
} );
$( ".btn-next" ).click( function() {
  $( "#carousel1" ).carousel( "next" );
} );

$( window ).resize( function() {
  equalHeights( "#carousel1 blockquote" );
//  $("#process-diagram").attr("max-width",$(".circle-icon").width()*3);
} );

$("#process-carousel").carousel({
  interval: 0
});

var clickEvent = false
  , processCarousel = $("#process-carousel")
  , processNav = $(".process-nav")
  ;

function setProcessTab(tab) {
   $(".nav li").removeClass("active");
  tab.addClass("active");

}

$(".our-process").on("click", ".nav a", function () {
  clickEvent = true;
  console.log("nav click");
  $(".nav li").removeClass("active");
  $(this).parent().addClass("active");
  //setProcessTab($(this).parent());
}).on("slid.bs.carousel", function () {
  if (!clickEvent) {

    var current = $("li.active", processNav)
      , id = parseInt(current.data("slide-to"))
      ;

    current.removeClass("active").next().addClass("active");

    if (id === 0) {
      $("li", processNav).first().addClass("active");
    }
    
//    var rotate = [ "rotate-deg270" , "rotate-deg0" , "rotate-deg90" , "rotate-deg0" ];
//    $(".process-diagram", processCarousel).removeClass (function (index, css) {
//      return (css.match (/(^|\s)rotate-\S+/g) || []).join(" ");
//    }).addClass(rotate[id]);
    
    $(".dots li").removeClass("active");
    $(".dots li:eq("+id+")").addClass("active");

  }
    
  clickEvent = false;
});
