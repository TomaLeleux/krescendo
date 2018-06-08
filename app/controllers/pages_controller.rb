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
    if @albums["next"]
      next_url = @albums["next"]
    end
    @albums["data"].each do |album|
          @tracks[album['id']] = (DeezerApiService.tracks(album['id']))["data"]
    end
    respond_to do |format|
      format.html { render 'pages/show'}
      format.js
    end
    # @albums = DeezerApiService.albums(id)
    # @videos = YoutubeSearch.search('nirvana')
    # p @videos
  end
end
