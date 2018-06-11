import axios from 'axios';
import {loadAlbum} from './reloadshow'
import {albumrefresh} from './reloadshow'
import {trackRefresh} from './reloadshow'

if (document.querySelector('.album-id')){
  const idAlbum =  document.querySelector('.album-id').dataset.album
  let i = 'first'
  const targetTrack = document.querySelector(".first-track")
  console.log(idAlbum)
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
          targetTrack.setAttribute('id',`${element['id']}`);
          targetTrack.setAttribute('data-artist',`${element['artist']['name']}`)
          targetTrack.setAttribute('data-song',`${element['title_short']}`)
          document.querySelector('.track-name').innerText = `${element['title_short']}`;
          document.getElementById(`${element['id']}`).parentNode.querySelector('.fa').addEventListener('click', trackRefresh, false);
          i = '';
        }else{
          //add in track list the other tracks with class active
          document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<li><span class="other-track" id="${element['id']}" data-artist="${element['artist']['name']}" data-song="${element['title_short']}"></span><i class="fa fa-play-circle" aria-hidden="true"></i><span class="track-name">${element['title_short']}</span></li>`)
          document.getElementById(`${element['id']}`).parentNode.querySelector('.fa').addEventListener('click', trackRefresh, false);
        }
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
      //add translation
      })
    .catch(function (error) {
      console.log(error);
    });
  }

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
