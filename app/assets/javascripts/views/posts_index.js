InstagramApp.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST['posts/posts_index'],

  className: 'posts-index-view',

  events: {
    "submit form.post-form-fields":"findPosts"
  },

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
  },

  findPosts: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var tag = $form.find('#title-field').val();
    var startDate = $form.find('#start-date-field').val();
    var endDate = $form.find('#end-date-field').val();
    this.collection.fetch({
      data: {tag: tag, start: startDate, end: endDate},
      success: function () {},
      error: function () {}
    });
  }
});
