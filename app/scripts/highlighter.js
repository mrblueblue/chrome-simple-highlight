
$(window).on('load', initialize())

function initialize() {

  console.log('Loaded', rangy)

  var tabUrl = window.location.href.toString();
  var selection = window.getSelection();
  var ranges;

  var Color = 'Yellow';
  var Highlighter = rangy.createHighlighter(document, 'textContent');

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

  var reloadHighlights = function(){
    chrome.storage.local.get( function (storage) {
      if (storage[tabUrl]){
        ranges = storage[tabUrl];
        Highlighter.deserialize(ranges);
      }
    });
  };

  var saveHighlights = function(ranges){
    chrome.storage.local.get( function (storage) {
      storage[tabUrl] = ranges;
      chrome.storage.local.set(storage, function(){
        console.log('saved higlights');
      });
    });  
  };

  // Message Listener
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
     if (request.color) {
      Color = request.color;
     }
     if (request.remove) {
      console.log('remove')
      Highlighter.removeAllHighlights();
      ranges = Highlighter.serialize();
      saveHighlights(ranges);
     }
    }
  );

  reloadHighlights();

  $('body').mouseup( function() {
    if ( selection.type === "Range" ){ 
      Highlighter.highlightSelection(Color);
      ranges = Highlighter.serialize();
      saveHighlights(ranges);
    }
  });
};
