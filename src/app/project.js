export class Project {
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    static getAllProjects = () => {
        let projects = [];
        let keys = Object.keys(localStorage);
        let i = keys.length;
    
        while (i--) {
            if(keys[i] !== "selected-project") {
                projects.push(JSON.parse(localStorage.getItem(keys[i])));
            }
        }
        return projects;
    }

    static createNewProject = (title) => {
        return new Project(title);
    }

    static deleteProject = (projects, project) => {
        for(let x = 0; x < projects.length; x++) {
            if(projects[x].title === project.title) {
                projects.splice(projects.indexOf(projects[x]), 1);
            }
        }
    }
}