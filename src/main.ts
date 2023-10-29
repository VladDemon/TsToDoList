import './css/style.css'

const addBtn = document.querySelector('.newTask__btn') as HTMLButtonElement
const InputTask = document.querySelector('.input__task') as HTMLInputElement
const ToDoForm = document.querySelector('.newTask__form') as HTMLFormElement
const listItems = document.querySelector('#listItems') as HTMLElement
const ClearList = document.querySelector('.clearBtn') as HTMLButtonElement


interface TODO{
    id: number,
    item: string,
    checked: boolean,
}

const tasks:TODO[] = JSON.parse(localStorage.getItem('tasks') || '[]')
const save = ():void =>{localStorage.setItem('tasks', JSON.stringify(tasks))}
const addTask = (Task:TODO) =>{
    const checkedB = document.createElement('input')
    const Li = document.createElement('li');
    const Label = document.createElement('label')
    const Btn = document.createElement('button')
    checkedB.type = 'checkbox'
    checkedB.checked = Task.checked
    Li.classList.add('item')
    Li.className = "item"
    Btn.classList.add('item__btn')
    Li.classList.add('item1')
    const ID:string = JSON.stringify(Task.id)
    Btn.setAttribute('id', ID)
    Label.setAttribute('for', Task.id.toString())
    checkedB.setAttribute('id', Task.id.toString())
    Btn.style.order = '10'
    Label.style.order = '10'
    checkedB.style.order = "-1"
    checkedB.classList.add('checkBox')
    checkedB.onchange = ()=>{
        Task.checked = checkedB.checked
        save()
    }
    Li.append(checkedB, Label, Btn)
    Label.innerHTML = ''
    Btn.innerHTML = 'X'
    Li.append(Task.item, checkedB);
    listItems.prepend(Li)
    
}
const clear = ():void =>{
    tasks.length = 0
    save();
    listItems.innerHTML = ''
}
ToDoForm.addEventListener('submit', e => Listener(e))
addBtn.addEventListener('click', e => Listener(e))


const Listener = (e: Event):void=>{
    e.preventDefault();
    const Task:TODO = {
        id: Date.now(),
        item: InputTask.value,
        checked: false,
    }

    tasks.push(Task)
    save()
    addTask(Task)
    InputTask.value = ''
}
window.addEventListener('DOMContentLoaded', () => {
    tasks.forEach(todo => addTask(todo));
});
ClearList.onclick = () =>{
    clear();
}
listItems.addEventListener('click', (e: MouseEvent) => {
    const Tr: HTMLElement = e.target as HTMLElement;
    if (Tr.tagName === "BUTTON") {
        Tr.parentElement?.remove();
        tasks.splice(tasks.findIndex(task => task.id === Number(Tr.id)), 1);
        save();
    }
});




