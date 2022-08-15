class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
  rescue StandardError
    redirect_to '/posts'
  end

  def new
    @post = Post.new
    logs = File.open("#{Dir.pwd}/log/log.txt", mode = 'a')
    logs << "[#{@counter}]: URL: #{request.host}#{request.path} - IP: #{request.remote_ip}\n"
    logs.close
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to(@post)
    else
      render 'new', status: :unprocessable_entity
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

  @counter = 0
  def post_params
    params.require(:post).permit(:post_name, :post_body)
  end
end
