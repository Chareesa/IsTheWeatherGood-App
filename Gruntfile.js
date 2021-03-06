'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      src: ['server.js']
    },

    simplemocha: {
      src: ['test/**/*.js']
    },

    jscs: {
      src: ['server.js', 'app/js/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        cwd: 'app/',
        src: ['**/*.html', 'css/**/*.css'],
        expand: true,
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'browserify', 'copy:dev', 'jshint', 'simplemocha', 'jscs']);
  grunt.registerTask('test', ['jshint', 'jscs', 'browserify', 'simplemocha']);
};
