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
      },
      printCss: {
        src: 'components/reveal.js/css/print/pdf.css',
        dest: 'src/css/print.min.css'
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
      },
      highlightJs: {
        src: 'components/reveal.js/plugin/highlight/highlight.js',
        dest: 'src/js/highlight.min.js'
      },
      html5shivJs: {
        src: 'components/html5shiv/dist/html5shiv.js',
        dest: 'src/js/html5shiv.min.js'
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
    },

    copy: {
      revealCss: {
        src: 'components/reveal.js/css/reveal.min.css',
        dest: 'src/css/reveal.min.css'
      },
      notesJs: {
        expand: true,
        cwd: 'components/reveal.js/plugin/notes/',
        src: ['notes.html', 'notes.js'],
        dest: 'src/js/notes/'
      },
      build: {
        files: [
          { expand: true, cwd: 'src/js', src: ['**'], dest: 'build/js' },
          { expand: true, cwd: 'src/css', src: ['**'], dest: 'build/css' },
          { expand: true, cwd: 'src/images', src: ['**'], dest: 'build/images' },
          { src: 'src/index.html', dest: 'build/index.html' },
        ]
      }
    }
  });

  // Grunt plugins and tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Custom tasks
  grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'concat', 'copy']);

};