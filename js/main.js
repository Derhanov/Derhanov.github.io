"use strict";

// document.addEventListener('DOMContentLoaded', function () {


// const boxList = document.getElementsByClassName('draggable');
// boxList.onmousedown = function (e) {
//     for(let i=0; i < boxList.length; i++) {
//         let obj = boxList[i];
//         const touch = event.targetTouches[0];
//         event.target.style.left = touch.pageX + 'px';
//         event.target.style.top = touch.pageY + 'px';
//             event.preventDefault();
//         }
// }

// const dragObj = {};
//
// document.onmousedown = function (e) {
//     if (e.wich != 1) {
//         return;
//     }
//     const elem = e.target.closest('.draggable');
//     if (!elem) {
//         return;
//     }
//     dragObj.elem = elem;
//     dragObj.downX = e.pageX;
//     dragObj.downY = e.pageY;
// };
//
// document.onmousemove = function (e) {
//     if(!dragObj.elem) return;
//     if(!dragObj.avatar) {
//         const moveX = e.pageX - dragObj.downX;
//         const moveY = e.pageY - dragObj.downY;
//         if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
//             return;
//         }
//         dragObj.avatar = createAvatar(e);
//         if (!dragObject.avatar) {
//             dragObject = {};
//             return;
//         }
//         const coords = getCoords(dragObj.avatar);
//         dragObj.shiftX = dragObj.downX -coords.left;
//         dragObj.shiftY = dragObj.downY - coords.top;
//
//         startDrag(e);
//     }
//
//     dragObj.avatar.style.left = e.pageX - dragObj.shiftX + 'px';
//     dragObj.avatar.style.top = e.pageY - dragObj.shiftY + 'px';
//
//     return false;
// };
//
// function createAvatar(e) {
//
//     // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
//     var avatar = dragObj.elem;
//     var old = {
//         parent: avatar.parentNode,
//         nextSibling: avatar.nextSibling,
//         position: avatar.position || '',
//         left: avatar.left || '',
//         top: avatar.top || '',
//         zIndex: avatar.zIndex || ''
//     };
//
//     // функция для отмены переноса
//     avatar.rollback = function() {
//         old.parent.insertBefore(avatar, old.nextSibling);
//         avatar.style.position = old.position;
//         avatar.style.left = old.left;
//         avatar.style.top = old.top;
//         avatar.style.zIndex = old.zIndex
//     };
//
//     return avatar;
// }
//
// function startDrag(e) {
//     var avatar = dragObj.avatar;
//
//     document.body.appendChild(avatar);
//     avatar.style.zIndex = 9999;
//     avatar.style.position = 'absolute';
// }

// });

// const bodyDoc = document.querySelector('body');
// const div = document.createElement('DIV');
// document.body.appendChild(div);
// div.innerHTML = '<h1>Hello world</h1>';
// console.log(bodyDoc);

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

        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);

        first.target.dispatchEvent(simulatedEvent);
        e.preventDefault();
    }

    //     var simulatedEvent = new MouseEvent("click", {
    //         view: window,
    //         bubbles: true,
    //         cancelable: true,
    //         clientX: first.clientX,
    //         clientY: first.clientY,
    //         screenX: first.screenX,
    //         screenY: first.screenY
    // });
    //     first.target.dispatchEvent(simulatedEvent);
    //     console.log(simulatedEvent)
    //
    // }

    function init() {
        document.addEventListener("touchstart", touchHandler, true);
        document.addEventListener("touchmove", touchHandler, true);
        document.addEventListener("touchend", touchHandler, true);
        document.addEventListener("touchcancel", touchHandler, true);
    }

    init();
})();

var DragManager = new function () {

    /**
     * составной объект для хранения информации о переносе:
     * {
    *   elem - элемент, на котором была зажата мышь
    *   avatar - аватар
    *   downX/downY - координаты, на которых был mousedown
    *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
    * }
     */
    var dragObject = {};

    var self = this;

    function onMouseDown(e) {

        if (e.which != 1) return;

        var elem = e.target.closest('.draggable');
        if (!elem) return;

        dragObject.elem = elem;

        // запомним, что элемент нажат на текущих координатах pageX/pageY
        dragObject.downX = e.pageX;
        dragObject.downY = e.pageY;

        return false;
    }

    function onMouseMove(e) {
        if (!dragObject.elem) return; // элемент не зажат

        if (!dragObject.avatar) {
            // если перенос не начат...
            var moveX = e.pageX - dragObject.downX;
            var moveY = e.pageY - dragObject.downY;

            // если мышь передвинулась в нажатом состоянии недостаточно далеко
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            // начинаем перенос
            dragObject.avatar = createAvatar(e); // создать аватар
            if (!dragObject.avatar) {
                // отмена переноса, нельзя "захватить" за эту часть элемента
                dragObject = {};
                return;
            }

            // аватар создан успешно
            // создать вспомогательные свойства shiftX/shiftY
            var coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;

            startDrag(e); // отобразить начало переноса
        }

        // отобразить перенос объекта при каждом движении мыши
        dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

        return false;
    }

    function onMouseUp(e) {
        if (dragObject.avatar) {
            // если перенос идет
            finishDrag(e);
        }

        // перенос либо не начинался, либо завершился
        // в любом случае очистим "состояние переноса" dragObject
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

        // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
        var avatar = dragObject.elem;
        // var old = {
        //     parent: avatar.parentNode,
        //     nextSibling: avatar.nextSibling,
        //     position: avatar.position || '',
        //     left: avatar.left || '',
        //     top: avatar.top || '',
        //     zIndex: avatar.zIndex || ''
        // };
        //
        // // функция для отмены переноса
        // avatar.rollback = function() {
        //     old.parent.insertBefore(avatar, old.nextSibling);
        //     avatar.style.position = old.position;
        //     avatar.style.left = old.left;
        //     avatar.style.top = old.top;
        //     avatar.style.zIndex = old.zIndex
        // };

        return avatar;
    }

    function startDrag(e) {
        var avatar = dragObject.avatar;

        // инициировать начало переноса
        document.body.appendChild(avatar);
        avatar.style.zIndex = 9999;
        avatar.style.position = 'absolute';
    }

    function findDroppable(event) {
        // спрячем переносимый элемент
        dragObject.avatar.hidden = true;

        // получить самый вложенный элемент под курсором мыши
        var elem = document.elementFromPoint(event.clientX, event.clientY);

        // показать переносимый элемент обратно
        dragObject.avatar.hidden = false;

        if (elem == null) {
            // такое возможно, если курсор мыши "вылетел" за границу окна
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
//# sourceMappingURL=main.js.map
