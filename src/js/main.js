require('../css/index.min.css');

import {test1 as test} from './test0';
test();

$('.img').on('click',function(){
  window.location.href = 'detail.html';
});
//多维数组变成一维数组
let arr = [1,[2,[[3,4],5],6,[7,[8,[9,[10]]],11]]];
//拼接
// 先join 或 toString() 转化为字符串，再拼接为数组
console.log(arr.join(',').split(','));
console.log(arr.toString().split(","));
//递归
function setArr(arr){
  let newArr = [];
  function get(arr) {
    for(let i =0,len = arr.length;i<len;i++){
      if(Array.isArray(arr[i])){
        get(arr[i]);
      }else{
        newArr.push(arr[i]);
      }
    }
  }
  get(arr);
  console.log(newArr);
}
setArr(arr);
// for 循环中的定时器
for(var i=0;i<5;i++){
  (function(i){
    setTimeout(function(){
      console.log(i+'');
    },1000*i);
  })(i)
}



















