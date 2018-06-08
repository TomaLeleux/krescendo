import axios from 'axios';

const idAlbum =  document.getElementById('album-id').innerText
console.log(idAlbum)
// axios.get(`/albumtracks/${parseInt(idAlbum)}`  ,{responseType:'json'})
  axios({
  method:'get',
  url:`/albumtracks/${parseInt(idAlbum)}`
})
  .then(function (response) {
    response.data[parseInt(idAlbum)].forEach(function(element) {
      document.getElementById
      });
  })
  .catch(function (error) {
    console.log(error);
  });
