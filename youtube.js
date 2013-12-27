var onYtReady = function onYouTubePlayerReady(player) {
  ytplayer = (typeof player !== "string" ? player: document.getElementById(player));
  if(ytplayer === null) {
    ytplayer = yt.player.getPlayerByElement('player-api');
  }

  if(ytplayer) {
    ytplayer.addEventListener("onStateChange", "onStateChange");
    setQuality();
  }
};

var onYtStateChange = function onStateChange(newState) {
  if(newState === 1) {
    setQuality();
    if(settings.large === true) {
      var p = document.getElementsByClassName('watch-medium');
      for(var i = 0; i < p.length; i++) {
        p[i].className += ' watch-large';
        p[i].className = p[i].className.replace(/\bwatch-medium\b/, '');
      }
    }
  }
};

var setQuality = function setQuality() {
  var qualities = ytplayer.getAvailableQualityLevels();
  if(qualities.indexOf(settings.quality) >= 0 || settings.quality === 'default') {
    ytplayer.setPlaybackQuality(settings.quality);
  } else {
    ytplayer.setPlaybackQuality(qualities[0]);
  }
};

var setPlayerSize = function setPlayerSize() {
  document.cookie = 'wide=' + settings.wide + '; domain=.youtube.com';
  ytplayer.playerConfig = { "player_wide": parseInt(settings.wide, 10) };
  var layout = document.getElementById('watch7-container')
  if(layout) {
    if(settings.wide == '1') {
      layout.className = 'watch-wide';
    } else {
      layout.className = '';
    }
  }
};

var retry = function() {
	if(ytplayer == null) {
	    setTimeout(function() {
        onYouTubePlayerReady();
		}, 1000);
	}
};

var setup = function() {
  var script = document.createElement('script');
  script.textContent = "var settings = " + JSON.stringify(settings) + ";\n"
    + onYtReady.toString() + ";\n" + onYtStateChange.toString() + ";\n"
    + setQuality.toString() + ";\n"
    + '(' + setPlayerSize.toString() + ').call();\n'
    + '(' + retry.toString() + ").call();\n";
  document.body.appendChild(script);
};

var settings = {};
chrome.storage.sync.get(['quality', 'wide'], function(items) {
  settings.quality = items.quality || 'hd720';
  settings.wide = items.wide || '1';
  if(settings.wide == 'large') {
    settings.wide = 1;
    settings.large = true;
  } else {
    settings.large = false;
  }
  setup();
});

