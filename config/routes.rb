Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'

  get "/trips", to: 'static_pages#index'
  get "/trips/new", to: 'static_pages#index'
  get "/trips/:id", to: 'static_pages#index'
  get "/trips/:id/events", to: 'static_pages#index'
  get "/trips/:trip_id/events", to: 'static_pages#index'
  get "/trips/:trip_id/events/:id", to: 'static_pages#index'

  get "/aboutus", to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :trips, only: [:index, :show, :create, :update] do
        resources :events, only: [:index,:show, :create, :update]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
    end
  end

end
