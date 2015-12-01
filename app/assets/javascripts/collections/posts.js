InstagramApp.Collections.Posts = Backbone.PageableCollection.extend({
  url: 'api/posts',

  model: InstagramApp.Models.Post,

  state: {
    pageSize: 10
  },

  mode: 'client',

  comparator: function (model) {
    return -parseInt(moment(model.get('unix_time')).format('x'));
  },

  parse: function (response) {
    if (response.next_post_url) {
      this.next_post_url = response.next_post_url;
      delete response.next_post_url;
    }
    return response.posts;
  }
});
