export default function onLoad(){
    let container = document.querySelector('.container');
    container.appendChild(header());
    container.appendChild(nav());
    container.appendChild(body());
    container.appendChild(footer());
}

function header() {
    let header = document.createElement('div');
    header.classList.add('header');

    header.innerHTML = '<img src=\'imgs/check.svg\' alt=\'checkmark logo\'> <div>To-Do-List</div>';

    return header;
}

function nav(){
    let nav = document.createElement('div');
    nav.classList.add('nav');

    return nav;
}

function body(){
    let body = document.createElement('div');
    body.classList.add('body');

    return body;
}

function footer(){
    let footer = document.createElement('div');
    footer.classList.add('footer');

    footer.innerHTML = '<div>Copyright &copy 2022 Gabriel Pleimann</div><a href=\'https://github.com/gdp7zt/ToDoList\' target=\'_blank\'><img src=\'imgs/GitHub-Mark-32px.png\'></a>'
    return footer;
}