var background = chrome.extension.getBackgroundPage();
var activeTab;

$(function() {
  
  $('button#color-button').on('click', function(e){
  	var color = $(this).attr('class')
  	background.console.log("you clicked the color ", color);

    chrome.tabs.query({
      active: true,
      currentWindow: true
      }, function(tabs) {
        
        activeTab = tabs[0].id
        background.console.log("the active tab is ", activeTab);
        chrome.tabs.sendMessage(activeTab, {popup: color}, function (res) {
        console.log("Response from tab is ", res);
      });
    });
  });

  $('button.remove').on('click', function(e){
    background.console.log("you want to remove?");
    chrome.tabs.sendMessage(activeTab, {remove: "remove all highlights"}, function (res) {
      console.log("Response from tab is ", res);
    });
  })
});
