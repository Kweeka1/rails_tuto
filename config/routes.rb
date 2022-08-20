Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root "posts#index"

  resources :posts
  mount ActionCable.server => '/cable'
  # Defines the root path route ("/")
  # root "articles#index"
end
