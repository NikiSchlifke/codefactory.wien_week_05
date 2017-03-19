/**
 * Created by niki on 19.03.17.
 */


let add = (a,b) => a + b;

console.log(add(3,4));

let obj = {
    name: "a sim",
    sayLater: function () {
        let self = this;
        setTimeout(function () {
            console.log(`I am ${self.name}.
later!`);
        }, 1000);

    }
};

obj.sayLater();



let betterObj = {
    name: "a better sim",
    sayLater: function () {
        setTimeout(() => {
            console.log(`I am ${this.name}.
later!`);
        }, 1000);

    }
};

betterObj.sayLater();

const person = {first: 'Asim', last: "Hussain", age: 39};

const {first: f, last: g} = person;
console.log(f);
console.log(g);


const {first, last} = person;
console.log(first);
console.log(last);


const arr = ["a", "b"];
const [x, y] = arr;
console.log(`${x}, ${y}`);


// function destructing

let testDestruct = (options) => console.log(options.x);

testDestruct({x: 1});

function testDefaultArgs({x=1}) {
    console.log(x);
}
testDefaultArgs({});
testDefaultArgs({x:999});


// foreach

let data = [1,2,3,4];
data.forEach(function (value) {
    console.log(value);
}); // Note can't use return from within the loop, can't use break

for (let value of data) {
    console.log(value*10);
}

let fruits1 = new Set();
fruits1.add("Apple");
fruits1.add("Orange");
fruits1.add("Mango");

let fruits2 = new Set(["Kiwi", "Blueberry", "Banana"]);
console.log(fruits1.has("Apple"));

fruits1.delete("Apple");
console.log(fruits1.has("Apple"));


for (let fruit of fruits2) {
    console.log(fruit);
}



