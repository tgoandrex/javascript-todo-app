export class Project {
    constructor(title, todos) {
        this.title = title;
        this.todos = todos;
    }

    sayHi = () => { // Temporary function to test if webpack/object works
        console.log(`Hi Project: ${this.title}! Todos in this project: ${JSON.stringify(this.todos)}`);
    }
}