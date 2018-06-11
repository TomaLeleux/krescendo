class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
    # @musics = DeezerApiService.call
  end

  def show
    @artist = DeezerApiService.call(params[:id])
    @artist_split = @artist['name'].downcase.split
    @albums = DeezerApiService.albums(params[:id])

    @tracks = {}
    @albums["data"].each do |album|
          @tracks[album['id']] = (DeezerApiService.tracks(album['id']))["data"]
    end
  end

  def search
    if params[:keyword].empty?
      render 'pages/home'
    else
      @artists = DeezerApiService.search_artists(params[:keyword])
      @albums = DeezerApiService.search_albums(params[:keyword])
      @search_tracks = DeezerApiService.search_tracks(params[:keyword])

      @tracks = {}
      @albums["data"].each do |album|
            @tracks[album['id']] = (DeezerApiService.tracks(album['id']))["data"]
      end
    end
  end

  def tracks_by_album
    @tracks = {}
      @tracks[params[:id]] = (DeezerApiService.tracks(params[:id]))["data"]
    render json: @tracks
  end

  def lyric_by_track
    @track = (DeezerApiService.track(params[:id]))
    @lyrics = LyricsFetchService.call(@track['contributors'][0]['name'],@track['title_short'])
    render json: @lyrics
  end
end
