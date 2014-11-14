
module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      "my_target": {
        "files": {
          'js/jacuzzi.min.js': ['js/jacuzzi.js']
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'css/style.min.css': [
          //"css/reset.css",
          "css/style.css"
        ]
        }
      }
    },
    imagemin: {
        /* 压缩图片大小 */
        dist: {
            options: {
                optimizationLevel: 3 //定义 PNG 图片优化水平
            },
            files: [
                   {
                expand: true,
                cwd: 'images/',
                src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                dest: 'images' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }
                ]
            }
        }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // 默认任务
  grunt.registerTask('default', ['uglify','cssmin']);
  //grunt.registerTask('default', ['uglify','cssmin','imagemin']);
}
