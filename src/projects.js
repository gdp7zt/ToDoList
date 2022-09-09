import toDo from './toDo';

let projects = [];

export default class project{
    constructor(title){
        this.title = title;
        this.toDos = [];
    }

    createButton(){
        const body = document.querySelector('.body');
        const newToDo = document.createElement('button');
        newToDo.classList.add('newToDo');
        newToDo.innerHTML = '+';
        body.appendChild(newToDo);

        newToDo.addEventListener('click', () =>{
            this.toDoForm();
        });
    }

    toDoForm(){
        const body = document.querySelector('.body');
        body.removeChild(body.lastChild);

        const form = document.createElement('form');
        form.innerHTML = ` 
            <input type = 'text' class='toDoTitle' placeholder='To Do Title' required>
            <input type = 'text' class='toDoDescription' placeholder='To Do Description' required>
            <input type = 'date' class='toDoDate' required>
            <select id = 'priority' name = 'priority' class='toDoPriority'>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
            </select>
            <input type= 'button' class='toDoSubmit' value='Submit'>`;
        form.classList.add('toDoForm');
        body.appendChild(form);

        const submitButton = document.querySelector('.toDoSubmit');

        submitButton.addEventListener('click', () => {
            this.createToDo();
        });
    }

    createToDo(){
        let title = document.querySelector('.toDoTitle');
        let description = document.querySelector('.toDoDescription');
        let date = document.querySelector('.toDoDate');
        let priority = document.querySelector('.toDoPriority');

        const item = new toDo(title.value, description.value, date.value, priority.value);
        if(this.title !== 'Main') this.toDos.push(item);
        projects[0].toDos.push(item);
        localStorage.setItem('projects', JSON.stringify(projects));

        let form = document.querySelector('.toDoForm');
        form.remove();
        let body = document.querySelector('.body');
    
        body.appendChild(item.displayToDo(this));
        this.createButton();
    }

    loadToDos(){
        let body = document.querySelector('.body');
        for(let i = 0; i < this.toDos.length; i++){
            body.appendChild(this.toDos[i].displayToDo(this));
        }
    }

    deleteToDo(name){
        for(let i = 0; i< this.toDos.length; i++){
            if(this.toDos[i].title === name){
                this.toDos.splice(i, 1);
                localStorage.setItem('projects', JSON.stringify(projects));
            }
        }

        const body = document.querySelector('.body');
        while(body.firstChild){
            body.firstChild.remove();
        }
        const header = document.createElement('h2');
        header.innerHTML = this.title;
        body.appendChild(header);

        this.loadToDos();

        this.createButton();
    }
}


export function createSidebarItem(title, imgName){
    const nav = document.querySelector('.nav');
    let mainProject = new project(`${title}`);
    const mainTitle = document.createElement('button');
    mainTitle.classList.add('sidebarButton');
    mainTitle.setAttribute('data-v', projects.length);
    mainTitle.innerHTML = `<img src=\'imgs/${imgName}\'>${mainProject.title}`;
    nav.appendChild(mainTitle);
    projects.push(mainProject);
}

function createNewProject(){
    const nav = document.querySelector('.nav');
    nav.removeChild(nav.lastChild);

    let form = document.createElement('form');
    form.innerHTML = ` 
        <input type = 'text' class='projectInput' placeholder='Project Name'>
        <input type= 'button' class='projectSubmit' value='Submit'>`;
    form.classList.add('projectForm');
    nav.appendChild(form);

    let title = '';
    const submitButton = document.querySelector('.projectSubmit');
    const projectInput = document.querySelector('.projectInput');
    submitButton.addEventListener('click', () => {
        title = projectInput.value;
        let isDuplicate = checkDuplicate(title);
        if (isDuplicate){
            alert('Please input a new project name');
            nav.removeChild(nav.lastChild);
            projectButton();
            return;
        }

        nav.removeChild(nav.lastChild);
        const newProjectButton = document.createElement('button');
        
        newProjectButton.classList.add('sidebarButton');
        newProjectButton.innerHTML = `<img src=\'imgs/project-icon.svg\'><div>${title}</div>`;
        newProjectButton.setAttribute('data-v', projects.length);

        const removeProjectButton = document.createElement('button');
        removeProjectButton.classList.add('removeProjectButton');
        removeProjectButton.setAttribute('data-v', projects.length-3);
        removeProjectButton.innerText = 'X';

        newProjectButton.appendChild(removeProjectButton);
        nav.appendChild(newProjectButton);
        let newProject = new project(`${title}`);
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));

        removeProjectButton.addEventListener('click', () => {
            const removeWholeProject = document.querySelectorAll('.sidebarButton');
            projects.splice(parseInt(removeProjectButton.getAttribute('data-v'))+3, 1);
            removeWholeProject[parseInt(removeProjectButton.getAttribute('data-v'))+3].remove();
            localStorage.setItem('projects', JSON.stringify(projects));

            setData();
        });
        
        projectButton();
    });
}

function checkDuplicate(title){
    for(let i = 0; i < projects.length; i++){
        if(projects[i].title === title) return true;
    }
    return false;
}

export function projectButton(){
    loadProject();
    const nav = document.querySelector('.nav');
    const newProject = document.createElement('button');
    newProject.classList.add('newProject');
    newProject.innerHTML = '+';
    nav.appendChild(newProject);

    newProject.addEventListener('click', () =>{
        createNewProject();
    });

}

function loadProject(){
    const buttons = document.querySelectorAll('.sidebarButton');
    let body = document.querySelector('.body');

    buttons.forEach(element =>{
        element.onclick = function(){
            while(body.firstChild){
                body.firstChild.remove();
            }
            const header = document.createElement('h2');
            header.innerHTML = projects[parseInt(element.getAttribute('data-v'))].title;
            body.appendChild(header);
            
            projects[parseInt(element.getAttribute('data-v'))].loadToDos();

            projects[parseInt(element.getAttribute('data-v'))].createButton();
        }
    });
}

function setData(){
    const items = document.querySelectorAll('.sidebarButton');
    for(let i = 0; i < items.length; i++){
        items[i].setAttribute('data-v', i);
    }

    const secondItems = document.querySelectorAll('.removeProjectButton');
    for(let i = 0; i < secondItems.length; i++){
        secondItems[i].setAttribute('data-v', i);
    }
}

export function loadProjectsStorage(importedProject, i){
        let title = importedProject.title;
        const nav = document.querySelector('.nav');

        const newProjectButton = document.createElement('button');
        
        newProjectButton.classList.add('sidebarButton');
        newProjectButton.innerHTML = `<img src=\'imgs/project-icon.svg\'><div>${title}</div>`;
        newProjectButton.setAttribute('data-v', i);

        const removeProjectButton = document.createElement('button');
        removeProjectButton.classList.add('removeProjectButton');
        removeProjectButton.setAttribute('data-v', i-3);
        removeProjectButton.innerText = 'X';

        newProjectButton.appendChild(removeProjectButton);
        nav.appendChild(newProjectButton);

        let newProject = new project(`${title}`);
        newProject.toDos = importedProject.toDos;

        projects[i] = newProject;

        removeProjectButton.addEventListener('click', () => {
            const removeWholeProject = document.querySelectorAll('.sidebarButton');
            projects.splice(parseInt(removeProjectButton.getAttribute('data-v'))+3, 1);
            removeWholeProject[parseInt(removeProjectButton.getAttribute('data-v'))+3].remove();

            setData();
        });
}
export{projects};