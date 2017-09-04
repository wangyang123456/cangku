var gulp=require('gulp');//引入gulp
var jshint = require('gulp-jshint');//引入错误检查插件
var minify=require('gulp-minify-html');//压缩html插件
var uglify=require('gulp-uglify');//代码压缩
var concat= require('gulp-concat');//代码合并
var rename=require('gulp-rename');//重命名插件
var imagemin = require('gulp-imagemin');//图片压缩
var pngquant = require('imagemin-pngquant');//png图片压缩


// sass编译
// 将你的默认的任务代码放在这,如果任务的名字是default，直接gulp运行。
gulp.task('runsass', function() {
  //sass文件的路径,编译多个scss为扩展名的文件。
  gulp.src('sass/*.scss')
  //执行sass编译
  .pipe(sass())
  //编译后文件输出
  .pipe(gulp.dest('css/'));
});

//监听
gulp.task('sasswatch', function() {
    // 监听文件变化
    gulp.watch('sass/*.scss', function() {//监听的文件路基
        gulp.run('runsass');
    });
});


//1.检查js语法错误
gulp.task('runhint',function(){
	gulp.src('js/*.js')//引入路径
	.pipe(jshint())//引入方法
	.pipe(jshint.reporter('gulp-jshint-html-reporter', { filename: 'error.html' }));
});

//html压缩
gulp.task('runhtml',function(){
	gulp.src('index.html')
	.pipe(minify())
	.pipe(gulp.dest('html/'));//输出目录
});

//js代码压缩
gulp.task('runjs',function(){
	gulp.src('js/*.js')
	.pipe(concat('all.js'))//合并编译
	.pipe(gulp.dest('dist/'))//输出目录
	.pipe(rename('all.min.js'))//重命名
	.pipe(uglify())
	.pipe(gulp.dest('dist/'));//输出目录
});



gulp.task('watchjs',function(){//监听上面的runjs
	gulp.run('runjs');
	gulp.watch('js/*js',function(){
		gulp.run('runjs');
	});
});


//图片压缩
gulp.task('testImagemin', function() {
    gulp.src('images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 7, //类型：Number 默认：3 取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩 jpg 图片
            use: [pngquant()] //使用 pngquant 深度压缩 png 图片的 imagemin 插件
        }))
        .pipe(gulp.dest('distimg/'));
});

