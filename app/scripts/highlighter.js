
var tabUrl = window.location.href.toString();
var Color = 'Yellow'
var selection = window.getSelection();
var ranges;

var Highlighter = rangy.createHighlighter();

var Red = rangy.createClassApplier('Red');
var Blue = rangy.createClassApplier('Blue');
var Green = rangy.createClassApplier('Green');
var Pink = rangy.createClassApplier('Pink');
var Aqua = rangy.createClassApplier('Aqua');
var Yellow = rangy.createClassApplier('Yellow');

Highlighter.addClassApplier(Red);
Highlighter.addClassApplier(Blue);
Highlighter.addClassApplier(Green);
Highlighter.addClassApplier(Pink);
Highlighter.addClassApplier(Aqua);
Highlighter.addClassApplier(Yellow);

$(function() {
  reloadHighlights();
  $('body').mouseup( function() {
    if ( selection.type === "Range" ){ 
      Highlighter.highlightSelection(Color);
      ranges = Highlighter.serialize();
      saveHighlights(ranges);
    }
  });

  // $('body').dblclick( function() {
  //   console.log('click')
  //   if ( selection.type === "Range" ){ 
  //     Highlighter.unhighlightSelection()
  //     ranges = Highlighter.serialize();
  //     saveHighlights(ranges);
  //   }
  // });
});

// Message Listener
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
   if (request.popup) {
    Color = request.popup;
   }
   if (request.remove) {
    Highlighter.removeAllHighlights();
    ranges = Highlighter.serialize();
    saveHighlights(ranges);
   }
  }
);

function reloadHighlights(){
  chrome.storage.local.get( function (storage) {
    if (storage[tabUrl]){
      ranges = storage[tabUrl];
      Highlighter.deserialize(ranges);
    }
  });
};

function saveHighlights(ranges){
  chrome.storage.local.get( function (storage) {
    storage[tabUrl] = ranges;
    chrome.storage.local.set(storage, function(){
      console.log('saved higlights');
    });
  });  
};





