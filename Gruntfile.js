module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/babel.js',
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
                    'build/babel.js': 'build/main.js'
                }
            }
        },
        webpack: {
            options: {
                entry: './src/main.js', // 你的入口文件
                output: {
                    path: __dirname + '/build', // 打包后的文件存放的地方
                    filename: 'main.js' // 打包后输出文件的文件名
                },
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            // use: {
                            //     loader: 'babel-loader',
                            //     options: {
                            //         presets: ['@babel/preset-env']
                            //     }
                            // }
                        }
                    ]
                }
            },
            dist: { // 这里可以定义多个任务，例如 dist、dev 等，然后在命令行通过 grunt webpack:dist 来运行
                // 这里可以直接覆盖或者添加 options 里的配置
            }
        }
    });
    grunt.loadNpmTasks('grunt-webpack');
    // 加载包含 "uglify" 和 "babel" 任务的插件。
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认被执行的任务列表。
    // 修改此处的任务列表，确保 "babel" 在 "uglify" 之前执行。
    grunt.registerTask('default', ['webpack', 'babel', 'uglify']);
};