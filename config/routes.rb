Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'

  get "/trips", to: 'static_pages#index'
  get "/trips/new", to: 'static_pages#index'
  get "/trips/:id", to: 'static_pages#index'
  get "/trips/:id/events", to: 'static_pages#index'


  namespace :api do
    namespace :v1 do
      resources :trips, only: [:index, :show, :create] do
        resources :events, only: [:index]
      end
    end
  end
end
