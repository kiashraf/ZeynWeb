/**
 * Created by user on 28-11-2016.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uncss: {
            dist: {
                files: {
                    '/dist/css/tidy.css': ['views/index.ejs']

                }
            }
        }


    });


    grunt.loadNpmTasks('grunt-uncss');



    grunt.registerTask('default', ['uncss']);

};