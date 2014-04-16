"use strict";

( function() {

    module.exports = function( grunt ) {

        // Project configuration.
        grunt.initConfig( {

            pkg: grunt.file.readJSON( "package.json" ),

            execute: {
                target: {
                    src: [ "generate_translations.js" ]
                }
            },

            eslint: { // task
                options: {
                    config: "eslint.json" // custom config
                },
                target: [ "*.js" ] // array of files
            },

            jscs: { // task
                src: "*.js",
                options: {
                    config: ".jscs.json",
                    validateQuoteMarks: "\x22"
                }
            },

            jsbeautifier: {
                files: [ "*.js", "*.json", "*.css" ],
                options: {
                    js: {
                        braceStyle: "end-expand",
                        indentSize: 4,
                        preserveNewlines: true,
                        maxPreserveNewlines: 10,
                        jslintHappy: false,
                        spaceInParen: true,
                        goodStuff: true
                    }
                }
            }

        } );

        grunt.loadNpmTasks( "grunt-execute" );
        grunt.loadNpmTasks( "grunt-eslint" );
        grunt.loadNpmTasks( "grunt-jscs-checker" );
        grunt.loadNpmTasks( "grunt-jsbeautifier" );

        // Default task(s).
        grunt.registerTask( "default", [ "execute", "jsbeautifier", "eslint", "jscs" ] );

    };

}() );
