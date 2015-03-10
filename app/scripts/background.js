// 'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	var url = sender.url;

  	console.log('theres a response!')
   	console.log('the request is ', request);

  	sendResponse({'url': url});
  });

console.log('HELLO FROM THE BACKGROUND');

