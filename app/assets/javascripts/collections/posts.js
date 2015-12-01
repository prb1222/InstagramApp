InstagramApp.Collections.Posts = Backbone.PageableCollection.extend({
  url: 'api/posts',

  model: InstagramApp.Models.Post,

  state: {
    pageSize: 10
  },

  mode: 'client',

  comparator: function (model) {
    return -parseInt(model.get('unixTime'));
  },

  parseRecords: function (response) {
    var data = response[0]
    if (data.next_post_url) {
      this.next_post_url = data.next_post_url;
    }

    if (data.tag) {
      this.tag = data.tag;
    }

    if (data.start) {
      this.start = data.start;
    }

    if (data.end) {
      this.end = data.end;
    }
    return response[1];
  }
});
