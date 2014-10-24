module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      slides: {
        src: [
          'components/reveal.js/lib/js/head.min.js',
          'components/reveal.js/js/reveal.min.js'
        ],
        dest: 'src/js/slides.min.js'
      },
      markdown: {
        src: [
          'components/reveal.js/plugin/markdown/marked.js',
          'components/reveal.js/plugin/markdown/markdown.js'
        ],
        dest: 'src/js/markdown.js'
      },
      highlight: {
        src: 'components/reveal.js/plugin/highlight/highlight.js',
        dest: 'src/js/highlight.js'
      }
    }
  });

  // Grunt plugins and tasks
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Custom tasks
  grunt.registerTask('default', ['concat']);

};