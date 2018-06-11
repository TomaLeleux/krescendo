import axios from 'axios';

const addButtonToPlaylist = () => {
  const tracklist = document.getElementById('tracklist').children;
  const length = tracklist.length;
  for (let i = 1; i < length; i++) {
    tracklist[i].innerHTML += '  <a style="cursor: pointer;"><i class="fa fa-plus" aria-hidden="true"></i></a>'
  }
};

const choosePlaylist = (event) => {
  // Get the modal
  const modal = document.getElementById('playlist-modal');

  // Get the button that opens the modal
  const btn = event.target;

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

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
}

const addListenerToPlaylistButton = () => {
  const buttons = document.querySelectorAll('.fa-plus');
  buttons.forEach((button) => {
    button.parentElement.addEventListener('click', choosePlaylist);
  });
};

if (document.getElementById('album-id')){


  const idAlbum =  document.getElementById('album-id').innerText
  let i = 'first'
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
      //add in video the first track
      document.getElementById('player').setAttribute('src',"https://www.youtube.com/embed?listType=search&list="+searchPlayer)
      //add in player the first track
      //add in lyrics the first track
      //add in track list the first track with class on-air
      document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<li><i class="fa fa-play-circle on-air" aria-hidden="true"></i><span id="${element['id']}"></span>  ${element['title_short']}</li>`)
      i = '';
    }else{
      //add in track list the other tracks with class active
      document.getElementById('tracklist').insertAdjacentHTML('beforeend',`<li><i class="fa fa-play-circle" aria-hidden="true"></i><span id="${element['id']}"></span>  ${element['title_short']}</li>`)
    }
  });
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    addButtonToPlaylist();
  })
  .then(function() {
    addListenerToPlaylistButton();
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
