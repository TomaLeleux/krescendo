import "bootstrap";
import { listenToPlaylist } from './playlist';
import './lyrcisscroll.js'

if (document.querySelectorAll('.playlist .flex-container')) {
  listenToPlaylist();
}
