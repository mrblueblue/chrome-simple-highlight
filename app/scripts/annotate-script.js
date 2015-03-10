

function saveRange(range){
  chrome.storage.local.get('highlighted', function(result){
    console.log("now we are pushing")
    console.log(result)

    result['highlighted'].push(range)
    console.log('this is the result ', result)

    chrome.storage.local.set(result, function(){
      console.log('success')
    });
  });  
}

function init(){

 

  console.log("beginning initialization");

  chrome.storage.local.get('highlighted', function(result) {

    if (result === undefined) {
      console.log('result is undefined')
      chrome.storage.local.set({'highlighted':[]}, function(result){
        console.log("Initialized ", result)
      })
    } else {

      console.log('highlighted already exists');     

    }

  });
}

function makeEditableAndHighlight(colour) {
    var range, sel = window.getSelection();

    if (sel.rangeCount && sel.getRangeAt) {
      range = sel.getRangeAt(0);
      saveRange(range);
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

// function saveRange(range) {
 
//   chrome.storage.local.get('highlighted');
// }

// function loadRanges() {
//   chrome.storage.local.get('highlighted', function(result){
//     console.log(result)
//   });
// }

$(function() {
  console.log("annotate");
  
  init();

  $('body').mouseup(function(){
      console.log('highlighted!')
        highlight('yellow');
  });
});

