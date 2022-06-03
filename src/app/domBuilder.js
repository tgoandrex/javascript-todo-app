import { tContent, pContent } from "./utils/domElements";
import { Project } from "./project";
import { Todo } from "./todo";

export const domBuilder = (() => {
  const buildTodoContent = (project) => {
    // Temporary to test out if todo is being created and displayed correctly. Todos will be extracted from project.todos later
    let exampleTodo = new Todo("A good todo title", "A neat description", "06/02/2022", "High", false, "Some interesting notes");
    project.addTodoToProject(exampleTodo);

    project.todos.forEach(function(todo) {
      const paragraph = document.createElement("p");
      paragraph.textContent = JSON.stringify(todo);
      tContent.appendChild(paragraph);
    });
  }

  const buildContent = () => {
    // Default project for creating todos. Temporarily created here. Will be created from localHost later
    let defaultProject = new Project("Default");

    const listItem = document.createElement("li");
    listItem.textContent = defaultProject.title;
    pContent.appendChild(listItem);

    buildTodoContent(defaultProject);
  }

  return { buildContent };
})();