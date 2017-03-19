

// Interface is a definition of which properties a class should have.
// It is usually defined before the classes that use it.
// Skip this for now but come back to it when you're done.
interface Human {
    firstName: string;
    lastName: string;
    name?: Function;
    isLate ? (time: Date): Function;
}
// This is a particularly bad example btw but just for brevity I'll leave it
// The reason why this is bad is because you define an interface based on
// some common properties of different classes like for instance

interface canWalk {
    legs: number;
    walk: Function;
}


// A class is a general concept of something used as a template
// it can later be used to create variables that are objects containing attributes defined here.
class Person implements Human, canWalk {
    isLate(time: Date): Function {
        return () => { return time > new Date() };
    }
    firstName = "";
    lastName = "";
    // adding proper legs
    legs = 2;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    name() {
        return `${this.firstName} ${this.lastName}`;
    }

    whoAreYou() {
        return `Hi I'm ${this.name()}`;
    }
    // a person walks differently to a dog.
    walk() {
        console.log(`walking with ${this.legs} legs: left, right...`)
    }
}

// A dog with 4 legs that can walk and has a dogName and a owner
class Dog implements canWalk {
    dogName: string;
    // a Dog belongs to a Person
    owner: Person;
    // a Dog always has 4 legs
    legs = 4;
    constructor(dogName, owner) {
        this.dogName = dogName;
        this.owner = owner;
    }
    // a dog walks differently to a person
    walk() {
        console.log(`walking with ${this.legs} legs: left-front, right-back, right-front, left-back...`)
    }
    name() {
        return `${this.dogName} belongs to ${this.owner.name()}`;
    }
}




// creating a new Person with a given name
let assim = new Person("Assim", "Hussain");

// creating a dog belonging to assim
let hugo = new Dog("Hugo", assim);

// demonstrating the dog name that also depends on the owner.
console.log(hugo.name());

// demonstrating walk function
function letsWalk(walker: canWalk) {
    walker.walk();
}
// The walk function can be called with an argument of anything that can walk!
letsWalk(assim);
letsWalk(hugo);


console.log(assim.whoAreYou());


// a Student is a Person but has additional attributes like which course is taken.
class Student extends Person {
    // the additional course attribute.
    course;

    constructor(firstName, lastName, course) {
        // calling super means passing the firstName and lastName along to the constructor of Person
        super(firstName, lastName);
        // setting the remaining course attribute.
        this.course = course;
    }

    // a more complex whoAreYou function is defined here that also contains the course.
    whoAreYou() {
        return `${super.whoAreYou()} and I'm studying ${this.course}`;
    }
}

// create a new Student named Lukas Huber taking the Angular 2 course.
let lukas = new Student("Lukas", "Huber", "Angular 2");
console.log(lukas.whoAreYou());


// this Dude takes the BootStrap course set by the decorator
@Course({course: "Bootstrap"})
class Dude {

    // the constructor has _firstName and _lastName as private attributes
    // which means they can't be accessed from outside the class
    constructor(private _firstName, private _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
    }

    // this is a getter for the lastName always will output it in lowercase despite it being stored in original
    get firstName() {
        return this._firstName.toLowerCase();
    }

    // this is a getter for the lastName always will output it in uppercase despite it being stored in original
    get lastName() {
        return this._lastName.toUpperCase();
    }

    // this is a getter for the full name displayed as it is
    get name() {
        return `${this._firstName} ${this._lastName}`;
    }



}

// create a new Dude
let max = new Dude("Max", "Mustermann");
// even when the Dude doesn't have a course initially it's still there because of the decorator
console.log(`${max.firstName} ${max.lastName} ${max.whichCourse()}`);
console.log(max.name);


// define a decorator that attaches the whichCourse() function to a class that always returns jQuery
function jquery(target) {
    Object.defineProperty(target.prototype, 'whichCourse', {value: () => 'jQuery'});
}

// define a decorator that attaches the whichCourse() function to a class that returns a given Course.
function Course(config) {
    return function (target) {
        Object.defineProperty(
            // the prototype property probably is something special here.
            target.prototype,
            'whichCourse', {value: () => config.course }
        );
    }
}

