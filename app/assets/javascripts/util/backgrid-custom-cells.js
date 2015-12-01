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
    return '<video width="320" height="320" controls>' +
        '<source src="' + source + '" type="video/mp4"></source>' +
    '</video>';
  }
});

Backgrid.ContentCell = Backgrid.Cell.extend({
  template: JST['posts/post_item'],

  className: 'content-cell',

  events: {
    "click .save-button": "toggleSave"
  },

  initialize: function (options) {
    Backgrid.ContentCell.__super__.initialize.apply(this, arguments);
    this.listenTo(this.model, "sync", this.render);
    this.title = options.title || this.title;
    this.target = options.target || this.target;
    this.selected = this.model.get('selected');
  },

  render: function () {
    this.$el.empty();
    this.$el.html(this.template({post: this.model }));
    if (this.selected) {
      this.$el.find('.save-button').addClass('selected');
    }

    if (this.model.get('saved')) {
      var $button = this.$el.find('.save-button')
                            .removeClass('selected')
                            .addClass('saved')
                            .text("Saved");
    }
    this.delegateEvents();
    return this;
  },

  toggleSave: function (event) {
    event.preventDefault();
    if (this.model.get('saved')) {return;}
    this.selected = !this.selected;
    this.model.set({selected: this.selected});
    this.render();
  }

});
