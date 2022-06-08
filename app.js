import { title, description, dueDate, priorityLevel, notes } from "./src/app/utils/domElements";
import { Todo } from "./src/app/todo";
import { DOM } from "./src/app/dom";
import { Project } from "./src/app/project";

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    let data = new FormData();

    data.title = title.value;
    data.description = description.value;
    data.dueDate = dueDate.value;
    data.priorityLevel = priorityLevel.value; // This is not getting the value right now
    data.completed = false;
    data.notes = notes.value;

    const project = JSON.parse(localStorage.getItem("selected-project"));
    project.todos.push(Todo.createNewTodo(data));
    
    localStorage.setItem("selected-project", JSON.stringify(project));
    DOM.buildProjectContent(project);
});

export const run = () => {
    if(!localStorage.getItem("selected-project")) {
        const project = new Project("Default");
        localStorage.setItem("selected-project", JSON.stringify(project));
        DOM.buildProjectContent(project);
    } else {
        const project = JSON.parse(localStorage.getItem("selected-project"));
        DOM.buildProjectContent(project);
    }
}