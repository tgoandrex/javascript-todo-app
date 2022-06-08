const tContent = document.getElementById("todos-content");
const pContent = document.getElementById("projects-content");
const title = document.getElementById("title");
const description = document.getElementById("description");
const dueDate = document.getElementById("due-date");
const priorityLevel = document.querySelector("input[name='priority-level']:checked");
const notes = document.getElementById("notes");

export { tContent, pContent, title, description, dueDate, priorityLevel, notes };