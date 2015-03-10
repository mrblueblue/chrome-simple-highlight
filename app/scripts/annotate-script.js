var Highlighter = rangy.createHighlighter();

var Red = rangy.createClassApplier('Red');
var Blue = rangy.createClassApplier('Blue');
var Green = rangy.createClassApplier('Green');
var Pink = rangy.createClassApplier('Pink');
var Aqua = rangy.createClassApplier('Aqua');

Highlighter
  .addClassApplier(Red)
  .addClassApplier(Blue)
  .addClassApplier(Green)
  .addClassApplier(Pink)
  .addClassApplier(Aqua)

console.dir(Highlighter);



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

      // URL already exists in storage
      } else {
        console.log("The URL exists in storage")
      }
    });

 });
};

function saveRange(range){

  var url = window.location.href.toString();
  console.log(url)

  chrome.storage.local.get(function(result){

    console.log(result)

    if ( result[url] === undefined ){
      console.log("ERROR URL DOESNT EXIST ON STORAGE");
    } else {
      result[url].push(range)
    }

    console.log("ADDED ",result.url)

    chrome.storage.local.set(result, function(){
      console.log('success')
    });

  });  
}

function trawlRanges(url){

  chrome.storage.local.get( function (result) {

    var ranges = result[url];

    ranges.forEach( function (range) {
      console.log("starting deserialize")
      rangy.deserializeRange(range)
      console.log(window.getSelection())
      highlight('yellow');      
    })
  })

};


$(function() {

  var url = window.location.href.toString();

  initialize();

  trawlRanges(url);
  
  // $('body').on('click', function(){console.dir($('this').data())})
  $('body').mouseup(function(){
    console.log("HIGHLIGHT NOW")
    Highlighter.highlightSelection('Yellow')
  });


});


