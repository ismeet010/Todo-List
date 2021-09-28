//Selectors
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption= document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();

    //Todo div
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo= document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    //add todos to localStorage
    saveLocalTodos(todoInput.value);

    //Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check delete button
    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fas fa-trash"></i>';
    delButton.classList.add("del-btn");
    todoDiv.appendChild(delButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value="";


}

function deleteCheck(event){
    const item= event.target;
    //Delete todo
    if(item.classList[0] === 'del-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos= todoList.childNodes;
    todos.forEach(function(todo){
        todo.style.display= 'none';
        console.log(e.target.value);
        console.log(todo.style);
        switch(e.target.value){
            
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display ='flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display ='flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //checking if something is already in the list
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    //checking if something is already in the list
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
         //Todo div
        const todoDiv= document.createElement("div");
        todoDiv.classList.add("todo");
        //create li
        const newTodo= document.createElement('li');
        newTodo.innerText= todo;
        newTodo.classList.add('todo-item');

        todoDiv.appendChild(newTodo);

        //Check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check delete button
        const delButton = document.createElement('button');
        delButton.innerHTML = '<i class="fas fa-trash"></i>';
        delButton.classList.add("del-btn");
        todoDiv.appendChild(delButton);

        //Append to list
        todoList.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo){
    let todos=[];
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
   const todoIndex= todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex),1);
   localStorage.setItem("todos", JSON.stringify(todos));
}
