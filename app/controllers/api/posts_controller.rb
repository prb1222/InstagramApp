class Api::PostsController < ApplicationController
  def index
    results = collect_results
    fail
    @posts = Post.all
    render json: @posts
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:caption, :created_time, :image, :thumbnail, :user_id)
  end

  def collect_results
    results = []
    start_time = params[:start].to_time
    end_time = params[:end].to_time

    if start_time > Time.now
      return []
    end

    end_time += 23.hours + 59.minutes + 59.seconds

    if end_time <= start_time
      end_time = start_time + 23.hours + 59.minutes + 59.seconds
    end

    response = JSON.load(open("https://api.instagram.com/v1/tags/#{params[:tag]}/media/recent?access_token=2291156452.1677ed0.6a0c183f935440b3b2b209b9590b06be"))
    posts = response["data"]
    last_time = Time.at(posts.last["created_time"].to_i)

    # once the most recent posts come in, quickly paginate to the page containing posts before the end_time
    while last_time > end_time
      if response["pagination"]["next_url"]
        response = JSON.load(open(response["pagination"]["next_url"]))
        posts = response["data"]
        last_time = Time.at(posts.last["created_time"].to_i)
      else
        return []
      end
    end

    # once end_time > last_time, we collect these posts until last_time <= start_time
    ## this takes waaaaaay too long do this paginate and only display first twenty
    collecting_posts = true

    p "BEGINNING POST COLLECTION"

    while collecting_posts
      posts.each do |post|
        results << post if Time.at(post["created_time"].to_i).between?(start_time, end_time)
      end

      last_time = Time.at(posts.last["created_time"].to_i)

      p last_time
      p results.length

      if last_time <= start_time
        collecting_posts = false
      else
        response = JSON.load(open(response["pagination"]["next_url"]))
        posts = response["data"]
      end
    end

    return results
  end
end
