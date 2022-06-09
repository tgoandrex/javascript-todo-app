import { pContent, tContent } from "./utils/domElements";
import { removeAllChildNodes } from "./utils/functions";

export class DOM {
    static buildProjectContent = (project) => {
        removeAllChildNodes(pContent);
        removeAllChildNodes(tContent);

        const listItem = document.createElement("li");
        listItem.textContent = project.title;
        pContent.appendChild(listItem);
        
        project.todos.forEach(function(todo) {
            const card = document.createElement("div");
            card.className = "card";
            tContent.appendChild(card);

            const div = document.createElement("div");
            div.textContent = todo.title;
            div.className = "todo-title";
            card.appendChild(div);
            
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