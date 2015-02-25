(function($) {

  "use strict";

  $.fn.fitText = function( kompressor, options ) {

    var compressor = kompressor || 1,
      settings = $.extend( {
        "minFontSize": parseFloat( Number.NEGATIVE_INFINITY ),
        "maxFontSize": parseFloat( Number.POSITIVE_INFINITY )
      }, options );

    return this.each( function() {

      var $this = $( this );

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function() {
        $this.css( "font-size", Math.max( Math.min( $this.width() / ( compressor * 10 ), settings.maxFontSize ), settings.minFontSize ) );
      };

      $( window )
        .on( "resize.fittext orientationchange.fittext", resizer )
        .trigger( "resize.fittext" );

    } );

  };

  $.fn.random = function() {
    return $( this[ Math.floor( Math.random() * this.length ) ] );
  };

  $.fn.equalHeights = function( pad ) {

    var maxHeight = 0;
    $( this )
      .height( "auto" )
      .each( function() {
        if ( $( this ).outerHeight() > maxHeight ) {
          maxHeight = $( this ).outerHeight();
        }
      } )
      .height( 0 + maxHeight + ( pad || 20 ) );
    return this;
  };

  function stepCarousel() {
    $( ".process-nav li" ).removeClass( "active" ).random().addClass( "active" );
    var content = ( ".process-nav li" );
    return content;
  }

  function startCarousel() {
    return setInterval( stepCarousel, 500 );
  }

  function stopCarousel( nIntervId ) {
    clearInterval( nIntervId );
  }

  var initialize = function() {

    $( "HTML" ).show();

    //$( window ).on( "resize", function() {
    //  $( ".carousel-inner > DIV" ).equalHeights();
    //  $( ".quotes" ).equalHeights();
    //});

    $( ".fit-text" ).fitText( 0.8, {
      minFontSize: "20px",
      maxFontSize: "40px"
    } );

    $( ".fit-text-66" ).fitText( 2, {
      maxFontSize: "60px"
    } );

    $( ".quotes" ).removeClass( "active" ).random().addClass( "active" );

    $( ".process-nav li" ).click( function( e ) {

      /* Act on the event */
      e.preventDefault();

      var selectedTab = $( this );
      var content = $( "#carousel2 .item" );
      var target = parseInt( selectedTab.attr( "data-slide-to" ) );

      selectedTab.siblings().removeClass( "active" );
      selectedTab.addClass( "active" );

      content.removeClass( "active" ).eq( target ).addClass( "active" );

    } );
  };

  $( "HTML" ).hide();
  $( initialize );
  //$( window ).trigger('resize');

})(jQuery);

<!-- Analytics ============================================================= -->
( function( i, s, o, g, r, a, m ) {
  i[ "GoogleAnalyticsObject" ] = r;
  i[ r ] = i[ r ] || function() {
    ( i[ r ].q = i[ r ].q || [] ).push( arguments );
  }, i[ r ].l = 1 * new Date();
  a = s.createElement( o ),
  m = s.getElementsByTagName( o )[ 0 ];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore( a, m );
} )( window, document, "script", "https://www.google-analytics.com/analytics.js", "ga" );
ga( "create", "UA-49766755-1", "uxisready.com" );
ga( "send", "pageview" );
<!-- ======================================================================= -->

