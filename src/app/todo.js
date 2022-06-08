export class Todo {
    constructor(title, description, dueDate, priority, completed, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed
        this.notes = notes;
    }

    static createNewTodo = (data) => {
        return new Todo(data.title, data.description, data.dueDate, data.priority, data.completed, data.notes);
    }
}