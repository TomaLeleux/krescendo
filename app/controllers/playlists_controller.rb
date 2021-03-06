class PlaylistsController < ApplicationController

  def index
    @playlists = policy_scope(Playlist).order(created_at: :desc)
    @playlist = Playlist.new
  end

  def create
    @playlists = policy_scope(Playlist).order(created_at: :desc)
    @playlist = Playlist.new(playlist_params)
    authorize @playlist
    @playlist.user = current_user
    if @playlist.save
      flash[:notice] = "Your playlist has been created"
      redirect_to playlists_path
    else
      render :index
    end
  end

  def update
    @playlist = Playlist.find(params[:id])
    authorize @playlist
    @playlist.update(playlist_params)
    flash[:notice] = "Your playlist has been updated"
    redirect_to playlists_path
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    authorize @playlist
    @playlist.destroy
    flash[:notice] = "Your playlist has been deleted"
  end

  private

  def playlist_params
    params.require(:playlist).permit(:name)
  end
end
