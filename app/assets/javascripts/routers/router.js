InstagramApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "indexView"
  },

  indexView: function () {
    var postsCollection = new InstagramApp.Collections.Posts();
    var view = new InstagramApp.Views.PostsIndex({collection: postsCollection});
    this.swapView(view);
  },

  swapView: function (view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});
