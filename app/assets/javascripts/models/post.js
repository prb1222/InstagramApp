InstagramApp.Models.Post = Backbone.Model.extend({
  urlRoot: 'api/posts',

  collection: InstagramApp.Collections.Posts
});
