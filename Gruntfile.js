module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      app: 'app/',
      src: 'app-src/',
      assets: '<%= paths.app %>assets/',
      bower: '<%= paths.src %>vendor/'
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.bower %>fontawesome/fonts/',
          src: ['*.*'],
          dest: '<%= paths.assets %>fonts/'
        },{
          expand: true,
          cwd: '<%= paths.bower %>bootstrap-sass/assets/fonts/bootstrap/',
          src: ['*.*'],
          dest: '<%= paths.assets %>fonts/'
        },{
          src: '<%= paths.bower %>/angular-xeditable/dist/css/xeditable.css',
          dest: '<%= paths.assets %>/css/xeditable.css' 
        }]
      }
    },
    concat: {
      options: {
        separator: [
          ';',
          grunt.util.linefeed,
          grunt.util.linefeed
        ].join('')
      },
      dist: {
        src: [
          '<%= paths.bower %>jquery/dist/jquery.min.js',
          '<%= paths.bower %>angular/angular.min.js',
          '<%= paths.bower %>angular-animate/angular-animate.min.js',
          '<%= paths.bower %>angular-ui-router/release/angular-ui-router.min.js',
          '<%= paths.bower %>angular-safeapply/safe-apply.js',
          '<%= paths.bower %>angular-xeditable/dist/js/xeditable.min.js',
          '<%= paths.bower %>bootstrap-sass/assets/javascripts/bootstrap.min.js',
          '<%= paths.bower %>angular-bootstrap/ui-bootstrap.min.js',
          '<%= paths.bower %>angular-bootstrap/ui-bootstrap-tpls.min.js',
          '<%= paths.src %>js/app.js'
        ],
        dest: '<%= paths.assets %>js/app.js'
      }
    },
    sass: {
      dist: {
        options: {
          loadPath: [
            '<%= paths.bower %>' 
          ]
        },
        files: [{
          expand: true,
          cwd: '<%= paths.src %>/sass/',
          src: ['*.scss'],
          dest: '<%= paths.assets %>/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      js: {
        files: '<%= paths.src %>**/*.js',
        tasks: ['concat']
      },
      sass: {
        files: '<%= paths.src %>**/*.scss',
        tasks: ['sass']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['copy', 'concat', 'sass', 'watch']);
};