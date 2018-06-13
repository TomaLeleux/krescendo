import axios from 'axios';
import {addListenerToButton} from './loadtracksinshow.js'
import {scrolltoLyrics} from './loadtracksinshow.js'
import {scrolltoVideo} from './loadtracksinshow.js'


const wscreen = window.innerWidth;
function trackRefresh() {
  const trackOnAir = this.parentNode.firstElementChild;
  document.querySelector(".on-air").classList.remove("on-air");
  this.parentNode.classList.add("on-air");
  const trackId = trackOnAir.getAttribute("id");
  const singer = trackOnAir.dataset.artist;
  const song = trackOnAir.dataset.song;
  const searchPlayer = singer.toLowerCase().split(' ').join('+')+'+'+song.toLowerCase().split(' ').join('+');
  document.getElementById('player').setAttribute('src',"https://www.youtube.com/embed?listType=search&list="+searchPlayer);
  let idTrack = parseInt(trackId);
  axios({
    method:'get',
    url:`/tracksLyrics/${idTrack}`
  })
  .then(function (response) {
   document.getElementById('lyrics').innerHTML = `${response['data']}`;
 })
  .catch(function (error) {
    console.log(error);
  });
  DZ.player.playTracks([trackId]);
};

function albumrefresh(){
  let listAlbum = document.getElementById('tracklist');
  while (listAlbum.children.length > 1) {
    listAlbum.removeChild(listAlbum.lastChild);
  }
  const albumId = parseInt(this.dataset.album);
  let i = 'first';
  axios({
    method:'get',
    url:`/albumtracks/${albumId}`
  })
  .then(function (response) {
    response.data[albumId].forEach(function(element) {
      const modal = document.getElementById('playlist-modal');
      const body = modal.querySelector('.modal-body').children;
      if (i == 'first'){
          const searchPlayer = element['artist']['name'].toLowerCase().split(' ').join('+')+'+'+element['title_short'].toLowerCase().split(' ').join('+');
          document.getElementById('player').setAttribute('src',"https://www.youtube.com/embed?listType=search&list="+searchPlayer)
          if (wscreen > 800){
          //desktop
          document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<tr class="on-air"><th class="first-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></th>
            <th class="track-name">${element['title_short']}</th>
              <span class="menu-tracks">
              <th class="play-track"><i class="fa fa-play-circle" aria-hidden="true">  play track</i></th>
              <th class="scroll-to-video"><i class="fa fa-video-camera" aria-hidden="true">  see video</i></th>
              <th class="scroll-to-lyrics"><i class="fa fa-microphone" aria-hidden="true">  see lyrics</i></th>
              <th class="add-to-playlist"><i class="fa fa-plus" aria-hidden="true">  add to playlist</i></th>
              </span>
            </tr>`);
          } else {
          //mobile
          document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<tr class="on-air">
            <th class="first-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></th>
            <th class="track-name">${element['title_short']}</th>
              <span class="menu-tracks">
              <th class="play-track"><i class="fa fa-play-circle" aria-hidden="true"></i></th>
              <th class="scroll-to-video"><i class="fa fa-video-camera" aria-hidden="true"></i></th>
              <th class="scroll-to-lyrics"><i class="fa fa-microphone" aria-hidden="true"></i></th>
              <th class="add-to-playlist"><i class="fa fa-plus" aria-hidden="true"></i></th>
              </span>
            </tr>`)
          }
          document.getElementById(`${element['id']}`).parentNode.querySelector('.add-to-playlist').onclick = function () {
            addListenerToButton(element['id']);
          };
          document.querySelector('.track-name').innerText = `${element['title_short']}`;
          document.getElementById(`${element['id']}`).parentNode.querySelector('.play-track').addEventListener('click', trackRefresh, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.scroll-to-video').addEventListener('click', scrolltoVideo, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.scroll-to-lyrics').addEventListener('click', scrolltoLyrics, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.scroll-to-video').addEventListener('click', trackRefresh, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.scroll-to-lyrics').addEventListener('click', trackRefresh, false);
          i = '';
        }else{
          //add in track list the other tracks with class active
          if (wscreen > 800){
          //desktop
          document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<tr><th class="other-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></th>
            <th class="track-name">${element['title_short']}</th>
              <span class="menu-tracks">
              <th class="play-track"><i class="fa fa-play-circle" aria-hidden="true">  play track</i></th>
              <th class="scroll-to-video"><i class="fa fa-video-camera" aria-hidden="true">  see video</i></th>
              <th class="scroll-to-lyrics"><i class="fa fa-microphone" aria-hidden="true">  see lyrics</i></th>
              <th class="add-to-playlist"><i class="fa fa-plus" aria-hidden="true">  add to playlist</i></th>
              </span>
            </tr>`);
          } else {
          //mobile
          document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<tr>
            <th class="other-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></th>
            <th class="track-name">${element['title_short']}</th>
              <span class="menu-tracks">
              <th class="play-track"><i class="fa fa-play-circle" aria-hidden="true"></i></th>
              <th class="scroll-to-video"><i class="fa fa-video-camera" aria-hidden="true"></i></th>
              <th class="scroll-to-lyrics"><i class="fa fa-microphone" aria-hidden="true"></i></th>
              <th class="add-to-playlist"><i class="fa fa-plus" aria-hidden="true"></i></th>
              </span>
            </tr>`)
          }
          // document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<li><span class="other-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></th><th class="track-name">${element['title_short']}</th><i class="fa fa-play-circle" aria-hidden="true"></i><a style="cursor: pointer;"><i class="fa fa-plus" aria-hidden="true"></i></a></li>`)
          document.getElementById(`${element['id']}`).parentNode.querySelector('.play-track').addEventListener('click', trackRefresh, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.scroll-to-video').addEventListener('click', scrolltoVideo, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.scroll-to-lyrics').addEventListener('click', scrolltoLyrics, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.scroll-to-video').addEventListener('click', trackRefresh, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.scroll-to-lyrics').addEventListener('click', trackRefresh, false);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.add-to-playlist').onclick = function () {
            addListenerToButton(element['id']);
          };
        }
      });
      //add in lyrics the first track
      const targetTrack = document.querySelector(".first-track");
      console.log(targetTrack);
      let idTrack = parseInt(targetTrack.getAttribute("id"));
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
    })
  .catch(function (error) {
    console.log(error);
  });
}

function loadAlbum(){
  if (document.querySelector('.album-id')){
    const classalbum = document.querySelectorAll('.target-album-image');
    for (var y = 0; y < classalbum.length; y++) {
      classalbum[y].addEventListener('click', albumrefresh, false);
    }
  }
}
// });
document.addEventListener( 'DOMContentLoaded', (e) =>{
  loadAlbum();
});
export {loadAlbum}
export {albumrefresh}
export {trackRefresh}

