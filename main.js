(()=>{"use strict";class t{constructor(t,e,o,n){this.title=t,this.description=e,this.dueDate=o,this.priority=n,this.isDone=!1}displayToDo(t){let o=document.createElement("div");o.classList.add("toDoItem");const n=document.createElement("div");n.classList.add("toDoSection");let i=document.createElement("input");i.setAttribute("type","checkbox");let r=document.createElement("div");r.innerHTML=this.title;let c=document.createElement("div");c.innerHTML=this.dueDate;let d=document.createElement("div"),l=document.createElement("button");l.innerHTML="<img src='imgs/iconmonstr-arrow-down-thin.svg'>";let s=document.createElement("button");s.innerHTML="<img src='imgs/trash-can-svgrepo-com.svg'>",d.appendChild(l),d.appendChild(s),n.appendChild(i),n.appendChild(r),n.appendChild(c),n.appendChild(d),o.appendChild(n);const a=document.createElement("div");a.classList.add("toDoSection"),a.classList.add("hidden"),a.setAttribute("id","toggleGroup");let u=document.createElement("div");u.innerHTML="Description: "+this.description;const p=document.createElement("div");p.innerHTML="Importance: "+this.priority;const m=document.createElement("button");return m.innerHTML="<img src='imgs/edit-button-svgrepo-com.svg'>",a.appendChild(m),a.appendChild(u),a.appendChild(p),a.appendChild(m),o.appendChild(a),m.addEventListener("click",(()=>{const e=document.createElement("form");for(e.innerHTML=` \n                <input type = 'text' class='toDoTitle' placeholder='To Do Title' value = '${this.title}' >\n                <input type = 'text' class='toDoDescription' placeholder='To Do Description' value = '${this.description}'>\n                <input type = 'date' class='toDoDate' value = '${this.dueDate}'>\n                <select id = 'priority' name = 'priority' class='toDoPriority'>\n                    <option value='high'>High</option>\n                    <option value='medium'>Medium</option>\n                    <option value='low'>Low</option>\n                </select>\n                <input type= 'button' class='toDoSubmit' value='Submit'>`,e.classList.add("toDoForm");o.firstChild;)o.firstChild.remove();o.appendChild(e),document.querySelector(".toDoSubmit").addEventListener("click",(()=>{let e=document.querySelector(".toDoTitle"),o=document.querySelector(".toDoDescription"),n=document.querySelector(".toDoDate"),i=document.querySelector(".toDoPriority");this.title=e.value,this.description=o.value,this.date=n.value,this.priority=i.value;const r=document.querySelector(".body");for(;r.firstChild;)r.firstChild.remove();const c=document.createElement("h2");c.innerHTML=t.title,r.appendChild(c),t.loadToDos(),t.createButton()}))})),l.addEventListener("click",(()=>{a.classList.toggle("hidden")})),s.addEventListener("click",(()=>{let o=0;for(let n=0;n<e.length;n++)e[n].title===t.title&&(o=n);e[o].deleteToDo(this.title)})),o}}let e=[];class o{constructor(t){this.title=t,this.toDos=[]}createButton(){const t=document.querySelector(".body"),e=document.createElement("button");e.classList.add("newToDo"),e.innerHTML="+",t.appendChild(e),e.addEventListener("click",(()=>{this.toDoForm()}))}toDoForm(){const t=document.querySelector(".body");t.removeChild(t.lastChild);const e=document.createElement("form");e.innerHTML=" \n            <input type = 'text' class='toDoTitle' placeholder='To Do Title' required>\n            <input type = 'text' class='toDoDescription' placeholder='To Do Description' required>\n            <input type = 'date' class='toDoDate' required>\n            <select id = 'priority' name = 'priority' class='toDoPriority'>\n                <option value='high'>High</option>\n                <option value='medium'>Medium</option>\n                <option value='low'>Low</option>\n            </select>\n            <input type= 'button' class='toDoSubmit' value='Submit'>",e.classList.add("toDoForm"),t.appendChild(e),document.querySelector(".toDoSubmit").addEventListener("click",(()=>{this.createToDo()}))}createToDo(){let o=document.querySelector(".toDoTitle"),n=document.querySelector(".toDoDescription"),i=document.querySelector(".toDoDate"),r=document.querySelector(".toDoPriority");const c=new t(o.value,n.value,i.value,r.value);"Main"!==this.title&&this.toDos.push(c),e[0].toDos.push(c),document.querySelector(".toDoForm").remove(),document.querySelector(".body").appendChild(c.displayToDo(this)),this.createButton()}loadToDos(){let t=document.querySelector(".body");for(let e=0;e<this.toDos.length;e++)t.appendChild(this.toDos[e].displayToDo(this))}deleteToDo(t){for(let e=0;e<this.toDos.length;e++)this.toDos[e].title===t&&this.toDos.splice(e,1);const e=document.querySelector(".body");for(;e.firstChild;)e.firstChild.remove();const o=document.createElement("h2");o.innerHTML=this.title,e.appendChild(o),this.loadToDos(),this.createButton()}}function n(t,n){const i=document.querySelector(".nav");let r=new o(`${t}`);const c=document.createElement("button");return c.classList.add("sidebarButton"),c.setAttribute("data-v",e.length),c.innerHTML=`<img src='imgs/${n}'>${r.title}`,i.appendChild(c),e.push(r),r}function i(){!function(){const t=document.querySelectorAll(".sidebarButton");let o=document.querySelector(".body");t.forEach((t=>{t.onclick=function(){for(;o.firstChild;)o.firstChild.remove();const n=document.createElement("h2");n.innerHTML=e[parseInt(t.getAttribute("data-v"))].title,o.appendChild(n),e[parseInt(t.getAttribute("data-v"))].loadToDos(),e[parseInt(t.getAttribute("data-v"))].createButton()}}))}();const t=document.querySelector(".nav"),n=document.createElement("button");n.classList.add("newProject"),n.innerHTML="+",t.appendChild(n),n.addEventListener("click",(()=>{!function(){const t=document.querySelector(".nav");t.removeChild(t.lastChild);let n=document.createElement("form");n.innerHTML=" \n        <input type = 'text' class='projectInput' placeholder='Project Name'>\n        <input type= 'button' class='projectSubmit' value='Submit'>",n.classList.add("projectForm"),t.appendChild(n);let r="";const c=document.querySelector(".projectSubmit"),d=document.querySelector(".projectInput");c.addEventListener("click",(()=>{r=d.value;let n=function(t){for(let o=0;o<e.length;o++)if(e[o].title===t)return!0;return!1}(r);if(n)return alert("Please input a new project name"),t.removeChild(t.lastChild),void i();t.removeChild(t.lastChild);const c=document.createElement("button");c.classList.add("sidebarButton"),c.innerHTML=`<img src='imgs/project-icon.svg'><div>${r}</div>`,c.setAttribute("data-v",e.length);const l=document.createElement("button");l.classList.add("removeProjectButton"),l.setAttribute("data-v",e.length-3),l.innerText="X",c.appendChild(l),t.appendChild(c);let s=new o(`${r}`);e.push(s),l.addEventListener("click",(()=>{const t=document.querySelectorAll(".sidebarButton");e.splice(parseInt(l.getAttribute("data-v"))+3,1),t[parseInt(l.getAttribute("data-v"))+3].remove(),function(){const t=document.querySelectorAll(".sidebarButton");for(let e=0;e<t.length;e++)t[e].setAttribute("data-v",e);const e=document.querySelectorAll(".removeProjectButton");for(let t=0;t<e.length;t++)e[t].setAttribute("data-v",t)}()})),i()}))}()}))}!function(){let t=document.querySelector(".container");t.appendChild(function(){let t=document.createElement("div");return t.classList.add("header"),t.innerHTML="<img src='imgs/check.svg' alt='checkmark logo'> <div>To-Do-List</div>",t}()),t.appendChild(function(){let t=document.createElement("div");return t.classList.add("nav"),t}()),t.appendChild(function(){let t=document.createElement("div");return t.classList.add("body"),t}()),t.appendChild(function(){let t=document.createElement("div");return t.classList.add("footer"),t.innerHTML="<div>Copyright &copy 2022 Gabriel Pleimann</div><a href='https://github.com/gdp7zt/ToDoList' target='_blank'><img src='imgs/GitHub-Mark-32px.png'></a>",t}())}(),function(){n("Main","inbox-icon.svg"),n("Today","calendar-daily-page-on-day-31-svgrepo-com.svg"),n("This Week","week-calendar-svgrepo-com.svg");const t=document.createElement("div");t.classList.add("navHeader"),t.textContent="Projects",document.querySelector(".nav").appendChild(t),i()}()})();