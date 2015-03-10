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

$('button#color-button').on('click', function(e){
 
	var color = $(this).attr('class')
	background.console.log("you clicked the color ", color);

  // Send message to content script to change highlight color
  chrome.tabs.sendMessage(activeTab, {popup: color}, function (res) {
    console.log(res);
  });
})

$('button.remove').on('click', function(e){


  background.console.log("you want to remove?");

  chrome.tabs.sendMessage(activeTab, {remove: "remove all highlights"}, function (res) {

    console.log(res);
  });
})