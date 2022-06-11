import { Todo } from "./src/app/todo";
import { DOM } from "./src/app/dom";
import { Project } from "./src/app/project";
import { checkTitleIsUnique } from "./src/app/utils/functions";

document.getElementById("todo-form").addEventListener("submit", function(e) {
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
        localStorage.setItem(project.title, JSON.stringify(project));
        localStorage.setItem("selected-project", JSON.stringify(project));
        DOM.buildProjectContent(Project.getAllProjects());
        DOM.buildTodoContent(project);
    } else {
        alert("Todo title already exists in this project. Title must be unique");
    }
});

document.getElementById("project-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("project-title").value;

    if(checkTitleIsUnique(title, Project.getAllProjects())) {
        const project = Project.createNewProject(title);
        localStorage.setItem(project.title, JSON.stringify(project));
        localStorage.setItem("selected-project", JSON.stringify(project));
        DOM.buildProjectContent(Project.getAllProjects());
        DOM.buildTodoContent(project);
    } else {
        alert("Project title already exists in this project. Title must be unique");
    }
});

export const run = () => {
    let project;
    if(!localStorage.getItem("selected-project")) {
        project = new Project("Default");
        localStorage.setItem(project.title, JSON.stringify(project));
        localStorage.setItem("selected-project", JSON.stringify(project));
    } else {
        project = JSON.parse(localStorage.getItem("selected-project"));
    }
    DOM.buildProjectContent(Project.getAllProjects());
    DOM.buildTodoContent(project);
}