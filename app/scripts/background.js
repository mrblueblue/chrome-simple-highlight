// 'use strict';


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	var url = sender.url;

  	console.log('theres a response!')
   	console.log('the request is ', request);

  	sendResponse({'url': url});
  });

// chrome.tabs.query({}, function(tabs) {
// 	var message;
//     for (var i=0; i<tabs.length; ++i) {
//     	message=tabs[i].url
//         chrome.tabs.sendMessage(tabs[i].id, message);
//         console.log(message)
//     }
// });

console.log('HELLO FROM THE BACKGROUND');
