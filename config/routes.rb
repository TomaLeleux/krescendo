Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  scope '/user' do
    resources :playlists, only: [:index, :create, :update, :destroy]
  end

  delete '/tracks/:id', to: 'tracks#destroy', as: 'track'
  get '/search', to: 'pages#search', as: 'search'
  get '/details/:id', to: 'pages#show', as: 'details'
  get '/albumtracks/:id', to: 'pages#tracks_by_album'

  post '/tracks/:id', to: 'tracks#create', as: 'tracks'
  delete '/tracks/:id', to: 'tracks#destroy', as: 'track'
end
