class TracksController < ApplicationController
  def destroy
    @track = Track.find(params[:id])
    authorize @track
    @track.destroy
  end

  def create
    @track = Track.new
    deezer_track = DeezerApiService.track(params[:track_id])
    @track.playlist_id = params[:playlist_id].to_i
    authorize @track
    @track.track_id = params[:track_id].to_i
    @track.album_id = deezer_track['album']['id'].to_i
    @track.artist_id = deezer_track['artist']['id'].to_i
    @track.save
  end
end
