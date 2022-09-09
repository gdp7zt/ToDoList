import load from './pageload';
import toDo from './toDo.js';
import project, {createSidebarItem, projectButton, projects, loadProjectsStorage} from './projects.js';

load();
function sidebarLogic(){
    createSidebarItem('Main', 'inbox-icon.svg');
    createSidebarItem('Today', 'calendar-daily-page-on-day-31-svgrepo-com.svg');
    createSidebarItem('This Week', 'week-calendar-svgrepo-com.svg');

    const navHeader = document.createElement('div');
    navHeader.classList.add('navHeader');
    navHeader.textContent = 'Projects';
    const nav = document.querySelector('.nav');
    nav.appendChild(navHeader);

    let projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
    //Still need to cast these values to classes so they get their modules
    //Both of them.

    if(projectsFromStorage == null){
        localStorage.setItem('projects', JSON.stringify(projects));
        projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
    }

    for(let i = 0; i < projectsFromStorage.length; i++){
        let title = projectsFromStorage[i].title;
        let toDos = [];
        for(let j = 0; j<projectsFromStorage[i].toDos.length; j++){
            let title2 = projectsFromStorage[i].toDos[j].title;
            let description = projectsFromStorage[i].toDos[j].description;
            let dueDate = projectsFromStorage[i].toDos[j].dueDate;
            let priority = projectsFromStorage[i].toDos[j].priority;
            toDos[j] = new toDo(title2, description, dueDate, priority);
        }
        projectsFromStorage[i] = new project(title);
        projectsFromStorage[i].toDos = toDos;
    }

    
    if(projectsFromStorage){
        for(let i = 0; i < 3; i++){
            projects[i].toDos = projectsFromStorage[i].toDos;
        }
        for(let i = 3; i < projectsFromStorage.length; i++){
            loadProjectsStorage(projectsFromStorage[i], i);
        }
    }

    projectButton();
}

sidebarLogic();
