Backgrid.MediaCell = Backgrid.Cell.extend({
  className: 'media-cell',

  initialize: function (options) {
    Backgrid.MediaCell.__super__.initialize.apply(this, arguments);
    this.title = options.title || this.title;
    this.target = options.target || this.target;
  },

  render: function () {
    this.$el.empty();
    var rawValue = this.model.get(this.column.get("name"));
    var formattedValue = this.formatter.fromRaw(rawValue, this.model);
    var tag = this.determineMediaType(formattedValue);
    if (tag === "video") {
      var videoTag = this.generateVideoTag(formattedValue);
      this.$el.html(videoTag);
    } else {
      this.$el.append($('<img>', {
        tabIndex: -1,
        src: rawValue,
        title: this.title || formattedValue,
        target: this.target
      }));
    }
    this.delegateEvents();
    return this;
  },

  determineMediaType: function(fileName) {
    var extension = fileName.slice(-3);
    if (extension === "mp4") {
      return "video";
    } else {
      return "image";
    }
  },

  generateVideoTag: function (source) {
    // return '<video width="'+ this.model.get('mediaW') +'" height="' + this.model.get('mediaH') +'" controls>' +
    //     '<source src="' + source + '" type="video/mp4"></source>' +
    // '</video>';
    return '<video width="320" height="320" controls>' +
        '<source src="' + source + '" type="video/mp4"></source>' +
    '</video>';
  }
});

Backgrid.ContentCell = Backgrid.Cell.extend({
  template: JST['posts/post_item'],

  className: 'content-cell',

  initialize: function (options) {
    Backgrid.ContentCell.__super__.initialize.apply(this, arguments);
    this.title = options.title || this.title;
    this.target = options.target || this.target;
  },

  render: function () {
    this.$el.empty();
    this.$el.html(this.template({post: this.model }));
    this.delegateEvents();
    return this;
  },

});
