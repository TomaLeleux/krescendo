import "bootstrap";
import { listenToPlaylist } from './playlist';
import './lyrcisscroll.js';

if (document.querySelectorAll('.playlist .flex-container')) {
  listenToPlaylist();
}
import './loadtracksinshow.js'


// if (document.getElementById('tracklist')) {
//   addButtonToPlaylist();
// }

import './reloadshow.js'
import './mobile_swipe.js'
import './responsivedesign.js'
