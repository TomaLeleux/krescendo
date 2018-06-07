const collapsePlaylist = (event) => {
  if (event.target.tagName === 'DIV') {
    const caret = event.target.firstElementChild;
    const tableDiv = event.target.nextElementSibling;
    if (caret.classList.contains('fa-caret-right')) {
      caret.classList.remove('fa-caret-right');
      caret.classList.add('fa-caret-down');
      tableDiv.classList.toggle('playlist-desc-displayed');
    } else {
      caret.classList.remove('fa-caret-down');
      caret.classList.add('fa-caret-right');
      tableDiv.classList.toggle('playlist-desc-displayed');
    }
  } else if (event.target.tagName === 'H3') {

  } else {

  }
};

const listenToPlaylist = () => {
  const playlists = document.querySelectorAll('.playlist .flex-container');
  playlists.forEach((playlist) => {
    playlist.addEventListener('click', collapsePlaylist);
  });
};

export { listenToPlaylist };
