InstagramApp.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST['posts/posts_index'],

  className: 'posts-index-view',

  events: {
    "submit form.post-form-fields":"findPosts"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    // this.listenTo(this.collection, "add", this.addPostSubview);

    var columns = [{
        name: "id", // The key of the model attribute
        label: "ID", // The name to display in the header
        editable: false,
        cell: Backgrid.IntegerCell.extend({
          orderSeparator: ''
        })
      }, {
        name: "caption",
        label: "Caption",
        cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
      }, {
        name: "thumbnail",
        label: "Image URL",
        cell: "string"
      }, {
        name: "created_time",
        label: "Created At",
        cell: "string"
      }, {
        name: "link",
        label: "Instagram Link",
        cell: "uri"
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
    $('.posts-index').html(this.paginator.render().el);
    $('#paginator').html(this.grid.render().el);
    return this;
  },

  findPosts: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var tag = $form.find('#title-field').val();
    var startDate = $form.find('#start-date-field').val();
    var endDate = $form.find('#end-date-field').val();
    this.collection.fetch({
      data: {tag: tag, start: startDate, end: endDate},
      success: function (collection, response, options) {
      }.bind(this),
      error: function () {},
    });
  }
});
