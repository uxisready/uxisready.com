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
  $( "#process-diagram" ).attr( "max-width", $( ".circle-icon" ).width() * 2 );
  console.log( "resize" );
} );

$( "#carousel2" ).carousel( {
  interval: 5000
} );

var clickEvent = false,
  rotate = [ "rotate-deg270", "rotate-deg0", "rotate-deg90", "rotate-deg180" ],
  processCarousel = $( "#process-carousel" );

$( "#carousel2" ).on( "click", ".nav a", function() {
  clickEvent = true;
  $( ".nav li", processCarousel ).removeClass( "active" );
  $( this ).parent().addClass( "active" );
} ).on( "slid.bs.carousel", function() {
  if ( !clickEvent ) {

    var count = $( ".nav", processCarousel ).children().length - 1,
      current = $( ".nav li.active", processCarousel ),
      id = parseInt( current.data( "slide-to" ) );

    current.removeClass( "active" ).next().addClass( "active" );
    console.log( count, id, rotate[ id ] );
    if ( count === id ) {
      $( ".nav li", processCarousel ).first().addClass( "active" );
    }

    $( ".process-diagram", processCarousel ).removeClass( function( index, css ) {
      return ( css.match( /(^|\s)rotate-\S+/g ) || [] ).join( " " );
    } ).addClass( rotate[ id ] );
  }
  clickEvent = false;
} );
