import axios from 'axios';
import {addListenerToButton} from './loadtracksinshow.js'

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
};

function albumrefresh(){
  let listAlbum = document.getElementById('tracklist');
  listAlbum.children[0].classList.add('on-air');
  while (listAlbum.children.length > 1) {
    listAlbum.removeChild(listAlbum.lastChild);
  }
  const albumId = parseInt(this.dataset.album);
  const targetTrack = document.querySelector(".first-track");
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
        targetTrack.setAttribute('id',`${element['id']}`);
        targetTrack.setAttribute('data-artist',`${element['artist']['name']}`);
        targetTrack.setAttribute('data-song',`${element['title_short']}`);
        document.querySelector('.track-name').innerText = `${element['title_short']}`;
        document.getElementById(`${element['id']}`).parentNode.querySelector('.fa').addEventListener('click', trackRefresh, false);
        i = '';
      }else{
          //add in track list the other tracks with class active
          document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<li><span class="other-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></span><i class="fa fa-play-circle" aria-hidden="true"></i><span class="track-name">${element['title_short']}</span>  <a style="cursor: pointer;"><i class="fa fa-plus" aria-hidden="true"></i></a></li>`);
          document.getElementById(`${element['id']}`).parentNode.querySelector('.fa').addEventListener('click', trackRefresh, false);
          document.getElementById(`${element['id']}`).parentNode.lastChild.onclick = function () {
            addListenerToButton(element['id']);
          };
        }
        // setTimeout(load,1000);
      });
      //add in lyrics the first track
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
  console.log('1')
  if (document.querySelector('.album-id')){
    const classalbum = document.querySelectorAll('.target-album-image');
    for (var y = 0; y < classalbum.length; y++) {
      console.log('done')
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

