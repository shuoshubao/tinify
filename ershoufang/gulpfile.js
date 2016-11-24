var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('spriteImg/*.png').pipe(spritesmith({
    imgName: 'component/sprite.png',
    imgPath: '../component/sprite.png?t='+Date.now(),
    retinaImgPath: '../component/sprite@2x.png?t='+Date.now(),
    cssName: 'component/sprite.less',
    retinaSrcFilter: ['spriteImg/*@2x.png'],
    retinaImgName: 'component/sprite@2x.png'
  }));
  return spriteData.pipe(gulp.dest('./'));
});
