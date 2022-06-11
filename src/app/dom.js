import { Todo } from "./todo";
import { pContent, tContent } from "./utils/domElements";
import { removeAllChildNodes } from "./utils/functions";

export class DOM {
    static buildProjectContent = (projects) => {
        removeAllChildNodes(pContent);

        projects.forEach(function(project) {
            if(project.title !== "selected-project") {
                const listItem = document.createElement("li");
                listItem.id = project.title;
                listItem.textContent = project.title;
                listItem.addEventListener("click", function() {
                    localStorage.setItem(project.title, JSON.stringify(project));
                    localStorage.setItem("selected-project", JSON.stringify(project));
                    DOM.buildProjectContent(projects);
                    DOM.buildTodoContent(project);
                });
                pContent.appendChild(listItem);
            }
        });
    }

    static buildTodoContent = (project) => {
        removeAllChildNodes(tContent);
        
        project.todos.forEach(function(todo) {
            const card = document.createElement("div");
            todo.completed === true ? card.className = "card green" : card.className = "card";
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
                Todo.deleteTodo(project.todos, todo);
                localStorage.setItem(project.title, JSON.stringify(project));
                localStorage.setItem("selected-project", JSON.stringify(project));
                DOM.buildTodoContent(project); 
            });
            div.appendChild(deleteButton);    
            
            const values = {
                "Description": todo.description,
                "Due Date": todo.dueDate,
                "Priority": todo.priority,
                "Completed?": todo.completed,
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