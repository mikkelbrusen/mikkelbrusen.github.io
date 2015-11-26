module.exports = function(grunt){

	//Load in grunt tasks
	require('load-grunt-tasks')(grunt);

	//Project grunt setup
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		sass: {
			dist: {
				options: {
	            style: 'compressed',
	            sourceMap: false
	        },
	        files: {
					"assets/css/main.css": "assets/sass/main.scss"
				}
			}
		},
		watch: {
				options: {
					interrupt: true
				},
				css: {
					files: 'assets/sass/*/*.scss',
					tasks: ['sass']
				},
				js: {
					files: 'assets/js/*.js',
					tasks: ['uglify']
				}
			},
		uglify: {
			dist: {
				files: {
					'assets/js/min/main.min.js' : ['assets/js/*.js']
				}
			}
		} 
	});

	//load plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default tasks
	grunt.registerTask('default', ['sass', 'uglify']);
	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('heroku', ['default']);

	
}