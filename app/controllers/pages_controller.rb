class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
    # @musics = DeezerApiService.call
  end

  def show
    @artist = DeezerApiService.call(params[:id])
    @albums = DeezerApiService.albums(params[:id])
    @search = Search.new
  end

  def search
    @artists = DeezerApiService.search_artists(params[:keyword])
    @albums = DeezerApiService.search_albums(params[:keyword])
    @tracks = DeezerApiService.search_tracks(params[:keyword])
  end
end
