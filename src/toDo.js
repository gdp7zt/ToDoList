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


        let buttonContainer = document.createElement('div');
        let expandButton = document.createElement('button');
        expandButton.innerHTML = `<img src='imgs/iconmonstr-arrow-down-thin.svg'>`

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<img src='imgs/trash-can-svgrepo-com.svg'>`;

        buttonContainer.appendChild(expandButton);
        buttonContainer.appendChild(deleteButton);
        firstGroup.appendChild(stereo);
        firstGroup.appendChild(itemTitle);
        firstGroup.appendChild(itemDueDate);
        firstGroup.appendChild(buttonContainer);

        newToDo.appendChild(firstGroup);


        const secondGroup = document.createElement('div');
        secondGroup.classList.add('toDoSection');
        secondGroup.classList.add('hidden');
        secondGroup.setAttribute('id', 'toggleGroup');

        let itemDescription = document.createElement('div');
        itemDescription.innerHTML = 'Description: ' + this.description;

        const itemPriority = document.createElement('div');
        itemPriority.innerHTML = 'Importance: ' + this.priority;

        const editButton = document.createElement('button');
        editButton.innerHTML = `<img src='imgs/edit-button-svgrepo-com.svg'>`;

        secondGroup.appendChild(editButton);
        secondGroup.appendChild(itemDescription);
        secondGroup.appendChild(itemPriority);
        secondGroup.appendChild(editButton);

        newToDo.appendChild(secondGroup);

        editButton.addEventListener('click', () =>{
            const form = document.createElement('form');
            form.innerHTML = ` 
                <input type = 'text' class='toDoTitle' placeholder='To Do Title' value = '${this.title}' >
                <input type = 'text' class='toDoDescription' placeholder='To Do Description' value = '${this.description}'>
                <input type = 'date' class='toDoDate' value = '${this.dueDate}'>
                <select id = 'priority' name = 'priority' class='toDoPriority'>
                    <option value='high'>High</option>
                    <option value='medium'>Medium</option>
                    <option value='low'>Low</option>
                </select>
                <input type= 'button' class='toDoSubmit' value='Submit'>`;
            form.classList.add('toDoForm');

            while(newToDo.firstChild){
                newToDo.firstChild.remove();
            }

            newToDo.appendChild(form);

            const submitButton = document.querySelector('.toDoSubmit');

            submitButton.addEventListener('click', () => {
                let title = document.querySelector('.toDoTitle');
                let description = document.querySelector('.toDoDescription');
                let date = document.querySelector('.toDoDate');
                let priority = document.querySelector('.toDoPriority');

                this.title = title.value;
                this.description = description.value;
                this.date = date.value;
                this.priority = priority.value;
                
                const body = document.querySelector('.body');
                while(body.firstChild){
                    body.firstChild.remove();
                }
                const header = document.createElement('h2');
                header.innerHTML = projectName.title;
                body.appendChild(header);

                projectName.loadToDos();

                projectName.createButton();
            });
        });

        expandButton.addEventListener('click', () =>{
            secondGroup.classList.toggle('hidden');
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
}


