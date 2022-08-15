class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def show
    begin
    @post = Post.find(params[:id])
    rescue
      redirect_to "/posts"
    end
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)

      if @post.save
        redirect_to(@post)
      else
        render new:, status: :unprocessable_entity
      end
    end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
  end

  def destroy
    @post = Post.find(params[:id])
  end

  private
  def post_params
    params.require(:post).permit(:post_name, :post_body)
  end
end
