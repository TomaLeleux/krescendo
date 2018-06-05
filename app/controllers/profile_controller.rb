class ProfileController < ApplicationController
  def show
    authorize current_user
  end

  def dashboard
    authorize current_user
  end
end
