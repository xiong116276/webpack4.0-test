require('../css/index.min.css');

import {test1 as test} from './test0';
test();

$('.img').on('click',function(){
  window.location.href = 'detail.html';
});
