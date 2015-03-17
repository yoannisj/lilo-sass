module.exports = function(grunt) {

  // Modules
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('bootcamp');

  // Grunt Tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Sass
    sass: {
      test: {
        options: {
          style: 'expanded',
          quiet: false,
          compass: true,
          sourcemap: 'none',
          loadPath: [
            './stylesheets'
          ],
          require: [
            'aleksi'
          ]
        },
        files: {
          './tmp/results.css': './tests/tests.scss'
        }
      }
    },

    // Watch
    watch: {
      dist: {
        files: ['./**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  // Tasks
  grunt.registerTask('default', ['sass', 'watch']);
  grunt.registerTask('test',    ['sass:test']);

};