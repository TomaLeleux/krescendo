import axios from 'axios';
import {loadAlbum} from './reloadshow'
import {albumrefresh} from './reloadshow'
import {trackRefresh} from './reloadshow'

const buildHref = (href, id) => {
  let count = 0;
  let newHref = '';
  for (let i = 0; i < href.length && count !== 3; i++) {
    if (href[i] === '/') {
      count++;
    }
    newHref += href[i];
  }
  if (count === 3) {
    newHref += id;
  } else {
    newHref += '/' + id;
  }
  return (newHref);
};

const addListenerToButton = (id, body, modal) => {
  for (let i = 0; i < body.length; i++) {
    const newLink = buildHref(body[i].getAttribute('href'), id);
    body[i].setAttribute('href', newLink);
  };
  modal.style.display = "block";
};

const addListenersForPlaylist = () => {
  const modal = document.getElementById('playlist-modal');
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
};

if (document.querySelector('.album-id')){
  const idAlbum =  document.querySelector('.album-id').dataset.album
  let i = 'first'
  console.log(idAlbum);
  addListenersForPlaylist();
    // axios.get(`/albumtracks/${parseInt(idAlbum)}`  ,{responseType:'json'})
    axios({
      method:'get',
      url:`/albumtracks/${parseInt(idAlbum)}`
    })
    .then(function (response) {
      response.data[parseInt(idAlbum)].forEach(function(element) {
        const modal = document.getElementById('playlist-modal');
        const body = modal.querySelector('.modal-body').children;
        if (i == 'first'){
          const searchPlayer = element['artist']['name'].toLowerCase().split(' ').join('+')+'+'+element['title_short'].toLowerCase().split(' ').join('+');
          document.getElementById('player').setAttribute('src',"https://www.youtube.com/embed?listType=search&list="+searchPlayer)
          document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<li class="on-air"><span class="first-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></span><i class="fa fa-play-circle" aria-hidden="true"></i><span class="track-name">${element['title_short']}</span>  <a style="cursor: pointer;"><i class="fa fa-plus" aria-hidden="true"></i></a></li>`)
          document.getElementById(`${element['id']}`).parentNode.lastChild.onclick = function () {
            addListenerToButton(element['id'], body, modal);
          };
          document.querySelector('.track-name').innerText = `${element['title_short']}`;
          document.getElementById(`${element['id']}`).parentNode.querySelector('.fa').addEventListener('click', trackRefresh, false);
          i = '';
        }else{
          //add in track list the other tracks with class active
          document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<li><span class="other-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></span><i class="fa fa-play-circle" aria-hidden="true"></i><span class="track-name">${element['title_short']}</span>  <a style="cursor: pointer;"><i class="fa fa-plus" aria-hidden="true"></i></a></li>`)
          document.getElementById(`${element['id']}`).parentNode.querySelector('.fa').addEventListener('click', trackRefresh, false);
          document.getElementById(`${element['id']}`).parentNode.lastChild.onclick = function () {
            addListenerToButton(element['id'], body, modal);
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
