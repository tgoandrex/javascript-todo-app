import { Todo } from "./src/app/todo";
import { DOM } from "./src/app/dom";
import { Project } from "./src/app/project";
import { checkTitleIsUnique } from "./src/app/utils/functions";

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    let data = new FormData();
    data.title = document.getElementById("title").value;
    data.description = document.getElementById("description").value;
    data.dueDate = document.getElementById("due-date").value;
    data.completed = false;
    data.notes = document.getElementById("notes").value;

    const radioButtons = document.getElementsByName('priority-level');
    for(let i = 0; i < radioButtons.length; i++) {
        if(radioButtons[i].checked)
            data.priority = radioButtons[i].value;
    }

    const project = JSON.parse(localStorage.getItem("selected-project"));

    if(checkTitleIsUnique(data.title, project.todos)) {
        project.todos.push(Todo.createNewTodo(data));
        localStorage.setItem("selected-project", JSON.stringify(project));
        DOM.buildProjectContent(project);
    } else {
        alert("Todo title already exists in this project. Title must be unique");
    }
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