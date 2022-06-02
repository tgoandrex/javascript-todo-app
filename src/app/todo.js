export class Todo {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    sayHi = () => { // Temporary function to test if webpack/object works
        console.log(`Hi Todo: ${this.title}!`);
    }
}