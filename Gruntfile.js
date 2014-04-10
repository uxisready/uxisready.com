module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  , execute: {
        target: {
            src: ['generate_translations.js']
        }
    }
  });

  grunt.loadNpmTasks('grunt-execute');
    
  // Default task(s).
  grunt.registerTask('default',['execute']);

};