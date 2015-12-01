InstagramApp.Models.Post = Backbone.Model.extend({
  urlRoot: 'api/posts',

  collection: InstagramApp.Collections.Posts,

  parse: function (response) {
    if (response.id) {
      this.set({id: parseInt(response.id)});
      delete response.id;
    }

    if (response.caption) {
      this.set({caption: response.caption.text})
      delete response.caption;
    }

    if (response.images) {
      this.set({thumbnail: response.images.thumbnail.url});
      delete response.images;
    }

    if (response.created_time) {
      this.set({unixTime: parseInt(response.created_time)});
      this.set({created_time: moment.unix(parseInt(response.created_time)).format("MMM Do[,] YYYY [at] hh:mm a")});
      delete response.created_time;
    }

    if (response.link) {
      this.set({link: response.link});
      delete response.link;
    }

    return response;
  }
});
