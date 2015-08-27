// Generated on 2015-07-22 using generator-angular-component 0.2.3
'use strict';

module.exports = function(grunt) {

  // Configurable paths
  var yoConfig = {
    livereload: 35729,
    src: 'src',
    dist: 'dist'
  };

  // Livereload setup

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yo: yoConfig,
    meta: {
      banner: '/**\n' +
        ' * <%= pkg.name %>\n' +
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * @link <%= pkg.homepage %>\n' +
        ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
        ' * @license GALITT License, http://www.opensource.org/licenses/GALITT\n' +
        ' */\n'
    },
    open: {
      server: {
        path: 'http://localhost:<%= express.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yo.dist %>/*',
            '!<%= yo.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    express: {
      options: {
        port: 9000
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    },
    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },
    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'index.html': [
            ['<%= yo.dist %>/<%= pkg.name %>.js',
              'app.js',
              'page/**/*.js'
            ]
          ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'index.html': [
            '<%= yo.dist %>/**/*.css'
          ]
        }
      }
    },
    wiredep: {
      target: {
        src: 'index.html',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/'],
        devDependencies: true
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      css: {
        files: ['<%= yo.src %>/{,*/}*.less'],
        tasks: ['less:dist']
      },
      module: {
        files: [
          '<%= yo.src %>/{,*/}*.html',
          '<%= yo.src %>/{,*/}*.css',
          '<%= yo.src %>/{,*/}*.js'
        ],
        tasks: ['build']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['test']
      }
    },
    less: {
      options: {},
      dist: {
        files: {
          '<%= yo.dist %>/<%= pkg.name %>.css': '<%= yo.src %>/**/*.less'
        }
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= yo.src %>/{,*/}*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS']
      },
      unit: {
        singleRun: true
      },
      server: {
        autoWatch: true
      }
    },
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: '<%= pkg.author.name %>.<%= pkg.name %>',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      app: {
        src: '<%= yo.src %>/**/*.html',
        dest: '<%= yo.dist %>/<%= pkg.name %>.tpl.js'
      }
    },
    ngmin: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= yo.src %>/*.js', '<%= yo.src %>/**/*.js', '<%= yo.dist %>/<%= pkg.name %>.tpl.js'],
        dest: '<%= yo.dist %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: '<%= yo.dist %>/<%= pkg.name %>.js',
        dest: '<%= yo.dist %>/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

  grunt.registerTask('test', function(target) {
    if (target === 'e2e') {
      return grunt.task.run([
        'build',
        'injector',
        'wiredep',
        'express:test',
        'protractor'
      ]);
    } else {
      return grunt.task.run([
        'jshint',
        'karma:unit'
      ]);
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'less:dist',
    'ngtemplates',
    'ngmin:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('serve', function() {
    grunt.task.run([
      'build',
      'injector',
      'wiredep',
      'express:test',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('default', ['build']);

};