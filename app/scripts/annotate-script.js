
// $(document).ready(function(){
// 	console.log("ANNOATE SCRIPT SAYS ANNOTATE!")

// 	$( "p" ).mouseup(function() {
//     var selection = window.getSelection()
//     console.log(selection.toString())
//     console.log(selection)
//     console.log("hello")

//     document.execCommand("BackColor", false, "yellow");

//   })

// })

function makeEditableAndHighlight(colour) {
    var range, sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
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

$(function() {
  $('#content').mouseup(function(){
        highlight('#D4FF00');
  });
});

// // Make sure the object is created if it's already not
// if(!window.CurrentSelection){
//     CurrentSelection = {}
// }
// //define the selector object
// CurrentSelection.Selector = {}
 
// //get the current selection
// CurrentSelection.Selector.getSelected = function(){
//     var sel = '';
//     if(window.getSelection){
//         sel = window.getSelection()
//     }
//     else if(document.getSelection){
//         sel = document.getSelection()
//     }
//     else if(document.selection){
//         sel = document.selection.createRange()
//     }
//     return sel
// }
// //function to be called on mouseup
// CurrentSelection.Selector.mouseup = function(){
//     var st = CurrentSelection.Selector.getSelected()
//     if(document.selection && !window.getSelection){
//         var range = st
//         range.pasteHTML("<span class='selectedText'>" + range.htmlText + "</span>");
//     }
//     else{
//         var range = st.getRangeAt(0)    
//         var newNode = document.createElement("span");
//         console.log(range)
//         newNode.setAttribute("class", "selectedText");
//         range.surroundContents(newNode)                
//     }
// }
 
// $(function(){
//     $(document.body).bind("mouseup",CurrentSelection.Selector.mouseup)
// })