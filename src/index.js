import "./style.css";
import { projectsMethod } from "./project";

const projectDom = (() => {
    const mainDiv = document.querySelector('main')
    const navBar = document.querySelector('nav')
    const todoDiv = document.querySelector('.todo')
	const firstMainDiv = document.createElement('div')
	const secondMainDiv =document.createElement('div')
	mainDiv.appendChild(firstMainDiv)
	mainDiv.appendChild(secondMainDiv)
	
	const addProject = (() => {
		const addProjectButton = document.createElement('button')
		addProjectButton.textContent = 'Add Project'
		const showAllProject = document.createElement('button')
		showAllProject.textContent = 'All Project'
        const projectDialog = document.createElement('dialog')
		const projectInput = document.createElement('input')
		const addButton = document.createElement('button')
		const closeButton = document.createElement('button')
		addButton.textContent = 'Add'
		closeButton.textContent = 'Close'
		projectDialog.classList.add('projectDia')
		navBar.appendChild(addProjectButton)	
		navBar.appendChild(showAllProject)	
		todoDiv.appendChild(projectDialog)
		projectDialog.appendChild(projectInput)
		projectDialog.appendChild(addButton)
		projectDialog.appendChild(closeButton)

		addProjectButton.addEventListener('click',() => {
			projectDialog.showModal()
		})
		addButton.addEventListener('click',() => {
			projectsMethod.addProjects(projectInput.value)
			projectsMethod.saveLocally()
			appendProject()
			projectInput.value = ''
			projectInput.focus()
		})
		showAllProject.addEventListener('click',() => {
			appendProject()
			firstMainDiv.textContent = ''
		})
		closeButton.addEventListener('click',() => {
			projectDialog.close()
		})

    })()
	
	const appendProject = () => { // displays projects
		secondMainDiv.textContent = ''
		projectsMethod.allProjects().map((proj,projIndex) => {
			const projectDiv = document.createElement('div')
			projectDiv.textContent = proj.title
			secondMainDiv.classList.add('maingrid')
			secondMainDiv.appendChild(projectDiv)
			projectDiv.addEventListener('click',() => {
				projectTask(projIndex)
			})
		})
	}
	const projectTask = (projIndex) => {
		secondMainDiv.textContent = ''
		firstMainDiv.textContent = ''
		const addTaskButton = document.createElement('button')
		addTaskButton.textContent = 'Add Task'
		firstMainDiv.appendChild(addTaskButton)
		secondMainDiv.classList.remove('maingrid')
		const taskDialog = document.createElement('dialog')
		const taskInput = document.createElement('input')
		const taskDes = document.createElement('input')
		const taskDate = document.createElement('input')
		const taskPrio = document.createElement('input')
		const add = document.createElement('button')
		const close = document.createElement('button')
		add.textContent = 'Add'
		close.textContent = 'Close'
		taskPrio.type = 'number'
		todoDiv.appendChild(taskDialog)
		taskDialog.appendChild(taskInput)
		taskDialog.appendChild(taskDes)
		taskDialog.appendChild(taskDate)
		taskDialog.appendChild(taskPrio)
		taskDialog.appendChild(add)
		taskDialog.appendChild(close)	
		appendTask(projIndex)
		addTaskButton.addEventListener('click',() => {
			taskDialog.showModal()
		})
		close.addEventListener('click',() => {
			taskDialog.close()
		})
		add.addEventListener('click',() => {
			projectsMethod.addTodo(taskInput.value,taskDes.value,'',taskPrio.value)
			projectsMethod.addTodoProject(projIndex,projectsMethod.allTodos()[projectsMethod.allTodos().length-1])
			appendTask(projIndex)
		})
	}
	
	const appendTask = (projIndex) => { // displays tasks
		const allSave = projectsMethod.saveLocally()
		secondMainDiv.textContent = ''
		const sortButton = document.createElement('button')
		sortButton.textContent = 'Sort'
		secondMainDiv.appendChild(sortButton)
		projectsMethod.allProjects()[projIndex].todoList.map((todo,todoIndex) => {
			const taskDiv = document.createElement('div')
			const taskChildDiv = document.createElement('div')
			const taskDesDiv = document.createElement('div')
			const taskDetailBtn = document.createElement('button')
			const editTask = document.createElement('button')
			const delBtn = document.createElement('button')
			const checkTask = document.createElement('input')
			delBtn.textContent = 'Delete'
			checkTask.type = 'radio'
			editTask.textContent = 'Edit'
			taskChildDiv.textContent = todo.title
			taskDesDiv.textContent = todo.description
			taskDetailBtn.textContent = 'Show'
			taskDiv.classList.add('taskDiv')
			taskDesDiv.classList.add('showDes')
			secondMainDiv.appendChild(taskDiv)
			taskDiv.appendChild(checkTask)
			taskDiv.appendChild(taskChildDiv)
			taskDiv.appendChild(delBtn)
			secondMainDiv.appendChild(taskDesDiv)
			taskDiv.appendChild(taskDetailBtn)
			taskDiv.appendChild(editTask)

			taskDetailBtn.addEventListener('click',() => {
				taskDesDiv.classList.toggle('showDes')
			})
			editTask.addEventListener('click',() => {
				const newTaskDialog = document.createElement('dialog')
				todoDiv.appendChild(newTaskDialog)
				const newTaskInput = document.createElement('input')
				newTaskDialog.appendChild(newTaskInput)
				const newTaskDes = document.createElement('input')
				const newTaskDate = document.createElement('input')
				const newTaskPrio = document.createElement('input')
				const saveBtn = document.createElement('button')
				newTaskDialog.appendChild(newTaskDes)
				newTaskDialog.appendChild(newTaskDate)
				newTaskDialog.appendChild(newTaskPrio)
				newTaskDialog.appendChild(saveBtn)
				saveBtn.textContent = 'Save'
				saveBtn.addEventListener('click',() => {
					projectsMethod.allProjects()[projIndex].todoList.map(x => {
						if(newTaskInput.value !== '') {
							x.title = newTaskInput.value
						}
						if(newTaskDes.value !== ''){
							x.description = newTaskDes.value
						}
						if(newTaskDate.value !== ''){
							x.dueDate = newTaskDate.value
						}
						if(newTaskPrio.value !== ''){
							x.priority = newTaskPrio.value
						}
					})
					appendTask(projIndex)
				})
				newTaskDialog.showModal()
			})
			
			
			delBtn.addEventListener('click',() => {
				projectsMethod.delTodo(projIndex,todoIndex)
				secondMainDiv.removeChild(taskDiv)
				console.log(projectsMethod.allProjects())

			})
			checkTask.addEventListener('click',() => {
				projectsMethod.checkTodos(projIndex,todoIndex)
				setTimeout((()=> {
					secondMainDiv.removeChild(taskDiv)
				}),1000)
				
				console.log(projectsMethod.allProjects())
			})
			sortButton.addEventListener('click',() => {
				projectsMethod.priority(projIndex)
				appendTask(projIndex)
			})
		})
	}
	
})()


