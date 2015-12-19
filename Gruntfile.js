module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            main: {
		        src: [
                    'src/neko.js',
		            'src/neko.*.js'
		        ],
		        dest: 'build/neko.js'
		    },
            dictionary: {
                src: [
                    'src/dictionary/neko._sjis_to_unicode.js',
                    'src/dictionary/neko._unicode_to_sjis.js'
                ],
                dest: 'build/neko.dictionary.js'
            }
        },

        uglify: {
		    main: {
		        src: 'build/neko.js',
		        dest: 'build/neko.min.js'
		    }
		},

        copy: {
            main: {
                files: [
                    {src: 'build/neko.min.js', dest: 'app/neko.min.js'},
                    {src: 'build/neko.dictionary.js', dest: 'app/neko.dictionary.js'}
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy')

    // I guess uglify just fucking broke for no reason
    //grunt.registerTask('default', ['concat', 'uglify', 'copy']);
    grunt.registerTask('default', ['concat:main', 'concat:dictionary', 'uglify', 'copy']);
};

