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
    this.searchParams = response[0];

    return response[1];
  }
});
