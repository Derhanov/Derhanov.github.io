"use strict";

(function () {
    function touchHandler(e) {
        var touches = e.changedTouches;
        var first = touches[0];
        var type = "";

        switch (e.type) {
            case "touchstart":
                type = "mousedown";
                break;
            case "touchmove":
                type = "mousemove";
                break;
            case "touchend":
                type = "mouseup";
                break;
            default:
                return;
        }

        //     var simulatedEvent = document.createEvent("MouseEvent");
        //     simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
        //
        //     first.target.dispatchEvent(simulatedEvent);
        //     e.preventDefault();
        // }

        // new method

        var simulatedEvent = new MouseEvent(type, {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: first.clientX,
            clientY: first.clientY,
            screenX: first.screenX,
            screenY: first.screenY
        });
        first.target.dispatchEvent(simulatedEvent);
    }

    function init() {
        document.addEventListener("touchstart", touchHandler, true);
        document.addEventListener("touchmove", touchHandler, true);
        document.addEventListener("touchend", touchHandler, true);
        document.addEventListener("touchcancel", touchHandler, true);
    }

    init();
})();

var box = document.querySelectorAll('.draggable');
for (var i = 0; i < box.length; i++) {
    box[i].addEventListener("mousedown", function () {
        this.style.zIndex = 1000;
    }, true);

    box[i].addEventListener("mouseleave", function () {
        this.style.zIndex = 0;
    }, true);
}

var DragManager = new function () {
    var dragObject = {};
    var self = this;

    function onMouseDown(e) {

        if (e.which != 1) return;

        var elem = e.target.closest('.draggable');
        if (!elem) return;
        dragObject.elem = elem;

        // dragObject.elem.style.zIndex = 100;
        dragObject.downX = e.pageX;
        dragObject.downY = e.pageY;
        return false;
    }

    function onMouseMove(e) {
        if (!dragObject.elem) return; // элемент не зажат

        if (!dragObject.avatar) {
            var moveX = e.pageX - dragObject.downX;
            var moveY = e.pageY - dragObject.downY;

            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            dragObject.avatar = createAvatar(e);
            if (!dragObject.avatar) {
                // cancel drag
                dragObject = {};
                return;
            }

            var coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;
            startDrag(e);
        }

        dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

        return false;
    }

    function onMouseUp(e) {
        var elem = e.target.closest('.draggable');
        if (!elem) return;
        dragObject.elem = elem;
        // dragObject.elem.style.zIndex = 100;

        if (dragObject.avatar) {
            finishDrag(e);
        }
        dragObject = {};
    }

    function finishDrag(e) {
        var dropElem = findDroppable(e);

        if (!dropElem) {
            self.onDragCancel(dragObject);
        } else {
            self.onDragEnd(dragObject, dropElem);
        }
    }

    function createAvatar(e) {
        var avatar = dragObject.elem;
        return avatar;
    }

    function startDrag(e) {
        var avatar = dragObject.avatar;
        document.body.appendChild(avatar);
        avatar.style.zIndex = 1000;
        avatar.style.position = 'absolute';
    }

    function findDroppable(event) {
        // for obj
        // dragObject.avatar.hidden = true;

        // получить самый вложенный элемент под курсором мыши
        var elem = document.elementFromPoint(event.clientX, event.clientY);

        // display obj
        // dragObject.avatar.hidden = false;

        if (elem == null) {
            return null;
        }

        return elem.closest('.droppable');
    }

    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onmousedown = onMouseDown;

    this.onDragEnd = function (dragObject, dropElem) {};
    this.onDragCancel = function (dragObject) {};
}();

function getCoords(elem) {
    // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

// document.getElementById('drag1').addEventListener('dragstart', function (e) {
//     e.preventDefault();
//     const img = document.createElement('IMG');
//     img.src = 'img/6.png';
// e.dataTransfer.setDragImage(img, 0, 0);
// }, false);
//# sourceMappingURL=main.js.map
