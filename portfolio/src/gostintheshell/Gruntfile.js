module.exports = function(grunt) {
	/* This is a feature in ECMAScript 5 that allows you to place a program, or 
	 * a function, in a 'strict' operating context. This strict context prevents certain 
	 * actions from being taken and throws more exceptions, in other words it prevents 
	 * you from writing bad Javascript. This is required by some Grunt plugins.
	*/
	'use strict';
	//
	//
	//
	//
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
	//
	//
	//
	//
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);
	//
	//
	//
	//
	// Define the configuration for all the tasks
	grunt.initConfig({
		//
		//
		//
		//
		// Project settings
		config: {
			// Configurable paths
			app: 'src',
			dist: 'build',
			docs: 'docs',
			bower: 'lib',
			temp: '.tmp',
			cdn1: '/',
			cdn: 'http://test-nxcache.nexon.net/firstassault/microsite/renewal/'
		},
		//
		//
		//
		//
		// Automatically inject Bower components into the HTML file
		bowerInstall: {
			dev: {
				src: [
					'<%= config.app %>/index.html'
				],
				dependencies: false,
				devDependencies: true,
				exclude: [/modernizr/],
				ignorePath: '<%= config.app %>'
			}
		},
		//
		//
		//
		//
		// Lint our HTML
		htmlhint: {
			dev: {
				options: {
					'tag-pair': true,
					'tagname-lowercase': true,
					'attr-lowercase': true,
					'attr-value-double-quotes': true,
					'doctype-first': true,
					'spec-char-escape': true,
					'id-unique': true,
					'style-disabled': false,
					'img-alt-require': true,
					'doctype-html5': true
				},
				src: [
					'<%= config.app %>/*.html'
				]
			}
		},
		//
		//
		//
		//
		// Renames files for browser caching purposes
		rev: {
			build: {
				files: {
					src: [
						'<%= config.dist %>/js/**/*.js',
						'<%= config.dist %>/css/**/*.css',
						'<%= config.dist %>/img/**/*.{jpg,jpeg,gif,png,ico}',
						//'<%= config.dist %>/videos/**/*.{mp4,webm,ogv}',
						'<%= config.dist %>/fonts/**/*.{eot,otf,svg,ttf,woff}'
						//'<%= config.dist %>/media/**/*.{jpg,jpeg,gif,png,mov,webm,mp3,mp4}'
					]
				}
			}
		},
		//
		//
		//
		//
		/* Reads HTML usemin blocks to enable smarts builds that automatically concat, 
		 * minify and revision files. Creates configurations in memory so additional tasks 
		 * can operate on them. 
		 */
		useminPrepare: {
			options: {
				dest: '<%= config.dist %>'
			},
			html: [
				'<%= config.app %>/*.html'
			]
		},
		//
		//
		//
		//
		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/img',
					'<%= config.dist %>/css',
					'<%= config.dist %>/videos',
					'<%= config.dist %>/fonts'
				],
				patterns: {
					js: [
						[/defines.js/, '']
					]
				},
				blockReplacements: {
					js: function (block) {
						return '<script type="text/javascript" src="' + block.dest + '"></script>';
					}
				}
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/{,*/}*.css']
		},
		//
		//
		//
		//
		// Minify HTML
		htmlmin: {
			build: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					// Set to true to enable the following options
					expand: true,
					cwd: '<%= config.dist %>/',
					src: '*.html',
					dest: '<%= config.dist %>/'
				}]
			}
		},
		//
		//
		//
		//
		// Minify JPEG, and GIF images (PNG excluded)
		imagemin: {
			options: {
				optimizationLevel: 7, // 0 to 7
				pngquant: true
			},
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/img',
					src: ['{,*/}*.{jpg,png,gif}', '!**/spr/**', '!**/sprMobile/**'],	// only optimize jpg and gif
					dest: '<%= config.dist %>/img'
				}]
			}
		},
		//
		//
		//
		//
		// Compile Sass to CSS and generate necessary files if requested
		compass: {
			dev:{
				options: {
					sassDir: '<%= config.app %>/sass',
					cssDir: '<%= config.app %>/css',
					imagesDir: '<%= config.app %>/img',
					javascriptDir: '<%= config.app %>/js',
					generatedImagesPath: '<%= config.app %>/img',
					generatedImagesDir: '<%= config.app %>/img/generated',
					httpGeneratedImagesPath: '../img',
					relativeAssets: true,
					assetCacheBuster: false
					// force: true
				}
			},
			build:{
				options: {
					sassDir: '<%= config.app %>/sass',
					cssDir: '<%= config.temp %>/css',
					imagesDir: '<%= config.app %>/img',
					javascriptDir: '<%= config.app %>/js',
					generatedImagesPath: '<%= config.temp %>/img',
					generatedImagesDir: '<%= config.dist %>/img/generated',
					//httpGeneratedImagesPath: '<%= config.cdn %>/img',
					httpGeneratedImagesPath: '../img',
					relativeAssets: false,
					assetCacheBuster: false
				}
			}
		},
		//
		//
		//
		//
		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8']
			},
			dev: {
				//src: '<%= config.temp %>/css/**/*.css',
				//dest: '<%= config.temp %>/css/'
				expand: true,
				cwd: '<%= config.app %>/css/',
				src: '**/*.css',
				dest: '<%= config.app %>/css/'
			},
			build: {
				//src: '<%= config.temp %>/css/**/*.css',
				//dest: '<%= config.temp %>/css/'
				expand: true,
				cwd: '<%= config.temp %>/css/',
				src: '**/*.css',
				dest: '<%= config.temp %>/css/'
			}
		},

		//
		//
		//
		//
		// Generate a custom Modernzr build that includes only the tests you reference
		modernizr: {
			build: {
				devFile: '<%= config.app %>/<%= config.bower %>/modernizr/modernizr.js',
				outputFile: '<%= config.dist %>/lib/modernizr/modernizr.js',
				files: {
					src: [
						'<%= config.dist %>/css/{,*/}*.css',
						'<%= config.dist %>/js/{,*/}*.js'
					]
				},
				uglify: true
			}
		},
		//
		//
		//
		//
		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js'
			]
		},
		uglify: {
			options: {
				compress: {
					global_defs: {
						'DEBUG': false
					},
					dead_code: true,
					drop_console: false
				}
			}
		},
		//
		//
		//
		//
		// Run some tasks in parallel to speed up build process
		// *** REVISITE - Not working consistently across multiple PC environments ***
		concurrent: {
			build: [
				'compass:build'

				// 'imagemin:build'
			]
		},
		//
		//
		//
		//
		// Watch for any changes
		watch: {
			options: {
				debounceDelay: 500,
				livereload: true
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['newer:jshint']
			},
			//html: {
			//	files: 'src/**/*.html',
			//	tasks: ['newer:htmlhint']
			//},
			jade: {
				files: 'src/jade/**',
				tasks: ['jade']
			},
			styles: {
				files: 'src/sass/**/*.scss',
				tasks: ['compass:dev']
			},
			scripts: {
				files: 'src/js/**/*.js',
				tasks: ['newer:jshint']
			}
		},
		//
		//
		//
		// 
		// Minify CSS minify css and copy to dist folder
		// it will minify css from .tmp/concat/css then copy to build forder by default. No need to change its behavior.
		// cssmin: {
		// 	build: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: '<%= config.temp %>/concat/css',
		// 			src: ['*.css', '!*.min.css'],
		// 			dest: '<%= config.dist %>/css',
		// 			ext: '.min.css'
		// 		}]
		// 	}
		// },
		//
		//
		//
		//
		// Prep paths for cdn inside html and css files
		cdn: {
			options: {
				cdn: '<%= config.cdn %>',
				flatten: true
			},
			dist: {
				cwd: './<%= config.dist %>/',
				dest: './<%= config.dist %>/',
				//src: ['<%= config.dist %>/*.html', '<%= config.dist %>/**/*.css']
				src: ['*.css', '{,*/}*.html', '{,**/}*.html']
			}
		},
		//
		//
		//
		//
		// Copies remaining files to places other tasks can use
		copy: {
			dev: {
				// Set to true to enable the following options
				expand: true,
				dot: true,
				cwd: '<%= config.temp %>',
				dest: 'src/',
				src: [
					'**/*.html',
					'*.{ico,png,txt,svg}',
					'.htaccess',
					'css/**/*.css',
					'img/**/**/*',
					'media/**/*',
					'assets/**/*'
				]
			},
			build: {
				// Set to true to enable the following options
				expand: true,
				dot: true,
				cwd: '<%= config.app %>',
				dest: '<%= config.dist %>',
				src: [
					'*.{ico,png,txt,svg}',
					'.htaccess',
					'*.html',
					//'css/**/*.css',
					'img/*.ico',
					'img/*.svg',
					'videos/**/*',
					'fonts/**/*',
					'assets/**/*'
				]
			},
			js: {
				// Set to true to enable the following options
				expand: true,
				cwd: '<%= config.app %>',
				dest: '<%= config.dist %>',
				src: [
					'js/*.js',
					'<%= config.bower %>/modernizr/modernizr.js',
					'<%= config.bower %>/jquery/dist/jquery.js',
					'<%= config.bower %>/jquery/dist/jquery.min.js',
					'<%= config.bower %>/jquery-migrate/jquery-migrate.js',
					'<%= config.bower %>/jquery-migrate/jquery-migrate.min.js',
					//'js/transform/**/*'
				]
			}
		},
		//
		//
		//
		//
		// Empties folders to start fresh
		clean: {
			build: {
				dot: true,
				src: ['<%= config.temp %>/', '<%= config.dist %>/']
			}
		},
		//
		//
		//
		//
		// Grunt server settings
		connect: {
			options: {
				//port: 9415,
				open: true,
				livereload: 35729,
				hostname: 'localhost'
			},
			devserver: {
				options: {
					port: 9999,
					base: '<%= config.app %>'
				}
			},
			docserver: {
				options: {
					port: 9997,
					base: '<%= config.docs %>'
				}
			},
			build: {
				options: {
					port: 9998,
					base: '<%= config.dist %>',
					livereload: false,
					keepalive: true
				}
			}
		},
		//
		//
		//		
		jade: {
			compile: {
				options: {
					pretty: true,
					data: function() {
						return require('./src/jade/data/site.json');
					}
				},
				files: [{
					expand: true,
					cwd: 'src/jade/pages',
					src: [ '**/*.jade' ],
					dest: 'src',
					ext: '.html'
				}]
			}
		}
	});

	// Don't need to do this anymore because I'm using 'load-grunt'tasks'. See line 10.
	// Load the grunt plugins for the required tasks
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	//
	//
	//
	//
	// Register Grunt task(s)
	grunt.registerTask('default', [
		'jade',							// render templates into html
		'compass:dev',					// compile sass/compass
		// 'autoprefixer:dev',				// add vendor prefixed styles		
		// 'htmlhint',						// validate html
		'newer:jshint',					// validate js
		'connect:devserver',			// open connection to dev site
		'watch'							// keep connection open and watch for changes
	]);
	//
	//
	//
	//
	//
	grunt.registerTask('build', [
		'jade',						// render templates into html
		'clean:build',					// clean the build directory
		'useminPrepare',				// prepare usemin
		'concurrent:build',				// run concurrent tasks to shorten build time  (compile sass/compass, copy styles into /build, minify images)
		// 'autoprefixer:build',			// add vendor prefixed styles
		'concat',						// needed for usemin default concat
		'cssmin',						// needed for usemin default cssmin
		'uglify',						// needed for usemin default cssmin
		'copy:build',					// copy assets from /src and /.tmp into build directory
		//'modernizr',					// creates minimalistic version of modernizr based on js being used in files
		//'rev:build',					// version all cdn assets
		'usemin',
		'cdn',							// update relative and absolute paths to reference cdn
		//'htmlmin',					// minify html
		'connect:build'
		
		
	]);

};