module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      compile: {
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
          '<%= less.compile.dest %>'
        ],
        dest: 'src/css/slides.min.css'
      }
    },

    glue: {
      icons: {
          src: 'assets/icons/',
          options: '--less=src/less/sprites --img=src/images/sprites --url=../images/sprites/ --namespace=icon --margin=1 --project --cachebuster-filename-only-sprites'
      }
    },

    watch: {
      less: {
        files: 'src/less/**/*.less',
        tasks: ['less:compile', 'concat:slidesCss']
      },
      images: {
        files: 'assets/**/*.png',
        tasks: ['glue', 'less:compile', 'concat:slidesCss']
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
    },

    clean: {
      src: ['src/css', 'src/js', 'src/images/sprites', 'src/less/sprites'],
      build: ['build']
    }
  });

  // Grunt plugins and tasks
  grunt.loadNpmTasks('grunt-glue');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-devtools');

  // Custom tasks
  grunt.registerTask('default', ['clean', 'glue', 'less', 'cssmin', 'uglify', 'concat', 'copy']);

};