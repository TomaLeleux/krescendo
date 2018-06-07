class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
    # @musics = DeezerApiService.call
  end

  def show
    @artist = DeezerApiService.call(params[:id])
    @albums = DeezerApiService.albums(params[:id])
    # @albums = DeezerApiService.albums(id)
    # @videos = YoutubeSearch.search('nirvana')
    # p @videos
  end
end
