class HistoricsController < ApplicationController
  before_action :set_historic, only: [:show]
  skip_before_action :authenticate_user!, only: [:index, :show]


  def index
    @historics = policy_scope(Historic).order(created_at: :desc)
  end

  def show
    @historic = policy_scope(Historic).find(params[:id])
  end

  def new
    @historic = Historic.new
    authorize @historic
  end

  def create
    @historic = Historic.new(historic_params)
    authorize @historic
    @historic.user = current_user
    if @historic.save
      redirect_to historic_path(@historic)
    else
      render :new
    end
  end

  private

  def search_params
    params.require(:historic).permit(:keyword)
  end

  def set_search
    @historic = Historic.find(params[:id])
    authorize @historic
  end
end
