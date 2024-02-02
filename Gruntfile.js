module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'babel/string.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'babel/string.js': 'src/string.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-babel');
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['babel']);
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify']);
};