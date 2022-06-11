const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const checkTitleIsUnique = (title, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if(title === arr[i].title) {
            return false;
        }
    }
    return true;
}

export { removeAllChildNodes, checkTitleIsUnique };