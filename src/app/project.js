export class Project {
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    addTodoToProject = (todo) => this.todos.push(todo);
}