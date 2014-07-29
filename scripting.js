$(document).ready(function(){
  var $body = $('.container');
  $body.html('');
	var timer;
	
	// Function to load tweets
	var newTweets = function() {
		$body.html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $("<div></div>");
			var $user = $('<a/>', {
			          html: '@' + tweet.user + ': ',
			          id: tweet.user,
			          href: "#"
			          });
      var $content = (tweet.message + "<strong class='timestamp'> posted: " + moment(tweet.created_at).fromNow() + '</strong>');
			$tweet.append($user);
			$tweet.append($content);
      $tweet.appendTo($body);
      index -= 1;
		}
	}
	
	var addProfileTweets = function(username) {
		$body.html('');
		var index = streams.users[username].length - 1;
		while(index >= 0) {
			var tweet = streams.users[username][index];
			var $tweet = $("<div></div>");
			var $user = $('<a/>', {
			          html: '@' + tweet.user + ': ',
			          id: tweet.user,
			          href: "#"
			          });
      var $content = (tweet.message + "<strong class='timestamp'> posted: " + moment(tweet.created_at).fromNow() + '</strong>');
			$tweet.append($user);
			$tweet.append($content);
			$tweet.appendTo($body);
			index -= 1;
		}
	}
	
	var autoTweet = function() {
		newTweets()
		timer = setTimeout(autoTweet, 1);
	}
	
	var stopTweets = function() {
		clearTimeout(timer);
	}
	
	newTweets();	// Initial invoke upon page load
	
	$('.feedBtn').on('click', function(e) {
		e.preventDefault();
		newTweets();
	})
	$('.autoBtn').on('click', autoTweet);
	$('.stopBtn').on('click', stopTweets);
	$('.container').on('click', 'div a', function(e) {
		e.preventDefault();
		var user = $(this).attr('id');
		addProfileTweets(user);
		console.log(user);
	})
});