// 'use strict';

 chrome.tabs.getSelected(null,function(tab) {
      var tablink = tab.url;
      console.log(tablink)
  });

// chrome.runtime.onInstalled.addListener(function (details) {
//   console.log('previousVersion', details.previousVersion);
// });

// chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');
