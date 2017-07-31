'use strict';

(function () {

    function MainList() {
        var that = this;
        this.element = document.createElement('UL');

        this.addItem = function (text) {
            var item = new Item(text);
            this.element.appendChild(item.element);
        };
        this.element.appendChild(prepareAddDiv());

        function prepareAddDiv() {
            var div = document.createElement('DIV');
            div.className = 'header-list';
            div.appendChild(prepareAddInput());
            div.appendChild(prepareAddBtn());
            return div;

            function prepareAddInput() {
                var input = document.createElement('INPUT');
                input.type = 'text';
                input.className = 'new-item';
                input.placeholder = 'Add new task';
                input.onkeyup = function (e) {
                    if (this.value == '') {
                        alert('You must write any task');
                    } else {
                        if (e.keyCode == 13) {
                            that.addItem(this.value);
                            this.value = '';
                        }
                    }
                };
                return input;
            }

            function prepareAddBtn() {
                var btn = document.createElement('BUTTON');
                btn.className = 'btn btn-add';
                btn.textContent = 'Add';
                btn.addEventListener('click', function () {
                    var val = document.querySelector('.new-item');
                    if (val.value == '') {
                        alert('You must write any task');
                    } else {
                        that.addItem(document.querySelector('.new-item').value);
                        val.value = '';
                    }
                }, false);

                return btn;
            }
        }
    }

    function Item(text) {
        var item = this; // that = this
        this.element = prepareElement();

        function prepareElement() {
            var elem = document.createElement('LI');
            elem.appendChild(prepareCheckbox());
            elem.append(text);
            elem.appendChild(prepareDelBtn());
            return elem;
        }

        function prepareDelBtn() {
            var btn = document.createElement('BUTTON');
            btn.className = 'btn btn-del';
            btn.textContent = 'Delete';
            btn.addEventListener('click', function () {
                item.element.remove();
            }, false);
            return btn;
        }

        function prepareCheckbox() {

            var chek = document.createElement('INPUT');
            chek.type = 'checkbox';
            chek.count = 0;
            chek.className = 'chek-list';
            chek.addEventListener('click', function (e) {
                if (this.checked) {
                    item.element.style.textDecoration = 'line-through'; // else add class with css rules
                    chek.count++;
                    var num = document.querySelectorAll('input:checked').length;
                    document.querySelector(".count").innerHTML = num;
                } else {
                    item.element.style.textDecoration = 'none';
                    chek.count--;
                    var _num = document.querySelectorAll('input:checked').length;
                    document.querySelector(".count").innerHTML = _num;
                }
            }, false);
            return chek;
        }
    }

    var list = new MainList();
    list.addItem('example todo list');
    document.body.querySelector('.wrap-list').appendChild(list.element);
})();

(function () {
    // const listUl = document.querySelector('.task-list');
    // const listItem = document.querySelectorAll('.task-list li');
    // const close = document.querySelector('.btn-close');

    // function newElement() {
    //     var elem = this;
    //     var li = document.createElement("li");
    //     var inputValue = document.querySelector(".add-task").value;
    //     var textV = document.createTextNode(inputValue);
    //     li.appendChild(textV);
    //     if (inputValue === '') {
    //         alert("write text value");
    //     } else {
    //         listUl.appendChild(li);
    //     }
    //     document.querySelector(".add-task").value = "";
    //
    //     const input = document.createElement('INPUT');
    //     const label = document.createElement('LABEL');
    //     // input.id = 'checked-box';
    //     input.type = 'checkbox';
    //     // label.htmlFor = 'checked-box';
    //     li.appendChild(input);
    //     li.appendChild(label);
    //
    //     const btn = document.createElement("BUTTON");
    //     const txtButton = document.createTextNode("Delete");
    //     btn.className = "btn btn-close";
    //     btn.appendChild(txtButton);
    //     li.appendChild(btn);
    //
    // }

    // const addTask = document.querySelector('.btn-add').addEventListener('click', newElement, false);


    // listUl.addEventListener('click', function (e) {
    //     if (e.target.tagName === 'LI' || e.target.tagName === 'LABEL') {
    //         const input = document.querySelector('input');
    //         // input.classList.add("checked");
    //         listUl.querySelector('label');
    //         console.log(listUl);
    //         e.target.input.classList('checked');
    //     }
    // }, false);
    // close.addEventListener('click', function () {
    // for(var i=0; i < listItem.length; i++) {
    //     listItem[i].parentNode.removeChild(listItem[i]);
    // }


    //     const listItem = document.querySelectorAll('.task-list li');
    //     for(var i=0; i<listItem.length; i++) {
    //         console.log(listItem[i]);
    //         listItem[i].parentNode.removeChild(listItem[i]);
    //     }
    //
    // }, false);


})();
//# sourceMappingURL=todo-list.js.map
