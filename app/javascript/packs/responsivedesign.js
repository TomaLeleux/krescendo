const wscreen = window.innerWidth;
const hscreen = window.innerHeight;

function carouselMobile(){
  document.querySelectorAll('.desktop').forEach(function(e) {
    e.classList.remove('item');
  })
  // document.querySelector('.desktop').classList.remove('item');
}

function carouselDesktop(){
  document.querySelectorAll('.mobile').forEach(function(e) {
    e.classList.remove('item');
  })
}

function dynamicCarousel(){
  if (wscreen > 800){
    console.log('desktop');
    carouselDesktop();
  }else{
    console.log('mobile')
    carouselMobile();
  }
}


document.addEventListener('DOMContentLoaded',dynamicCarousel, false);

