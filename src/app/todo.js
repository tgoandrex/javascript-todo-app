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

    static changePriority = (todo) => {
        todo.priority === "low" ? todo.priority = "high" : todo.priority = "low";
    }

    static setComplete = (todo) => {
        todo.completed = true;
    }

    static deleteTodo = (todos, todo) => {
        for(let x = 0; x < todos.length; x++) {
            if(todos[x].title === todo.title) {
                todos.splice(todos.indexOf(todos[x]), 1);
            }
        }
    }
}