function detectswipe(el,func) {
  swipe_det = new Object();
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  var min_x = 30;  //min x swipe for horizontal swipe
  var max_x = 30;  //max x difference for vertical swipe
  var min_y = 50;  //min y swipe for vertical swipe
  var max_y = 60;  //max y difference for horizontal swipe
  var direc = "";
  ele = document.getElementById(el);
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX;
    swipe_det.sY = t.screenY;
  },false);
  ele.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX;
    swipe_det.eY = t.screenY;
  },false);
  ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) direc = "r";
      else direc = "l";
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direc = "d";
      else direc = "u";
    }

    if (direc != "") {
      if(typeof func == 'function') func(el,direc);
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);
}

function myfunction(el,d) {
  if (d == 'r'){
    const listChild = document.querySelector('.carousel-inner').children;
    for (i=0;i<listChild.length;i++) {
      if (listChild[i].classList.contains('active')){
        if (i == 0){
          listChild[listChild.length - 1].classList.add('active');
          listChild[i].classList.remove('active');
        }else{
          listChild[i-1].classList.add('active');
          listChild[i].classList.remove('active');
        }
      }
    }
  } else if (d == 'l'){
    const listChild = document.querySelector('.carousel-inner').children;
    for (i=0;i<listChild.length;i++) {
      if (listChild[i].classList.contains('active')){
        if (i == listChild.length - 1){
          listChild[0].classList.add('active');
          listChild[i].classList.remove('active');
        }else{
          listChild[i+1].classList.add('active');
          listChild[i].classList.remove('active');
        }
      }
    }
  }
}
if (document.getElementById('artists-carousel')){
  document.addEventListener('DOMContentLoaded', (e)=>{
    detectswipe('artists-carousel',myfunction);
  })
  document.querySelectorAll('.link-tab').forEach(function(e){
    e.addEventListener('click',(e)=> {
    detectswipe('artists-carousel',myfunction);
    })
  })
}

