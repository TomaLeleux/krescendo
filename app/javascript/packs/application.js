import "bootstrap";
import './navbar.js'
import { listenToPlaylist } from './playlist';
import './lyrcisscroll.js';

if (document.querySelectorAll('.playlist .flex-container')) {
  listenToPlaylist();
}

import './loadtracksinshow.js'
import './reloadshow.js'
import './mobile_swipe.js'
import './responsivedesign.js'
