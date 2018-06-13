import axios from 'axios';
import {loadAlbum} from './reloadshow'
import {albumrefresh} from './reloadshow'
import {trackRefresh} from './reloadshow'


const wscreen = window.innerWidth;

function scrolltoVideo(){
const element = document.querySelector(".video-container");
element.scrollIntoView({behavior: "smooth"});
}

function scrolltoLyrics(){
const element = document.getElementById("lyrics");
element.scrollIntoView({behavior: "smooth"});
}



const addToHref = (href, id, type) => {
  let count = 0;
  let newHref = '';
  for (let i = 0; i < href.length && count !== type; i++) {
    if (href[i] === '/') {
      count++;
    }
    newHref += href[i];
  }
  if (count === type) {
    newHref += id;
  } else {
    newHref += '/' + id;
  }
  return (newHref);
};

const changeHrefWithInput = (event) => {
  const newBtn = document.getElementById('new');

  if (newBtn.classList.contains('selected')) {
    const button = document.querySelector('.modal-footer').firstElementChild;
    button.setAttribute('href', addToHref(button.getAttribute('href'), 'new-' + event.target.value, 3));
    if (!event.target.value) {
      button.classList.add('disabled');
    } else {
      button.classList.remove('disabled');
    }
  }
};

const addListenerToNewPlaylistInput = (input) => {
  input.addEventListener('input', changeHrefWithInput);
};

const addListenerToButton = (id) => {
  const modal = document.getElementById('playlist-modal');
  const button = document.querySelector('.modal-footer').firstElementChild;
  const newLink = addToHref(button.getAttribute('href'), id, 2);

  button.setAttribute('href', newLink);
  button.classList.add('disabled');
  modal.style.display = "block";
};

const addListenerToPlaylistButton = (button) => {
  const buttonSend = document.querySelector('.modal-footer').firstElementChild;
  const selected = document.querySelector('.selected');

  if (selected) {
    selected.classList.remove('selected');
  }
  button.classList.add('selected');
  buttonSend.setAttribute('href', addToHref(buttonSend.getAttribute('href'), button.getAttribute('id'), 3));
  buttonSend.classList.remove('disabled');
};

// this function adds listener for the modal
const addListenersForPlaylist = () => {
  const modal = document.getElementById('playlist-modal');
  const th = document.getElementsByClassName("close")[0];
  const button = document.querySelector('.modal-footer').firstElementChild;
  const playlistsButtons = document.querySelector('.modal-body').children;
  const input = document.getElementById('new-playlist-name');

  // When the user clicks on <th> (x), close the modal
  th.onclick = function() {
    modal.style.display = "none";
  }

  for (let i = 0; i < playlistsButtons.length; i++) {
    if (playlistsButtons[i].getAttribute('id') !== 'new' && playlistsButtons[i].tagName !== 'DIV') {
      playlistsButtons[i].onclick = function() {
        addListenerToPlaylistButton(playlistsButtons[i]);
      };
    } else if (playlistsButtons[i].tagName !== 'DIV') {
      playlistsButtons[i].onclick = function() {
        const selected = document.querySelector('.selected');

        if (selected) {
          selected.classList.remove('selected');
        }
        playlistsButtons[i].classList.add('selected');
        if (!input.value) {
          button.classList.add('disabled');
        } else {
          button.classList.remove('disabled');
        }
      };
    }
  };
  addListenerToNewPlaylistInput(input);

  button.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
};

if (document.querySelector('.details-body')){
  const idAlbum =  document.querySelector('.album-id').dataset.album
  let i = 'first'
  addListenersForPlaylist();
    // axios.get(`/albumtracks/${parseInt(idAlbum)}`  ,{responseType:'json'})
    axios({
      method:'get',
      url:`/albumtracks/${parseInt(idAlbum)}`
    })
    .then(function (response) {
      response.data[parseInt(idAlbum)].forEach(function(element) {
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
      const targetTrack = document.querySelector(".first-track")
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

  export { addListenerToButton };
  export {scrolltoLyrics}
  export {scrolltoVideo}
//element structure :
// disk_number:2
// duration:229
// explicit_lyrics:false
// id:363733141
// isrc:"GBUM71701193"
// link:"https://www.deezer.com/track/363733141"
// preview:"https://cdns-preview-5.dzcdn.net/stream/c-5b0ee46d35c2fdd584089a130e491d38-4.mp3"
// rank:378462
// readable:true
// title:"She's Leaving Home (Take 1 / Instrumental)"
// title_short:"She's Leaving Home"
// title_version:"(Take 1 / Instrumental)"
// track_position:6
// type:"track"
