class Api::V1::ReviewsController < ApplicationController

  def index
    users = User.all
    reviews = Review.all
    render json: {
      users: User.all,
      reviews: reviews
    }
  end

  def create
    @review = Review.new(review_params)
    user = current_user
    @review.user = user
    if @review.save
      render json: {review: @review}
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
  end
end

protected

def review_params
  params.require(:review).permit(:rating, :review)
end

end
