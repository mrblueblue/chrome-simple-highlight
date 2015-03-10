

function initialize(){

  // Request Tab URL from Background
  chrome.runtime.sendMessage({greeting: "I need my url. Please. Thank you."}, function(response) {
   
    var url = response.url.toString();

    chrome.storage.local.get(function (result) {
      console.log('This is the Storage',result)

      // If URL does not exist on storage, then create storage array
      if (result.url === undefined){
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


function makeEditableAndHighlight(colour) {
    var range, sel = window.getSelection();

    if (sel.rangeCount && sel.getRangeAt) {
      range = sel.getRangeAt(0);

      // Save range to chrome storage
      console.log("THIS IS A RANGE", rangy.serializeRange(range))
      saveRange(rangy.serializeRange(range));
    }

    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("BackColor", false, colour);
    }
    document.designMode = "off";
}

function highlight(colour) {
    var range, sel;
    if (window.getSelection) {
        // IE9 and non-IE
        try {
            if (!document.execCommand("BackColor", false, colour)) {
                makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            makeEditableAndHighlight(colour)
        }
    } else if (document.selection && document.selection.createRange) {
        // IE <= 8 case
        range = document.selection.createRange();
        range.execCommand("BackColor", false, colour);
    }
}

function trawlRanges(url){

  chrome.storage.local.get( function (result) {

    var ranges = result[url];

    console.dir(result)
    // console.dir(ranges)

    ranges.forEach( function (range) {
      console.dir(range);
    })
  })

};


$(function() {

  var url = window.location.href.toString();

  initialize();

  trawlRanges(url);
  
  $('body').on('click', function(){console.dir($('this').data())})
  $('body').mouseup(function(){
      console.log('highlighted!')
        highlight('yellow');
  });


});


