export const taskMethods = (() => {
    let tasks = []
    const createTask = (title,description,dueDate,priority,checkList) => {
        return {title,description,dueDate,priority,checkList}
    }
    const addTask = (title,description,dueDate,priority,checkList) => {
        tasks.push(createTask(title,description,dueDate,priority,checkList))
    }
    const delTask = (taskIndex) => {
        tasks.splice(taskIndex,1)
    }
    const priority = () => {
        tasks.sort((firstTask,secondTask) => firstTask.priority - secondTask.priority)
    }  
    const checkTodos = (taskIndex) => {
        tasks[taskIndex].checkList = true
        tasks.splice(taskIndex,1)
    }
    const allTask = () => tasks
    const saveTask = () => {
        localStorage.setItem('task',JSON.stringify(tasks))
    }
    const fetchTask = () => {
        if(localStorage.getItem('task')){
            return tasks =  JSON.parse(localStorage.getItem('task'))
        }else{
            return JSON.parse(localStorage.getItem('task'))
        }
    }
    return {
        allTask,addTask,delTask,priority,checkTodos,saveTask,fetchTask
    }
})()