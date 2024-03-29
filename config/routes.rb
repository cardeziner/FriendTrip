Rails.application.routes.draw do
  resources :invites, controller: 'invites', only: [:new, :create]
  devise_for :users
  root 'static_pages#index'

  get "/trips", to: 'static_pages#index'
  get "/aboutus", to: 'static_pages#index'
  get "/hotels", to: 'static_pages#index'
  get "/tripflights", to: 'static_pages#index'
  get "/trips/new", to: 'static_pages#index'
  get "/trips/:id", to: 'static_pages#index'
  get "/trips/:id/events", to: 'static_pages#index'
  get "/trips/:id/events/new", to: 'static_pages#index'
  get "events/:id/edit", to: 'static_pages#index'
  get "/trips/:id/flights/new", to: 'static_pages#index'
  get "/trips/:id/flights", to: 'static_pages#index'
  get "/trips/:trip_id/events", to: 'static_pages#index'
  get "/trips/:trip_id/events/:id", to: 'static_pages#index'
  get "invites/new", to: 'static_pages#index'
  get "reviews", to: 'static_pages#index'
  get "/chatroom", to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :trips, only: [:index, :show, :create, :update] do
        resources :events, only: [:index,:show, :create, :update]
        resources :chats, only: [:index, :new, :create]
      end
      resources :chats, only: [:index,:new,:create]
      resources :hotels, only: [:index, :new, :create, :update]
      resources :users, only: [:index, :new, :create]
      resources :flights, only: [:index, :new, :create]
      resources :invites, only: [:index, :new, :create]
      resources :reviews, only: [:index, :new, :create]
    end
  end

  resources :users, only: [:index, :new, :create]

  as :user do
    get 'signup' => 'devise/sessions#new'
    post 'signin' => 'devise/sessions#create'
    delete 'signout' => 'devise/sessions#destroy'
  end

end
