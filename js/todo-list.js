'use strict';

// (function () {
//
//     function MainList() {
//         const that = this;
//         this.element = document.createElement('UL');
//
//         this.addItem = function (text) {
//             const item = new Item(text);
//             this.element.appendChild(item.element);
//         };
//         this.element.appendChild(prepareAddDiv());
//
//         function prepareAddDiv() {
//             const div = document.createElement('DIV');
//             div.className = 'header-list';
//             div.appendChild(prepareAddInput());
//             div.appendChild(prepareAddBtn());
//             return div;
//
//             function prepareAddInput() {
//                 const input = document.createElement('INPUT');
//                 input.type = 'text';
//                 input.className = 'new-item';
//                 input.placeholder = 'Add new task';
//                 input.onkeyup = function (e) {
//                     if (this.value == '') {
//                         alert('You must write any task')
//                     } else {
//                         if (e.keyCode == 13) {
//                             that.addItem(this.value);
//                             this.value = '';
//                         }
//                     }
//
//                 };
//                 return input;
//             }
//
//             function prepareAddBtn() {
//                 const btn = document.createElement('BUTTON');
//                 btn.className = 'btn btn-add';
//                 btn.textContent = 'Add';
//                 btn.addEventListener('click', function () {
//                     var val = document.querySelector('.new-item');
//                     if (val.value == '') {
//                         alert('You must write any task')
//                     } else {
//                         that.addItem(document.querySelector('.new-item').value);
//                         val.value = '';
//                     }
//                 }, false);
//
//                 return btn;
//             }
//         }
//     }
//
//
//     function Item(text) {
//         const item = this; // that = this
//         this.element = prepareElement();
//
//
//         function prepareElement() {
//             const elem = document.createElement('LI');
//             elem.appendChild(prepareCheckbox());
//             elem.append(text);
//             elem.appendChild(prepareDelBtn());
//             return elem;
//         }
//
//         function prepareDelBtn() {
//             const btn = document.createElement('BUTTON');
//             btn.className = 'btn btn-del';
//             btn.textContent = 'Delete';
//             btn.addEventListener('click', function () {
//                 item.element.remove();
//             }, false);
//             return btn;
//         }
//
//         function prepareCheckbox() {
//
//
//             const chek = document.createElement('INPUT');
//             chek.type = 'checkbox';
//             chek.count = 0;
//             chek.className = 'chek-list';
//             chek.addEventListener('click', function (e) {
//                 if (this.checked) {
//                     item.element.style.textDecoration = 'line-through'; // else add class with css rules
//                     chek.count++;
//                     let num = document.querySelectorAll('input:checked').length;
//                     document.querySelector(".count").innerHTML = num;
//                 } else {
//                     item.element.style.textDecoration = 'none';
//                     chek.count--;
//                     let num = document.querySelectorAll('input:checked').length;
//                     document.querySelector(".count").innerHTML = num;
//                 }
//
//             }, false);
//             return chek;
//         }
//     }
//
//
//     const list = new MainList();
//     list.addItem('example todo list');
//     document.body.querySelector('.wrap-list').appendChild(list.element)
//
// })();


var ulList = document.createElement('UL');
var itemLi = document.createElement('LI');
ulList.appendChild(itemLi);
document.body.querySelector('.wrap-list').appendChild(ulList);

// function MainList() {
//     // const that = this;
//     this.element = document.createElement('UL');
//
//     this.addItem = function (text) {
//         const item = new Item(text);
//         this.element.appendChild(item.element);
//     };
//     this.element.appendChild(prepareAddDiv());
// }
//
// function prepareAddDiv() {
//     const div = document.createElement('DIV');
//     div.className = 'header-list';
//     div.appendChild(prepareAddInput());
//     div.appendChild(prepareAddBtn());
//     return div;
// }
//
// function prepareAddInput() {
//     const input = document.createElement('INPUT');
//     input.type = 'text';
//     input.className = 'new-item';
//     input.placeholder = 'Add new task';
//     input.onkeyup = function (e) {
//         if (this.value == '') {
//             alert('You must write any task')
//         } else {
//             if (e.keyCode == 13) {
//                 that.addItem(this.value);
//                 this.value = '';
//             }
//         }
//
//     };
//     return input;
// }
//
// function prepareAddBtn() {
//     const btn = document.createElement('BUTTON');
//     btn.className = 'btn btn-add';
//     btn.textContent = 'Add';
//     btn.addEventListener('click', function () {
//         var val = document.querySelector('.new-item');
//         if (val.value == '') {
//             alert('You must write any task')
//         } else {
//             that.addItem(document.querySelector('.new-item').value);
//             val.value = '';
//         }
//     }, false);
//
//     return btn;
// }
//
// function Item(text) {
//     const item = this; // that = this
//     this.element = prepareElement();
// }
//
//
// function prepareElement() {
//     const elem = document.createElement('LI');
//     elem.appendChild(prepareCheckbox());
//     elem.append(text);
//     elem.appendChild(prepareDelBtn());
//     return elem;
// }
//
// function prepareDelBtn() {
//     const btn = document.createElement('BUTTON');
//     btn.className = 'btn btn-del';
//     btn.textContent = 'Delete';
//     btn.addEventListener('click', function () {
//         item.element.remove();
//     }, false);
//     return btn;
// }
//
// function prepareCheckbox() {
//     const chek = document.createElement('INPUT');
//     chek.type = 'checkbox';
//     chek.count = 0;
//     chek.className = 'chek-list';
//     chek.addEventListener('click', function (e) {
//         if (this.checked) {
//             item.element.style.textDecoration = 'line-through'; // else add class with css rules
//             chek.count++;
//             let num = document.querySelectorAll('input:checked').length;
//             document.querySelector(".count").innerHTML = num;
//         } else {
//             item.element.style.textDecoration = 'none';
//             chek.count--;
//             let num = document.querySelectorAll('input:checked').length;
//             document.querySelector(".count").innerHTML = num;
//         }
//
//     }, false);
//     return chek;
// }
//
//
// const list = new MainList();
// list.addItem('example todo list');
// document.body.querySelector('.wrap-list').appendChild(list.element)
//
//
//
//
//
//# sourceMappingURL=todo-list.js.map
