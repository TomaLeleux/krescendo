import axios from 'axios';


// document.addEventListener("DOMContentLoaded", () => {
// console.log("DOM fully loaded and parsed");
setTimeout(load,1000);

function myFunction() {
      var attribute = this.parentNode.firstElementChild.getAttribute("id");
      console.log(attribute);
    };

function load(){
  if (document.getElementById('album-id')){
    const classname = document.querySelectorAll(".fa-play-circle");
    console.log(classname.length);
    for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', myFunction, false);
    }
  }
}
// });


