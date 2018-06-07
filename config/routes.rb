Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  scope '/user' do
    resources :playlists, only: [:index, :create, :update, :destroy]
  end
  get '/search', to: 'pages#index', as: 'search'
  get '/details', to: 'pages#show', as: 'details'
  delete '/tracks/:id', to: 'tracks#destroy', as: 'track'
end
