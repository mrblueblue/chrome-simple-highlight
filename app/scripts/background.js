// 'use strict';

chrome.tabs.query({}, function(tabs) {
    var message = {'foo': 'bar'};
    for (var i=0; i<tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, message);
        console.log(tabs[i])
    }
});

console.log('\'Allo \'Allo! Event Page for Browser Action');
