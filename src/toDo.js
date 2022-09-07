import project, {projects} from './projects';

export default class toDo{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
    }

    displayToDo(projectName){
        let newToDo = document.createElement('div');
        newToDo.classList.add('toDoItem');

        const firstGroup = document.createElement('div');
        firstGroup.classList.add('toDoSection');

        let stereo = document.createElement('input');
        stereo.setAttribute('type', 'checkbox');
        
        let itemTitle = document.createElement('div');
        itemTitle.innerHTML = this.title;

        let itemDueDate = document.createElement('div');
        itemDueDate.innerHTML = this.dueDate;

        let expandButton = document.createElement('button');
        expandButton.innerHTML = `<img src='imgs/iconmonstr-arrow-down-thin.svg'>`

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<img src='imgs/trash-can-svgrepo-com.svg'>`

        firstGroup.appendChild(stereo);
        firstGroup.appendChild(itemTitle);
        firstGroup.appendChild(itemDueDate);
        firstGroup.appendChild(expandButton);
        firstGroup.appendChild(deleteButton);

        newToDo.appendChild(firstGroup);


        const secondGroup = document.createElement('div');
        secondGroup.classList.add('toDoSection');
        secondGroup.classList.add('hidden');
        secondGroup.setAttribute('id', 'toggleGroup');

        let itemDescription = document.createElement('div');
        itemDescription.innerHTML = 'Description: ' + this.description;

        const itemPriority = document.createElement('div');
        itemPriority.innerHTML = 'Importance: ' + this.priority;

        secondGroup.appendChild(itemDescription);
        secondGroup.appendChild(itemPriority);

        newToDo.appendChild(secondGroup);

        expandButton.addEventListener('click', () =>{
            this.expandToDo();
        });

        deleteButton.addEventListener('click', () =>{
            let index = 0;
            for(let i = 0; i < projects.length; i++){
                if(projects[i].title === projectName.title) index = i;
            }
            projects[index].deleteToDo(this.title);
        });

        return newToDo;
    }
    
    expandToDo(){
        let secondGroup = document.querySelector('#toggleGroup');
        secondGroup.classList.toggle('hidden');
    }


}


