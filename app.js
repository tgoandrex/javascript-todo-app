import { Todo } from "./src/app/todo";
import { Project } from "./src/app/project";

export const run = () => {
    // Temporary to test out if todo is being created and displayed correctly
    let todo = new Todo("A great todo title", "A neat description", "06/02/2022", "High", "Some interesting notes...");
    todo.sayHi();

    let project = new Project("Default", [todo]);
    project.sayHi();
}