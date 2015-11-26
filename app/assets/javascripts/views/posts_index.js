InstagramApp.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST['posts/posts_index'],

  className: 'posts-index-view',

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPostSubview);
  },

  render: function () {
    this.$el.html(this.template({posts: this.collection}));
    this.attachSubviews();
    return this;
  },

  addPostSubview: function (post) {
    var subView = new InstagramApp.Views.PostItem({model: post});
    this.addSubview('ul.posts-index', subView);
  }
});
