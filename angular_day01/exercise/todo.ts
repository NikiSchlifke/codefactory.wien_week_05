class TodoItem {
    static count = 0;

    constructor(public text) {
        this.text = text;
        TodoItem.count++;
    }
}

let tasks = [];

let todoText = document.getElementsByName('todo--text')[0];
let todoCount = document.getElementById("todo--count");
let todoList = document.getElementById('todo--items');
document.getElementById("todo--submit").addEventListener("click", () => {
    let item = new TodoItem(todoText.value);
    tasks.push(item);
    let itemDom = document.createElement("li");
    itemDom.setAttribute("class", "list-group-item");
    itemDom.textContent = item.text;
    todoList.appendChild(itemDom);
    todoCount.textContent = String(TodoItem.count);
});