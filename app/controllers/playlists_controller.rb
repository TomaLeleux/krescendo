class PlaylistsController < ApplicationController
  before_action :set_playlist, only: [:show, :edit, :update, :destroy]
  skip_before_action :authenticate_user!, only: [:index, :show]


  def index
    @playlists = policy_scope(Playlist).order(created_at: :desc)
  end

  def show
    @playlist = policy_scope(Playlist).find(params[:id])
  end

  def new
    @playlist = Playlist.new
    authorize @playlist
  end

  def create
    @playlist = Playlist.new(playlist_params)
    authorize @playlist
    @playlist.user = current_user
    if @playlist.save
      redirect_to playlist_path(@playlist)
    else
      render :new
    end
  end

  def edit
  end

  def update
    authorize @playlist
    @playlist.update(playlist_params)
    redirect_to playlist_path(@playlist)
  end

  def destroy
    authorize @playlist
    @playlist.destroy
    redirect_to root_path
  end

  private

  def playlist_params
    params.require(:playlist).permit(:artist_name, :album_name, :track_name)
  end

  def set_playlist
    @playlist = Playlist.find(params[:id])
    authorize @playlist
  end
end
