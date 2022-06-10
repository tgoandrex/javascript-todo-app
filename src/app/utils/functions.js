const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const checkTitleIsUnique = (title, todos) => {
    for (let i = 0; i < todos.length; i++) {
        if(title === todos[i].title) {
            return false;
        }
    }
    return true;
}

export { removeAllChildNodes, checkTitleIsUnique };