class TracksController < ApplicationController
  def destroy
    @track = Track.find(params[:id])
    authorize @track
    @track.destroy
  end

  def create
    @track = Track.new
    deezer_track = DeezerApiService.track(params[:track_id])
    if params[:playlist_id].start_with? 'new-'
      new_playlist = Playlist.new(name: extract_playlist_name(params[:playlist_id]), user: current_user)
      new_playlist.save
      @track.playlist = new_playlist
    else
      @track.playlist_id = params[:playlist_id].to_i
    end
    authorize @track
    @track.track_id = params[:track_id].to_i
    @track.album_id = deezer_track['album']['id'].to_i
    @track.artist_id = deezer_track['artist']['id'].to_i
    @track.save
  end

  private

  def extract_playlist_name(string)
    length = string.size - 4
    string.slice(4, length)
  end
end
