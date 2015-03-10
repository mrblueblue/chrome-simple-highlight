var background = chrome.extension.getBackgroundPage();
var activeTab;

background.console.log('\'Allo \'Allo! Popup 123123');

// Setting the Active Tab
window.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    activeTab = tabs[0].id
    background.console.log("the active tab is ", activeTab);
  });
});

$('button').on('click', function(){
	var color = $(this).attr('class')
	background.console.log("you clicked the color ", color);

  // Send message to content script to change highlight color
  chrome.tabs.sendMessage(activeTab, {greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });

})