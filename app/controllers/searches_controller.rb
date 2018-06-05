class SearchesController < ApplicationController
  before_action :set_search, only: [:show]
  skip_before_action :authenticate_user!, only: [:index, :show]


  def index
    @searches = policy_scope(Search).order(created_at: :desc)
  end

  def show
    @search = policy_scope(Search).find(params[:id])
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

  private

  def search_params
    params.require(:search).permit(:keyword)
  end

  def set_search
    @search = Search.find(params[:id])
    authorize @search
  end
end
