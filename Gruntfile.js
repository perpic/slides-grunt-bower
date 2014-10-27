module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      compileCustom: {
        options: {
          cleancss: true
        },
        src: 'src/less/custom.less',
        dest: 'src/css/custom.min.css'
      }
    },

    cssmin: {
      extraCss: {
        src: [
          'components/reveal.js/css/theme/night.css', 
          'components/reveal.js/lib/css/zenburn.css'
        ],
        dest: 'src/css/extra.min.css'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      markdownJs: {
        src: [
          'components/reveal.js/plugin/markdown/marked.js',
          'components/reveal.js/plugin/markdown/markdown.js'
        ],
        dest: 'src/js/markdown.min.js'
      }
    },

    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      slidesJs: {
        src: [
          'components/reveal.js/lib/js/head.min.js',
          'components/reveal.js/js/reveal.min.js'
        ],
        dest: 'src/js/slides.min.js'
      },
      slidesCss: {
        src: [
          '<%= cssmin.extraCss.dest %>',
          '<%= less.compileCustom.dest %>'
        ],
        dest: 'src/css/slides.min.css'
      }
    }
  });

  // Grunt plugins and tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Custom tasks
  grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'concat']);

};