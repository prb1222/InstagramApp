# Game Up
[Heroku link][heroku]

InstagramApp is a simple, one-page web application which queries Instagram's recently tagged posts [API][instagram]. InstagramApp uses a Rails backend deplpyed on Heroku to respond to requests. The requests are in the form of a tag, an start date, and a end date. The rails server provides a bare-bones static page which initializes a Backbone app to provide a form for submission, query results, and save desired posts to the server. MomentJS is used to format dates, and Backgrid is used to display the posts along with a paginator. There is also a 'Load More' button which resends a tag, start date, end date, and the last post retrieved to gather more posts starting from the last retrieved post.

[instagram]: https://instagram.com/developer/endpoints/tags/
[heroku]: https://peterinstagramapp.herokuapp.com

## Using the production server
A live link to the app is above. Simply type in a tag, and select a start date and end date. A start date sets the time interval to midnight of that day, while an end date closes that time interval at 11:59:59. Choosing the same date for both fields will simply gather posts from that day.

A total of 40 posts are gathered in the initial fetch. More can be loaded in order of creation time using the "Load More" button. The media file (image or video) is displayed on the left with post content on the right.

To save a post, simply click "Save Post" on the post you would like to save, and then press the red "Save Posts" button to save all currently selected posts.

## API
The Rails server provides a simple routes file to expose an API for posts:

```ruby
Rails.application.routes.draw do
  root to: 'staticpages#root'
  namespace :api, defaults: {format: :json} do
     resources :posts, only: [:index, :create]
  end
end
```

In order to query for posts, simply send a GET request to `api/posts` with the query parameters `tag=`, `start=`, and `end=`. Failure to provide a start date or tag results in an empty response object. A blank end date defaults to the current day.

In order to save a post, a POST request to `api/posts` with the parameters `caption=` (the caption of the post), `unixTime=` (the unix timestamp), `media=` (the media file url), and `user_id=` (the user's id).
