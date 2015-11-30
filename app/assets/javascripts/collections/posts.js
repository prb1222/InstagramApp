InstagramApp.Collections.Posts = Backbone.PageableCollection.extend({
  url: 'api/posts',

  model: InstagramApp.Models.Post,

  state: {
    pageSize: 20
  },

  mode: 'client',

  parse: function (response) {
    if (response.next_post_url) {
      this.next_post_url = response.next_post_url;
      delete response.next_post_url;
    }

    return response.posts;
  }
});
