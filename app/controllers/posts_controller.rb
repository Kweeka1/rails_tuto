class PostsController < ApplicationController
  #after_action :check_page_content
  def index
    @posts = Post.all
    page = helpers.get_wiki_page
    File.open("#{Dir.pwd}/log/response.html", mode = 'w') do |file|
      file << page
    end
  end

  def show
    @post = Post.find(params[:id])
  rescue StandardError
    redirect_to root_path, status: :see_other
  end

  def new
    @post = Post.new
    File.open("#{Dir.pwd}/log/log.txt", mode = 'a') do |file|
      file << "[GET]: URL: #{request.host}#{request.path} - IP: #{request.remote_ip}\n"
    end
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
    if @post.update(post_params)
      redirect_to @post
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render 'redirectToHome', status: :see_other, notice: 'Post has been destroyed'
  rescue StandardError
    render 'new', status: :see_other
  end

  private

  def post_params
    params.require(:post).permit(:post_name, :post_body)
  end

  # def check_page_content
  #   if response.status == 303
  #     html_doc = Nokogiri::HTML(response.body)
  #     response.body = "#{response.body}<script src='redirect'></script>"
  #   end
  # end
end
