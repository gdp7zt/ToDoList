import load from './pageload';
import toDo from './toDo.js';
import project, {createSidebarItem, projectButton} from './projects.js';

load();
function sidebarLogic(){
    const mainProject = createSidebarItem('Main', 'inbox-icon.svg');
    const todayProject = createSidebarItem('Today', 'calendar-daily-page-on-day-31-svgrepo-com.svg');
    const weekProject = createSidebarItem('This Week', 'week-calendar-svgrepo-com.svg');

    const navHeader = document.createElement('div');
    navHeader.classList.add('navHeader');
    navHeader.textContent = 'Projects';
    const nav = document.querySelector('.nav');
    nav.appendChild(navHeader);

    projectButton();
}

sidebarLogic();
