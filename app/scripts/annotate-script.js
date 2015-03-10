var Highlighter = rangy.createHighlighter();

var Red = rangy.createClassApplier('Red');
var Blue = rangy.createClassApplier('Blue');
var Green = rangy.createClassApplier('Green');
var Pink = rangy.createClassApplier('Pink');
var Aqua = rangy.createClassApplier('Aqua');
var Yellow = rangy.createClassApplier('Yellow');

var Color = 'Yellow'

Highlighter.addClassApplier(Red)
Highlighter.addClassApplier(Blue)
Highlighter.addClassApplier(Green)
Highlighter.addClassApplier(Pink)
Highlighter.addClassApplier(Aqua)
Highlighter.addClassApplier(Yellow)

// Message Listener
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
   console.log(request, " received from ", sender)

   if (request.popup) {
    console.log("the COLOR was ", Color)
    Color = request.popup;
    console.log("the COLOR is now ", Color)
   }

  }
);

function initialize(){

  // Request Tab URL from Background
  chrome.runtime.sendMessage({greeting: "What is my URL?"}, function(response) {
   
    var url = response.url.toString();

    chrome.storage.local.get(function (result) {
      console.log('This is the Storage',result)
      
      // If URL does not exist on storage, then create storage array
      if (result[url] === undefined){

        var urlStorage={} 
            urlStorage[url]=[];

        chrome.storage.local.set(urlStorage, function(result){
          console.log("Added URL to storage")
        })

      // URL already exists in storage, then repopulate highlights
      } else {
        console.log("The URL exists in storage")
        console.log("starting deserialization")

        var ranges = result[url]

        Highlighter.deserialize(ranges);
      }
    });
  });

};

function saveHighlights(ranges){

  var url = window.location.href.toString();
  console.log(url)

  chrome.storage.local.get(function(result){

    if ( result[url] === undefined ){
      console.log("ERROR URL DOESNT EXIST ON STORAGE");
    } else {
      result[url] = ranges
    }

    console.log("ADDED ",result[url])

    chrome.storage.local.set(result, function(){
      console.log('success')
    });
  });  
}

$(function() {

  var url = window.location.href.toString();
  var ranges;

  initialize();
  
  $('body').mouseup(function(){
    Highlighter.highlightSelection(Color)
    ranges = Highlighter.serialize();
    saveHighlights(ranges);
  });

  

});




