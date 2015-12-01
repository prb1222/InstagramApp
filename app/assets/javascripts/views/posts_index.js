InstagramApp.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST['posts/posts_index'],

  className: 'posts-index-view',

  events: {
    "submit form.post-form-fields":"findPosts",
    "click .load-more":"loadMore"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);

    var columns = [
      {
        name: "media",
        label: "Media",
        cell: "media",
        editable: false
      }, {
        name: "caption",
        label: "Post Info",
        cell: "content", // This is converted to "ContentCell" and a corresponding class in the Backgrid package namespace is looked up
        editable: false
      }
    ];

    this.grid = new Backgrid.Grid({
      columns: columns,
      collection: this.collection
    });

    this.paginator = new Backgrid.Extension.Paginator({
      collection: this.collection
    });

  },

  render: function () {
    this.$el.html(this.template({posts: this.collection}));
    if (this.collection.length) {
      $('#paginator').html(this.paginator.render().el);
      $('.posts-index').html(this.grid.render().el);
    }
    return this;
  },

  findPosts: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);

    var $errors = $form.find('ul.errors');
    $errors.empty();

    var tag = $form.find('#title-field').val();
    var startDate = $form.find('#start-date-field').val();
    var endDate = $form.find('#end-date-field').val();

    if (tag === "") {
      $errors.html('<li>Tag cannot be empty!</li>');
      var exit = true;
    }

    if (startDate === "" || endDate === "") {
      $errors.append('<li>Dates must be valid!</li>');
      var exit = true;
    }

    if (exit) {return;}

    this.collection.fetch({
      data: {tag: tag, start: startDate, end: endDate},
      success: function (collection, response, options) {
      }.bind(this),
      error: function () {},
      reset: true
    });
  },

  loadMore: function (event) {
    event.preventDefault();
    var collection = new InstagramApp.Collections.Posts();
    var data = this.collection.searchParams;
    collection.fetch({
      data: data,
      remove: false,
      merge: false,
      success: function (collection, response, options) {
        this.collection.add(collection.fullCollection.models.slice(0,40));
        var allModels = this.collection.fullCollection.models;
        allModels.sort(function(model1, model2){ return model2.get('unixTime') - model1.get('unixTime')})
        var attributes = {tag: this.colle}
        this.collection = new InstagramApp.Collections.Posts(allModels);
        this.collection.searchParams = data;
      }.bind(this)
    });
  }
});
