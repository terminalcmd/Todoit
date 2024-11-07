export const projectsMethod = (() => {
    let projects = []
    let todos = []
    const createTodo = (title,description,dueDate,priority,checkList) => {
        return{title,description,dueDate,priority,checkList}
    }
    const addTodo = (title,description,dueDate,priority,checkList) => {
        todos.push(createTodo(title,description,dueDate,priority,checkList))
    }
    const allTodos = () => todos

    const createProjects = (title,...todoList) => {
        return {title,todoList}
    }
    const addProjects = (title,...todoList) => {
        projects.push(createProjects(title,...todoList))
    }
    const addTodoProject = (index,todo) => {
        projects[index].todoList.push(todo)
    }
    const delProject = (delIndex) => {
        projects.splice(delIndex,1)
    }
    const allProjects = () => projects

    const delTodo = (todoInd) => {
        projects.map(x => x.todoList.splice(todoInd,1))
    }
    const checkTodos = (projectInd,checkIndex) => {
        projects[projectInd].todoList[checkIndex].checkList = true
        projects[projectInd].todoList.splice(checkIndex,1)
    }
    const priority = (projectInd) => {
        projects[projectInd].todoList.sort((firstTodo,secondTodo) => firstTodo.priority - secondTodo.priority)
    }
    const saveLocally = () => {
        localStorage.setItem('proj',JSON.stringify(projects))
    }
    const fetchLocally = () => {
       if(localStorage.getItem('proj')){
        return projects =  JSON.parse(localStorage.getItem('proj'))
       }else{
        return JSON.parse(localStorage.getItem('proj'))
       }
    }
    
    return {
        addTodo,allTodos,addProjects,
        addTodoProject,allProjects,delProject,
        delTodo,checkTodos,priority,saveLocally,fetchLocally
        }
})()