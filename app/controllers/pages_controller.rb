class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
  end

  def show
    # @videos = YoutubeSearch.search('nirvana')
    # p @videos
  end
end
