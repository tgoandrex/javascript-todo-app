import { Project } from "./project";
import { Todo } from "./todo";
import { pContent, tContent } from "./utils/domElements";
import { removeAllChildNodes } from "./utils/functions";

export class DOM {
    static buildProjectContent = (projects) => {
        removeAllChildNodes(pContent);

        projects.forEach(function(project) {
            const listItem = document.createElement("li");
            listItem.id = project.title;
            listItem.textContent = 
                JSON.parse(localStorage.getItem("selected-project")).title === project.title ? 
                `${project.title} (Selected)`: project.title;
            
            listItem.addEventListener("click", function() {
                localStorage.setItem(project.title, JSON.stringify(project));
                localStorage.setItem("selected-project", JSON.stringify(project));
                DOM.buildProjectContent(projects);
                DOM.buildTodoContent(project);
            });

            pContent.appendChild(listItem);

            if(project.title !== "Default") {
                const deleteButton = document.createElement("button");
                deleteButton.id = "project-delete-button";
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function() {
                    const response = prompt(`Deleting project: ${project.title}! Are you sure? Type 'Yes' if so.`);

                    if(response === "Yes") {
                        Project.deleteProject(projects, project);
                        localStorage.removeItem(project.title);
                        project = JSON.parse(localStorage.getItem("Default"));
                        localStorage.setItem("selected-project", project);
                        DOM.buildProjectContent(projects);
                        DOM.buildTodoContent(project);
                    }
                });
                listItem.appendChild(deleteButton);
            }
        });
    }

    static buildTodoContent = (project) => {
        removeAllChildNodes(tContent);
        
        project.todos.forEach(function(todo) {
            const card = document.createElement("div");
            if(todo.completed === true) {
                card.className = "card green";
            } else if(new Date(todo.dueDate).getTime() < Date.now()) {
                card.className = "card red";
            } else {
                card.className = "card";
            }
            tContent.appendChild(card);

            const div = document.createElement("div");
            div.textContent = todo.title;
            div.className = "todo-title";
            card.appendChild(div);

            const lineBreak = document.createElement("br");
            div.appendChild(lineBreak);

            if(todo.completed === false) {
                const priorityButton = document.createElement("button");
                priorityButton.textContent = "Change priority";
                priorityButton.addEventListener("click", function() {
                    Todo.changePriority(todo);
                    localStorage.setItem(project.title, JSON.stringify(project));
                    localStorage.setItem("selected-project", JSON.stringify(project));
                    DOM.buildTodoContent(project);
                });
                div.appendChild(priorityButton);

                const completedButton = document.createElement("button");
                completedButton.textContent = "Mark complete";
                completedButton.addEventListener("click", function() {
                    Todo.setComplete(todo);
                    localStorage.setItem(project.title, JSON.stringify(project));
                    localStorage.setItem("selected-project", JSON.stringify(project));
                    DOM.buildTodoContent(project); 
                });
                div.appendChild(completedButton);    
            }

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function() {
                const response = prompt(`Deleting todo: ${todo.title}! Are you sure? Type 'Yes' if so.`);

                if(response === "Yes") {
                    Todo.deleteTodo(project.todos, todo);
                    localStorage.setItem(project.title, JSON.stringify(project));
                    localStorage.setItem("selected-project", JSON.stringify(project));
                    DOM.buildTodoContent(project);
                }
            });
            div.appendChild(deleteButton);
            
            const values = {
                "Description": todo.description,
                "Due Date": String(new Date(todo.dueDate)).substring(0, 15),
                "Priority": todo.priority,
                "Completed?": todo.completed === true ? "Yes": "No",
                "Notes": todo.notes
            }
            for(let key in values) {
                const div = document.createElement("div");
                div.textContent = `${key}: ${values[key]}`;
                card.appendChild(div);
            }
        });
    }
}