import axios from 'axios';


// document.addEventListener("DOMContentLoaded", () => {
// console.log("DOM fully loaded and parsed");
setTimeout(load,1000);

function myFunction() {
      const trackOnAir = this.parentNode.firstElementChild
      document.querySelector(".active-track").classList.remove("active-track")
      document.querySelector(".on-air").classList.remove("on-air")
      this.parentNode.classList.add("on-air")
      trackOnAir.classList.add("active-track")

      const trackId = trackOnAir.getAttribute("id");
      const singer = trackOnAir.dataset.artist
      const song = trackOnAir.dataset.song

      // console.log(trackId);
      // console.log(singer);
      // console.log(song);
      const searchPlayer = singer.toLowerCase().split(' ').join('+')+'+'+song.toLowerCase().split(' ').join('+');
      //add in video the first track
      document.getElementById('player').setAttribute('src',"https://www.youtube.com/embed?listType=search&list="+searchPlayer)
      const targetTrack = document.querySelector(".active-track")
      let idTrack = parseInt(trackId);
      axios({
        method:'get',
        url:`/tracksLyrics/${idTrack}`
      })
        .then(function (response) {
         document.getElementById('lyrics').innerHTML = `${response['data']}`
        })
        .catch(function (error) {
          console.log(error);
        });
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


