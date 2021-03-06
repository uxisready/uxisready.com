"use strict";

var https, jsBeautify, fs, options, base, tmp, templates, request;

https      = require( "https" );
jsBeautify = require( "js-beautify" ).js_beautify;
fs         = require( "fs" );

base       = "src";
tmp        = [base, "tmp"].join("/");
templates  = [base, "templates"].join("/");

options = { // https://docs.google.com/spreadsheet/pub?key=0AnRyC36d2KeKdGppOHNjeHpENWNMVm5UbTdMWnZkMkE&single=true&gid=0&output=txt
  hostname: "docs.google.com",
  path: "/spreadsheet/pub?key=0AnRyC36d2KeKdGppOHNjeHpENWNMVm5UbTdMWnZkMkE&single=true&gid=0&output=txt"
};

request = https.request( options, function( res ) {

  var data = "";

  res.on( "data", function( chunk ) {
    data += chunk;
  } );

  res.on( "end", function() {

    var filename = [tmp,"translations.js"].join("/"),
      mydata  = data.split( "\n" );

    for ( var row in mydata ) {
      mydata[ row ] = ( mydata[ row ].split( "\t" ) );
    }

    var headers = mydata.shift();
    headers.shift(); // horrible side effect operation

    var translations = {
      "language": {
        "comment": "lang"
      }
    };

    for ( var header in headers ) {
      translations.language[ headers[ header ] ] = headers[ header ];
    }

    for ( row in mydata ) {

      var rowData = {},
        keyval = mydata[ row ].shift();

      for ( header in headers ) {
        rowData[ headers[ header ] ] = mydata[ row ][ header ];
      }
      translations[ keyval ] = rowData;
    }

    var jsFile = [
      "\"use strict\";",
      "// created : " + new Date(),
      "// keys : " + mydata.length,
      "var translations; ",
      "translations = " + jsBeautify( JSON.stringify( translations ) ) + ";"
    ].join( "\n\n" );

    fs.writeFile( filename, jsFile, function( err ) { console.log( err ? err : filename + " generated!" ); } );
    fs.readFile(  [templates, "/index.template"].join("/"), "utf8", function( err, data ) {

      if ( err ) {
        return console.log( err );
      }

      headers.shift();
      headers.forEach( function( language ) {

        var copydata = data, indexFile = ( tmp + "/index." + language + ".html" ).replace( ".en", "" );

        for ( var key in translations ) {
          var re = new RegExp( "##" + key + "##", "g" );
          copydata = copydata.replace( re, translations[ key ][ language ] || translations[ key ].en );
          }

        fs.writeFile( indexFile, copydata, function( err ) {
          console.log( err ? err : [ indexFile, " saved!" ].join( "" ) );
        } );

      } ); // headers.forEach ...

    } );

  } );

} );

request.on( "error", function( e ) {
  console.log( e.message );
} );

request.end();
