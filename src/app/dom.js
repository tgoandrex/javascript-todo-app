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

            const h3 = document.createElement("h3");
            h3.textContent = todo.title;
            card.appendChild(h3);
            
            const values = ["description", "dueDate", "priority", "completed", "notes"];
            values.forEach(function(value) {
                const div = document.createElement("div");
                div.textContent = todo[value];
                card.appendChild(div);
            });
        });
    }
}