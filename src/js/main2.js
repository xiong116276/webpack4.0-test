//引入css样式
require('../css/detail.min.css');

import {test2} from "./test0";
test2();
$('.container').on('click',function () {
  $(this).css({'text-align':'center'});
});

//进度条
var progress = document.getElementById("progress");
var max = progress.max;
var t = setInterval(function(){
  var v = progress.value;
  if(v == max){
    clearInterval(t);
  }else{
    v++;
    progress.value = v;
  }
},100);

//canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// 矩形 //(x.y,w,h)x,y为左上角坐标，w,h为宽高
// 要设置样式时，一定要先设置样式再绘制。
ctx.fillStyle = 'pink';
ctx.strokeStyle = 'red';
ctx.strokeRect(10,120,100,100);
//绘制方形
ctx.fillRect(10,10,100,100);
// ctx.globalAlpha = 0.5;//设置透明度
ctx.fillRect(120,10,100,100);
/*
 设置线性渐变:createLinearGradient(x0,y0,x1,y1)方法;该方法具有返回值,是渐变对象
 x0,y0,起始坐标；x1,y1,结束坐标。可以控制渐变方向对角线还是水平。
*/
var grd = ctx.createLinearGradient(230,10,330,10,);
/*
   设置线性渐变的颜色和位置
   addColorStop(position,color)
   * position - 设置颜色的位置
     * 值的范围为 0 - 1
   * color - 设置颜色
 */
grd.addColorStop(0,"red");
grd.addColorStop(1,"blue");
grd.addColorStop(0.5,"yellow");
// 将设置的线性渐变,赋值给样式(fillStyle和strokeStyle)
ctx.fillStyle = grd;
// 绘制矩形
ctx.fillRect(230,10,100,100);
//绘制文字strokeText(text,x,y);text:文本，x/y:坐标；
ctx.fillStyle = '#000';
ctx.font = 'bold 20px 宋体';
ctx.textAlign = 'left';
ctx.textBaseline = 'top';
ctx.fillText('绘制的文本',10,230);

// 基准线
ctx.lineJoin = '';
ctx.beginPath();
ctx.moveTo(10,280);
ctx.lineTo(100,400);
ctx.lineTo(150,300);
ctx.stroke();

// 绘制圆形的实现步骤
// 1.调用beginPath()方法，创建新建一条路径。
// 2.使用arc(x, y, radius, startAngle, endAngle, anticlockwise)方法，
// 设置矩形的坐标值及宽度和高度。anticlokwise 控制顺时针还是逆时针，默认false为顺时针。
// 3.通过fill()或stroke()方法进行绘制。
ctx.beginPath();
ctx.arc(400,60,50,0,Math.PI*2);
ctx.fill();
function drawMouth(start,end) {
  ctx.beginPath();
  ctx.arc(170,170,50,start,end);
  ctx.lineTo(170,170);
  ctx.closePath();
}
function drawEyes() {
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = 'gray';
  ctx.arc(180,140,10,0,Math.PI*2);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#000';
  ctx.arc(185,142,5,Math.PI*2,0,true);
  ctx.fill();
}
function drawOpen() {
  drawMouth(Math.PI*0.1,Math.PI*1.9);
  drawEyes();
}
function drawClose() {
  drawMouth(0,Math.PI*2);
  drawEyes();
}
drawClose();
function animait() {
  var isClose = true;
  var timer = setInterval(function () {
    ctx.clearRect(110,110,120,120);
    if(isClose){
      drawOpen();
      isClose = false;
    }else{
      drawClose();
      isClose = true;
    }
  },500);
}
animait();

//使用 drawImage(img, x, y)/drawImage(img, x, y, width, height) 方法绘制图像，该方法具体用法如下：
var img = new Image();
img.src = 'images/7885d6c69964748a4934d9e292663376.jpg';
img.onload = function () {//img 加载完成后才能绘制
  ctx.drawImage(img,250,250,250,250);
}
ctx.fillRect(0,0,150,150);   // Draw a rectangle with default settings
ctx.save();                  // Save the default state

ctx.fillStyle = '#09F';      // Make changes to the settings
ctx.fillRect(15,15,120,120); // Draw a rectangle with new settings

ctx.save();                  // Save the current state
ctx.fillStyle = '#FFF';      // Make changes to the settings
ctx.globalAlpha = 0.5;
ctx.fillRect(30,30,90,90);   // Draw a rectangle with new settings

ctx.restore();               // Restore previous state
ctx.fillRect(45,45,60,60);   // Draw a rectangle with restored settings

ctx.restore();               // Restore original state
ctx.fillRect(60,60,30,30);











