InstagramApp.Views.PostItem = Backbone.View.extend({
  template: JST['posts/post_item'],

  className: 'post-item-view',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  }
});
