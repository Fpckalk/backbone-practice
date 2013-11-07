(function($) {

	var tweetMessage = Backbone.Model.extend({
		defaults: function() {
			return {
				author: '',
				status: ''
			}
		}	
	});

	var tweetsList = Backbone.Collection.extend({
		model: tweetMessage
	});

	var tweets = new tweetsList();

	var tweetView = Backbone.View.extend({
		model: new tweetMessage(),
		initialize: function() {
			this.template = _.template($('#tweet-template').html());
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var tweetsView = Backbone.View.extend({
		model: tweets,
		el: $('#tweets-container'),
		initialize: function() {
			this.model.on('add', this.render, this);
		},
		render: function() {
			var self = this;
			_.each(this.model.toArray(), function(tweet, i) {
				self.$el.append((new tweetView({model: tweet})).render().$el);
			});
			return this;
		}
	});

	$(document).ready(function() {

		$('#new-tweet').submit(function(ev) {
			var tweet = new tweetMessage({ author: $('#author-name').val(), status: $('#status-update').val()});
			tweets.add(tweet);
			console.log(tweets.toJSON());

			return false;
		});

		var appView = new tweetsView();

	});

})(jQuery);
