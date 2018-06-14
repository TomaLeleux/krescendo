const togglePlaylist = (caret, tableDiv) => {
  if (caret.classList.contains('fa-caret-right')) {
    caret.classList.remove('fa-caret-right');
    caret.classList.add('fa-caret-down');
    tableDiv.classList.toggle('playlist-desc-displayed');
  } else {
    caret.classList.remove('fa-caret-down');
    caret.classList.add('fa-caret-right');
    tableDiv.classList.toggle('playlist-desc-displayed');
  }
};

const collapsePlaylist = (event) => {
  let caret = null;
  let tableDiv = null;
  if (event.target.tagName === 'DIV') {
    caret = event.target.firstElementChild;
    tableDiv = event.target.nextElementSibling;
  } else if (event.target.tagName === 'H3') {
    caret = event.target.previousElementSibling;
    tableDiv = event.target.parentElement.nextElementSibling;
  } else {
    caret = event.target
    tableDiv = event.target.parentElement.nextElementSibling;
  }
  togglePlaylist(caret, tableDiv);
};

const listenToPlaylist = () => {
  const playlists = document.querySelectorAll('.playlist .flex-container');
  playlists.forEach((playlist) => {
    playlist.addEventListener('click', collapsePlaylist);
  });
};

const openModal = () => {
  const modal = document.getElementById('add-playlist-modal');
  modal.style.display = "block";
  const th = document.getElementsByClassName("close1")[0];
  window.onclick = function(event) {
  const modal = document.getElementById('add-playlist-modal');
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  th.onclick = function() {
  const modal = document.getElementById('add-playlist-modal');
    modal.style.display = "none";
  }
};














if (document.getElementById('button-add')){
document.getElementById('button-add').addEventListener('click',(e)=> {
  openModal();
})
}
if (document.querySelector('.play-playlist')){
document.querySelectorAll('.play-playlist').forEach(function(element){
  element.addEventListener('click',(e) =>{
    const trackId = element.parentNode.parentNode.dataset.trackid;
    console.log(element.parentNode.parentNode.dataset.trackid);
    DZ.player.playTracks([trackId]);
  })
})

}
export { listenToPlaylist/*,  addButtonToPlaylist */ };


