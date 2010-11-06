$(function(){
  window.Search = Backbone.Model.extend({
    url: function() {
      return "http://localhost:3000/searches/"+this.get('term')
    },

    initialize: function() {
      
    }
  });


  window.SearchView = Backbone.View.extend({
    tagName: 'div',
    
    template: _.template($('#search-template').text()),

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    },
    
    render: function() {
      var me = this
      $(this.el).html(this.template(this.model.toJSON()));

      console.debug("tweets size " + this.model.get('tweets').length)
      _.each(this.model.get('tweets'),function(tweet) {
        $(me.el).append(tweet['text'])
      })
      
      this.render_callback(this)

      return this;
    }
  });
  
  window.AppView = Backbone.View.extend({
    el: $('#main'),
    
    events : {
      "change #search_term" : "render"
    },
    
    initialize: function() {
      _.bindAll(this, 'render')
    },

    get_term: function() {
      return $('#search_term').val();
    },

    render: function() {
      var me = this
      
      var model = new Search({term: this.get_term()})
      model.fetch()
      var v = new SearchView({model: model})
      v.render_callback = function(v) {
        $(me.el).append(v.el)
      }
    }
  })
  
  window.App = new AppView;
  
  
});
