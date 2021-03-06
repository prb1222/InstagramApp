class Api::PostsController < ApplicationController
  def index
    render json: collect_results
  end

  def create
    @user = User.find_by(username: params[:username]) || User.create(username: params[:username])
    @tag = Tag.find_by(title: params[:tag]) || Tag.create(title: params[:tag])
    @post = Post.new(caption: params[:caption],
                     created_time: params[:unixTime],
                     image: params[:media],
                     user_id: @user.id)

    if @post.save
      PostTagging.create(post_id: @post.id, tag_id: @tag.id)
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:caption, :created_time, :media, :user_id)
  end

  def collect_results(next_post_url = nil)
    results = []
    unless params[:start] || params[:tag]
      return []
    end

    start_time = params[:start].to_time
    tag = params[:tag]
    end_time = params[:end] ? params[:end].to_time : Time.now.change(hour: 0, minute: 0, second: 0)
    next_post_url = params[:next_post_url]

    if start_time > Time.now
      return []
    end

    end_time += 23.hours + 59.minutes + 59.seconds

    if end_time <= start_time
      end_time = start_time + 23.hours + 59.minutes + 59.seconds
    end

    if next_post_url.nil?
      response = JSON.load(open("https://api.instagram.com/v1/tags/#{tag}/media/recent?access_token=2291156452.1677ed0.6a0c183f935440b3b2b209b9590b06be"))
    else
      response = JSON.load(open(next_post_url))
    end

    posts = response["data"]

    return [] if posts.empty?

    last_time = Time.at(posts.last["created_time"].to_i)

    p "PAGINATING TO ENDPOINT"
    # once the most recent posts come in, quickly paginate to the page containing posts before the end_time
    while last_time > end_time
      if response["pagination"]["next_url"]
        response = JSON.load(open(response["pagination"]["next_url"]))
        posts = response["data"]
        last_time = Time.at(posts.last["created_time"].to_i)
        p "REQUESTING NEW PAGE"
        p "#{last_time} last posted"
      else
        return []
      end
    end
    # once end_time > last_time, we collect these posts until last_time <= start_time
    ## this takes waaaaaay too long do this paginate and only display first twenty
    collecting_posts = true
    next_post_url = ""

    p "COLLECTING POSTS"
    while collecting_posts
      posts.each_with_index do |post, idx|
        if Time.at(post["created_time"].to_i).between?(start_time, end_time)
          results << post
          next_post_url = posts.length == (idx + 1) ? response['pagination']['next_url'] : reformat_url(response['pagination']['next_url'], posts[idx + 1]['id'])
        end
      end

      last_time = Time.at(posts.last["created_time"].to_i)

      p "#{results.length} posts collected"
      p "#{last_time} last posted"
      if last_time <= start_time || results.length >= 25
        collecting_posts = false
        last_result = results.last
      else
        response = JSON.load(open(response["pagination"]["next_url"]))
        posts = response["data"]
      end
    end

    return [{next_post_url: next_post_url, tag: tag, start: start_time, end: end_time}, results]
  end

  def reformat_url(url_root, str)
    url_root[0...-19] + str[0...19]
  end
end
