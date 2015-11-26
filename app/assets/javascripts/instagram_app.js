window.InstagramApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new InstagramApp.Routers.Router({$rootEl: $('div#content')});
    Backbone.history.start();
  }
};
