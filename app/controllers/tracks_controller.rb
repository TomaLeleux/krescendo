class TracksController < ApplicationController
  def destroy
    @track = Track.find(params[:id])
    authorize @track
    @track.destroy
  end
end
