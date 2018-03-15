'use strict';

const gulp         = require( 'gulp' ),
      sass         = require( 'gulp-sass' ),
      sourcemaps   = require( 'gulp-sourcemaps' ),
      postcss      = require( 'gulp-postcss' ),
      autoprefixer = require( 'autoprefixer' ),
      //lec          = require( 'gulp-line-ending-corrector' ),
      glob         = require( 'gulp-sass-glob-import' );
//livereload = require('gulp-livereload');

const cssnano = require( 'gulp-cssnano' );

gulp.task( 'sass', function () {
  return gulp.src( './src/scss/**/*.scss' )
             //.pipe(sourcemaps.init())
             .pipe( glob() )
             .pipe( sass( {
               outputStyle: 'compressed'
             } ).on( 'error', sass.logError ) )
             .pipe( postcss( [ autoprefixer() ] ) )
             .pipe( cssnano( {
               discardComments  : {
                 removeAll: true
               },
               discardDuplicates: true,
               discardOverridden: true,
               mergeLonghand    : true,
               minifyFontValues : true,
               minifyParams     : true,
               orderedValues    : true,
               styleCache       : false,
               discardEmpty     : true,
               discardUnused    : false,
               filterPlugins    : true,
               mergeRules       : true,
               minifySelectors  : true,
               normalizeString  : true,
               reduceIdents     : false,
               reduceTransforms : true
             } ) )
             //.pipe(sourcemaps.write())
             //.pipe(lec({verbose:true, eolc: 'LF', encoding:'utf8'}))
             .pipe( gulp.dest( './public/stylesheets' ) );
  //.pipe(livereload());
} );

gulp.task( 'sass-watcher', function () {
  return gulp.src( './src/scss/**/*.scss' )
             .pipe( sourcemaps.init() )
             .pipe( glob() )
             .pipe( sass.sync( {
               //outputStyle: 'compressed'
             } ).on( 'error', sass.logError ) )
             .pipe( postcss( [ autoprefixer() ] ) )
             .pipe( sourcemaps.write() )
             //.pipe(lec({verbose:true, eolc: 'LF', encoding:'utf8'}))
             .pipe( gulp.dest( './public/stylesheets' ) );
  //.pipe(livereload());
} );

gulp.task( 'sass:watch', function () {
  //livereload.listen();
  gulp.watch( './src/scss/**/*.scss', [ 'sass-watcher' ] );
} );