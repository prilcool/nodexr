﻿
//var nodeToDrag = document.getElementById("nodetest1");
//nodeToDrag.style.top = "700px";

var nodeToDrag = undefined;
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

function dragTest() {
    var nodesToDrag = document.getElementsByClassName("node");

    for (var i = 0; i < nodesToDrag.length; i++) {
        //dragElement(nodesToDrag[i]);
        var nodeElement = nodesToDrag[i];
        //nodeElement.onmousedown = function (e) { startNodeDrag(e, nodeElement)};
        nodeElement.onmousedown = startNodeDrag;
    }
}

function initNodeDrag(element) {
    element.onmousedown = function (e) { startNodeDrag(e, element )};
}

function startNodeDrag(e) {
    nodeToDrag = e.target.parentElement;
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = endNodeDrag;
    // call a function whenever the cursor moves:
    document.onmousemove = dragNode;
}

function dragNode(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    nodeToDrag.style.top = (nodeToDrag.offsetTop - pos2) + "px";
    nodeToDrag.style.left = (nodeToDrag.offsetLeft - pos1) + "px";
}

function endNodeDrag() {
    // stop moving when mouse button is released:
    console.log("end drag");
    document.onmouseup = null;
    document.onmousemove = null;
}

//function dragElement(elmnt) {
//    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//    elmnt.onmousedown = dragMouseDown;


//    function dragMouseDown(e) {
//        nodeToDrag = elmnt;
//        e = e || window.event;
//        e.preventDefault();
//        // get the mouse cursor position at startup:
//        pos3 = e.clientX;
//        pos4 = e.clientY;
//        document.onmouseup = closeDragElement;
//        // call a function whenever the cursor moves:
//        document.onmousemove = elementDrag;
//    }

//    function elementDrag(e) {
//        e = e || window.event;
//        e.preventDefault();
//        // calculate the new cursor position:
//        pos1 = pos3 - e.clientX;
//        pos2 = pos4 - e.clientY;
//        pos3 = e.clientX;
//        pos4 = e.clientY;
//        // set the element's new position:
//        nodeToDrag.style.top = (elmnt.offsetTop - pos2) + "px";
//        nodeToDrag.style.left = (elmnt.offsetLeft - pos1) + "px";
//    }

//    function closeDragElement() {
//        // stop moving when mouse button is released:
//        document.onmouseup = null;
//        document.onmousemove = null;
//    }
//}