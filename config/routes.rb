Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  scope '/user' do
    resources :playlists, only: [:index, :create, :update, :destroy]
  end
  get '/search', to: 'pages#index', as: 'search'
  get '/details/:id', to: 'pages#show', as: 'details'

  get '/albumtracks/:id', to: 'pages#tracks_by_album'
end
