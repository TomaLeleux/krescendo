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
    # if @albums["next"]
    #   next_url = @albums["next"]
    # end
    @albums["data"].each do |album|
          @tracks[album['id']] = (DeezerApiService.tracks(album['id']))["data"]
    end
    # @albums = DeezerApiService.albums(id)
    # @videos = YoutubeSearch.search('nirvana')
    # p @videos
  end

  def tracks_by_album
    @tracks = {}
          @tracks[params[:id]] = (DeezerApiService.tracks(params[:id]))["data"]
      p @tracks.to_json
    # respond_to do |format|
      render json: @tracks
    # end

  end
end
