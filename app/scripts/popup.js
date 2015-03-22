var background = chrome.extension.getBackgroundPage();

$(function() {
  
  $('button#color-button').on('click', function(e){
    var color = $(this).attr('class');
    chrome.tabs.query({
      active: true,
      currentWindow: true
      }, function(tabs) {
        activeTab = tabs[0].id
        chrome.tabs.sendMessage(activeTab, {'color': color}, function (res) {
      });
    });
  });

  $('button.remove').on('click', function(e){
    chrome.tabs.query({
      active: true,
      currentWindow: true
      }, function(tabs) {
        activeTab = tabs[0].id
        chrome.tabs.sendMessage(activeTab, {'remove': true}, function (res) {
      });
    });
  });

});
