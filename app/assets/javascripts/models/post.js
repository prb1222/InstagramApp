InstagramApp.Models.Post = Backbone.Model.extend({
  urlRoot: 'api/posts',

  collection: InstagramApp.Collections.Posts,

  parse: function (response) {
    debugger;
    delete response.id

    if (response.user) {
      this.set({username: response.user.username});
      delete response.user;
    }

    if (response.caption) {
      this.set({caption: response.caption.text || response.caption})
      delete response.caption;
    }

    if (response.images) {
      var imageInfo = response.images.low_resolution;
      this.set({media: imageInfo.url, mediaW: imageInfo.width, mediaH: imageInfo.height});
      delete response.images;
    }

    if (response.videos) {
      var videoInfo = response.videos.low_resolution;
      this.set({media: videoInfo.url, mediaW: videoInfo.width, mediaH: videoInfo.height});
      delete response.videos;
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

    this.set({selected: false});

    return response;
  }
});
