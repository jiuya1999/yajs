module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/string.js',
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
                    'build/string.js': 'src/string.js'
                }
            }
        }
    });

    // 加载包含 "uglify" 和 "babel" 任务的插件。
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认被执行的任务列表。
    // 修改此处的任务列表，确保 "babel" 在 "uglify" 之前执行。
    grunt.registerTask('default', ['babel', 'uglify']);
};