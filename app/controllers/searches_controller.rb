class SearchesController < ApplicationController
  before_action :set_search, only: [:index]
  skip_before_action :authenticate_user!, only: [:index, :show]


  def index
    # @searches = policy_scope(Search).order(created_at: :desc)
  end

  def show
    # @search = policy_scope(Search).find(params[:id])
  end

  def new
    @search = Search.new
    authorize @search
  end

  def create
    @search = Search.new(search_params)
    authorize @search
    @search.user = current_user
    if @search.save
      redirect_to search_path(@search)
    else
      render :new
    end
  end

  def search
    authorize Search.new
    @keyword = params[:keyword]
    @artists = DeezerApiService.search_artists(params[:keyword])
    @albums = DeezerApiService.search_albums(params[:keyword])
    @tracks = DeezerApiService.search_tracks(params[:keyword])
  end

  private

  def search_params
    params.require(:search).permit(:keyword)
  end

  def set_search
    @search = Search.find(params[:id])
    authorize @search
  end
end
