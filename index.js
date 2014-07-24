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
} );
