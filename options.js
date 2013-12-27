var quality = document.getElementById('quality');
quality.addEventListener('change', function() {
  chrome.storage.sync.set({'quality': this.value});
}, false);

var wide = document.getElementById('wide');
wide.addEventListener('change', function() {
  chrome.storage.sync.set({'wide': this.value});
}, false);

chrome.storage.sync.get(['quality', 'wide'], function(items) {
  if(items.quality) {
    for(var i = 0; i < quality.length; i++) {
      if(quality.options[i].value === items.quality) {
        quality.options[i].selected = true;
        break;
      }
    }
  }

  if(items.wide) {
    for(var i = 0; i < wide.length; i++) {
      if(wide.options[i].value === items.wide) {
        wide.options[i].selected = true;
        break;
      }
    }
  }

});