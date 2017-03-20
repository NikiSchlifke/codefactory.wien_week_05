abstract class StoreAble {
    set items(value) {
        StoreAble._items = value;
    }
    get items() {
        return StoreAble._items;
    }



    static get maxID() {
        if (!localStorage.hasOwnProperty('maxID')) {
            localStorage.setItem('maxID', "1");
        }
        this._maxID = Number(localStorage.getItem('maxID'));
        return this._maxID;
    }

    static set maxID(value) {
        this._maxID = value;
        localStorage.setItem('maxID', String(this._maxID));
    }

    private static _items = {};
    private static _maxID;

    private _id;
    private _args;


    constructor({newID=true, id=0}) {
        if (newID) {
            this._id = StoreAble.maxID + 1;
        } else {
            this._id = id;
        }
    }

    get id() {
        return this._id;
    }


    restoreProperties() {
        this.properties.forEach((property) => {
            this[property] = this.items[this._id][property];
        })
    }

    saveProperties() {
        this.properties.forEach((property) => {
            console.log(this.items);
            this.items[this._id] = {};
            this.items[this._id][property] = this[property];
        })
    }

    abstract get properties();

}



class TodoItem extends StoreAble implements StoreAbleContract {
    private static _count = 0;
    static todoList = document.getElementById('todo--items');
    static todoCount = document.getElementById("todo--count");

    private _text;
    protected itemDom;
    constructor({newID=true, id=0}) {
        super({newID, id});
        TodoItem.count++;
    }



    get properties() {
        return ["_text"];
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
        this.placeListItem();
    }



    static set count(value: number) {
        this._count = value;
        TodoItem.todoCount.textContent = String(TodoItem._count);
    }


    static get count(): number {
        return this._count;
    }

    placeListItem() {
        this.itemDom = document.createElement("li");
        this.itemDom.setAttribute("class", "list-group-item");
        this.itemDom.textContent = this._text;
        this.itemDom.appendChild(this.deleteButton());
        TodoItem.todoList.appendChild(this.itemDom);
    }

    deleteButton() {
        let buttonDom = document.createElement("button");
        buttonDom.textContent = "delete";
        buttonDom.setAttribute("class", "btn btn-primary");
        this.itemDom.appendChild(buttonDom);
        buttonDom.addEventListener("click", () => {
            TodoItem.count--;
            TodoItem.todoList.removeChild(this.itemDom);
        });
        return buttonDom;
    }
}

interface StoreAbleContract {
    id: number;
    items: Object;
}

class LocalStorageAdapter {
    constructor(private location: string) {
    }

    save(storeAble: StoreAbleContract) {
        console.log(storeAble.items);
        localStorage.setItem(this.location, JSON.stringify(storeAble.items));
    }

    read(storeAble: StoreAbleContract) {
        storeAble.items =  JSON.parse(localStorage.getItem(this.location))
    }
}

let itemStorage = new LocalStorageAdapter('items');

let testItem = new TodoItem({});
testItem.text = "Finish local storage.";
testItem.saveProperties();
itemStorage.save(testItem);


let tasks = [];

let todoText = document.getElementsByName('todo--text')[0];
let todoCount = document.getElementById("todo--count");

document.getElementById("todo--submit").addEventListener("click", () => {
    let item = new TodoItem(todoText.value);
    tasks.push(item);
});
