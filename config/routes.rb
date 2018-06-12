Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#landing'
  scope '/user' do
    resources :playlists, only: [:index, :create, :update, :destroy]
  end
  get '/home', to: 'pages#home', as: 'home'
  get '/search', to: 'pages#search', as: 'search'
  get '/details/:id', to: 'pages#show', as: 'details'
  get '/albumtracks/:id', to: 'pages#tracks_by_album'
  get '/tracksLyrics/:id', to: 'pages#lyric_by_track'

  post '/tracks(/:playlist_id)(/:track_id)', to: 'tracks#create', as: 'track_to_playlist'
  delete '/tracks/:id', to: 'tracks#destroy', as: 'track'
end
