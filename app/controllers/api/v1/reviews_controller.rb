class Api::V1::ReviewsController < ApplicationController

  def index
    render json: Review.all
  end

  def create
    @review = Review.new(review_params)
    @review.user = current_user
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
