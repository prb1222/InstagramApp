InstagramApp.Collections.Posts = Backbone.Collection.extend({
  url: 'api/posts',

  model: InstagramApp.Models.Post
});
