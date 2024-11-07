import "./style.css";
import { projectsMethod } from "./project";
import { taskMethods } from "./task";

const projectDom = (() => {
	const mainDiv = document.querySelector('main')
	const navBar = document.querySelector('nav')
	const todoDiv = document.querySelector('.todo')
	const firstMainDiv = document.createElement('div')
	const secondMainDiv = document.createElement('div')
	const addProjectButton = document.createElement('button')
	addProjectButton.textContent = 'Add Project'
	const showAllProject = document.createElement('button')
	showAllProject.textContent = 'All Project'
	navBar.appendChild(addProjectButton)
	navBar.appendChild(showAllProject)
	addProjectButton.classList.add('addProjectBtn')
	showAllProject.classList.add('showProjectBtn')
	addProjectButton.addEventListener('click', () => {
		addProject()
	})
	showAllProject.addEventListener('click', () => {
		if (localStorage.getItem('proj')) {
			mainDiv.textContent = ''
			appendProject()
		}

	})
	const addProject = () => {
		const projectDialog = document.createElement('dialog')
		const projectInput = document.createElement('input')
		const addButton = document.createElement('button')
		const closeButton = document.createElement('button')
		const projectTitleDiv = document.createElement('div')
		projectTitleDiv.textContent = 'Title'
		addButton.textContent = 'Add'
		closeButton.textContent = 'Close'
		todoDiv.appendChild(projectDialog)
		projectDialog.appendChild(projectTitleDiv)
		projectDialog.appendChild(projectInput)
		projectDialog.appendChild(addButton)
		projectDialog.appendChild(closeButton)
		projectDialog.showModal()
		addButton.addEventListener('click', () => {
			mainDiv.textContent = ''
			projectsMethod.addProjects(projectInput.value)
			projectsMethod.saveLocally()
			appendProject()
			projectInput.value = ''
			projectInput.focus()
		})

		closeButton.addEventListener('click', () => {
			projectDialog.close()
		})

	}

	const appendProject = () => { // displays projects
		mainDiv.textContent = ''
		mainDiv.classList.add('allProjects')
		mainDiv.classList.remove('addTask')
		projectsMethod.fetchLocally().map((proj, projIndex) => {
			const projectDiv = document.createElement('div')
			const projectTitleDiv = document.createElement('div')
			const projectDeleteDiv = document.createElement('div')
			const titleDiv = document.createElement('div')
			projectTitleDiv.textContent = proj.title
			mainDiv.appendChild(projectDiv)
			projectDiv.appendChild(projectDeleteDiv)
			projectDiv.appendChild(titleDiv)
			titleDiv.classList.add('titleDiv')
			titleDiv.appendChild(projectTitleDiv)
			const delProj = document.createElement('button')
			delProj.textContent = 'Delete'
			projectDeleteDiv.appendChild(delProj)
			delProj.classList.add('delbtn')
			titleDiv.addEventListener('click', () => {
				projectTask(projIndex)
			})
			delProj.addEventListener('click', () => {
				projectsMethod.delProject(projIndex)
				projectsMethod.saveLocally()
				mainDiv.removeChild(projectDiv)
			})
		})
	}
	


	const projectTask = (projIndex) => {
		const appendTask = (projIndex) => { 
			mainDiv.classList.remove('allProjects')
			mainDiv.classList.remove('addTask')
			mainDiv.textContent = ''
			mainDiv.appendChild(firstMainDiv)
			mainDiv.appendChild(secondMainDiv)
			firstMainDiv.textContent = ''
			secondMainDiv.textContent = ''
			firstMainDiv.classList.add('projectfirstMainDiv')
			secondMainDiv.classList.add('projectTodos')			
			const sortButton = document.createElement('button')
			sortButton.textContent = 'Sort'
			firstMainDiv.appendChild(addTaskButton)
			if(projectsMethod.fetchLocally()[projIndex].todoList.length > 0){
				firstMainDiv.appendChild(sortButton)
			}
			projectsMethod.fetchLocally()[projIndex].todoList.map((todo, todoIndex) => {
				const parentTaskDiv = document.createElement('div')
				const showTaskDiv = document.createElement('div')
				const taskDiv = document.createElement('div')
				const taskTitleDiv = document.createElement('div')
				const taskDesDiv = document.createElement('div')
				const taskDateDiv = document.createElement('div')
				const taskPrioDiv = document.createElement('div')
				const taskDetailBtn = document.createElement('button')
				const editTask = document.createElement('button')
				const delBtn = document.createElement('button')
				const checkTask = document.createElement('input')
				delBtn.textContent = 'Delete'
				checkTask.type = 'radio'
				editTask.textContent = 'Edit'
				taskTitleDiv.textContent = todo.title
				taskDesDiv.textContent = todo.description
				taskDateDiv.textContent = `Due Date:${todo.dueDate}`
				taskPrioDiv.textContent = `Priority:${todo.priority}`
				taskDetailBtn.textContent = 'Show'
				parentTaskDiv.classList.add('parentTask')
				taskDiv.classList.add('taskDiv')
				taskDesDiv.classList.add('showTaskDes')
				showTaskDiv.classList.add('showTaskDetail')
				taskDesDiv.classList.toggle('showTaskDetail')
				showTaskDiv.classList.toggle('showTaskDes')
				secondMainDiv.appendChild(parentTaskDiv)
				parentTaskDiv.appendChild(taskDiv)
				taskDiv.appendChild(checkTask)
				taskDiv.appendChild(taskTitleDiv)
				taskDiv.appendChild(taskDetailBtn)
				taskDiv.appendChild(editTask)
				taskDiv.appendChild(delBtn)
				parentTaskDiv.appendChild(showTaskDiv)
				parentTaskDiv.appendChild(taskDesDiv)
				showTaskDiv.appendChild(taskDateDiv)
				showTaskDiv.appendChild(taskPrioDiv)
				taskDetailBtn.addEventListener('click', () => {
					taskDesDiv.classList.toggle('showTaskDetail')
					showTaskDiv.classList.toggle('showTaskDes')
				})
				editTask.addEventListener('click', () => {
					const newTaskDialog = document.createElement('dialog')
					todoDiv.appendChild(newTaskDialog)
					const newTaskInput = document.createElement('input')
					const newTaskDes = document.createElement('input')
					const newTaskDate = document.createElement('input')
					newTaskDate.type = 'date'
					const newTaskPrio = document.createElement('input')
					const saveBtn = document.createElement('button')
					const closeEditBtn = document.createElement('button')
					const newTaskInputDiv = document.createElement('div')
					const newTaskDesDiv = document.createElement('div')
					const newTaskDateDiv = document.createElement('div')
					const newTaskPrioDiv = document.createElement('div')
					
					newTaskInputDiv.textContent = 'Title'
					newTaskDesDiv.textContent = 'Description'
					newTaskDateDiv.textContent = 'Due Date'
					newTaskPrioDiv.textContent = 'Prio'
					newTaskDialog.appendChild(newTaskInputDiv)
					newTaskDialog.appendChild(newTaskInput)
					newTaskDialog.appendChild(newTaskDesDiv)
					newTaskDialog.appendChild(newTaskDes)
					newTaskDialog.appendChild(newTaskDateDiv)
					newTaskDialog.appendChild(newTaskDate)
					newTaskDialog.appendChild(newTaskPrioDiv)
					newTaskDialog.appendChild(newTaskPrio)
					newTaskDialog.appendChild(saveBtn)
					newTaskDialog.appendChild(closeEditBtn)
					saveBtn.textContent = 'Save'
					closeEditBtn.textContent = 'Close'
					closeEditBtn.addEventListener('click', () => {
						newTaskDialog.close()
					})
					saveBtn.addEventListener('click', () => {
							if (newTaskInput.value !== '') {
								projectsMethod.fetchLocally()[projIndex].todoList[todoIndex].title = newTaskInput.value
							}
							if (newTaskDes.value !== '') {
								projectsMethod.fetchLocally()[projIndex].todoList[todoIndex].description = newTaskDes.value
							}
							if (newTaskDate.value !== '') {
								projectsMethod.fetchLocally()[projIndex].todoList[todoIndex].dueDate = newTaskDate.value
							}
							if (newTaskPrio.value !== '') {
								projectsMethod.fetchLocally()[projIndex].todoList[todoIndex].priority = newTaskPrio.value
							}
						
						projectsMethod.saveLocally()
						appendTask(projIndex)
					})
					newTaskDialog.showModal()
				})
	
				delBtn.addEventListener('click', () => {
					projectsMethod.delTodo(todoIndex)
					secondMainDiv.removeChild(parentTaskDiv)
					projectsMethod.saveLocally()
	
				})
				checkTask.addEventListener('click', () => {
					projectsMethod.checkTodos(projIndex, todoIndex)
					setTimeout((() => {
						secondMainDiv.removeChild(parentTaskDiv)
					}), 1000)
					projectsMethod.saveLocally()
	
				})
				sortButton.addEventListener('click', () => {
					projectsMethod.priority(projIndex)
					projectsMethod.saveLocally()
					appendTask(projIndex)
				})
			})
		}
		const addTaskButton = document.createElement('button')
		addTaskButton.textContent = 'Add Task'
		firstMainDiv.classList.remove('maingrid')
		mainDiv.appendChild(addTaskButton)
		addTaskButton.addEventListener('click', () => {
		const taskDialog = document.createElement('dialog')
		const taskInput = document.createElement('input')
		const taskDes = document.createElement('input')
		const taskDate = document.createElement('input')
		taskDate.type = 'date'
		const taskPrio = document.createElement('input')
		const add = document.createElement('button')
		const close = document.createElement('button')
		const taskTitleDiv = document.createElement('div')
		const taskDesDiv = document.createElement('div')
		const taskDueDateDiv = document.createElement('div')
		const taskPrioDiv = document.createElement('div')
		taskTitleDiv.textContent = 'Title'
		taskDesDiv.textContent = 'Description'
		taskDueDateDiv.textContent = 'Due Date'
		taskPrioDiv.textContent = 'Priority'
		add.textContent = 'Add'
		close.textContent = 'Close'
		taskPrio.type = 'number'
		todoDiv.appendChild(taskDialog)
		taskDialog.appendChild(taskTitleDiv)
		taskDialog.appendChild(taskInput)
		taskDialog.appendChild(taskDesDiv)
		taskDialog.appendChild(taskDes)
		taskDialog.appendChild(taskDueDateDiv)
		taskDialog.appendChild(taskDate)
		taskDialog.appendChild(taskPrioDiv)
		taskDialog.appendChild(taskPrio)
		taskDialog.appendChild(add)
		taskDialog.appendChild(close)
			taskDialog.showModal()
		close.addEventListener('click', () => {
			taskDialog.close()
		})	
		add.addEventListener('click', () => {
				projectsMethod.addTodo(taskInput.value, taskDes.value, taskDate.value, taskPrio.value)
				projectsMethod.addTodoProject(projIndex, projectsMethod.allTodos()[projectsMethod.allTodos().length - 1])
				projectsMethod.saveLocally()
				appendTask(projIndex)
		})
		})
		
		appendTask(projIndex)
	}
	
	const addTask = (() => {
		const listMyTask = () => {
			mainDiv.classList.remove('allProjects')
			mainDiv.classList.remove('addTask')
			mainDiv.textContent = ''
			firstMainDiv.classList.remove('maingrid')
			firstMainDiv.classList.remove('projectfirstMainDiv')
			secondMainDiv.classList.remove('projectTodos')
			mainDiv.appendChild(firstMainDiv)
			mainDiv.appendChild(secondMainDiv)
			firstMainDiv.textContent = ''
			firstMainDiv.classList.add('firstMainDiv')
			secondMainDiv.textContent = ''
			secondMainDiv.classList.add('allTaskDiv')
			const sortButton = document.createElement('button')
			sortButton.textContent = 'Sort'
			firstMainDiv.appendChild(addMyTaskButton)
			if (taskMethods.fetchTask().length > 0) {
				firstMainDiv.appendChild(sortButton)
			}
			taskMethods.fetchTask().map((todo, todoIndex) => {
				const parentTaskDiv = document.createElement('div')
				const showTaskDiv = document.createElement('div')
				const taskDiv = document.createElement('div')
				const taskTitleDiv = document.createElement('div')
				const taskDesDiv = document.createElement('div')
				const taskDateDiv = document.createElement('div')
				const taskPrioDiv = document.createElement('div')
				const taskDetailBtn = document.createElement('button')
				const editTask = document.createElement('button')
				const delBtn = document.createElement('button')
				const checkTask = document.createElement('input')
				delBtn.textContent = 'Delete'
				checkTask.type = 'radio'
				editTask.textContent = 'Edit'
				taskTitleDiv.textContent = todo.title
				taskDesDiv.textContent = todo.description
				taskDateDiv.textContent = `Due Date:${todo.dueDate}`
				taskPrioDiv.textContent = `Priority:${todo.priority}`
				taskDetailBtn.textContent = 'Show'
				parentTaskDiv.classList.add('parentTask')
				taskDiv.classList.add('taskDiv')
				taskDesDiv.classList.add('showTaskDes')
				showTaskDiv.classList.add('showTaskDetail')
				taskDesDiv.classList.toggle('showTaskDetail')
				showTaskDiv.classList.toggle('showTaskDes')
				secondMainDiv.appendChild(parentTaskDiv)
				parentTaskDiv.appendChild(taskDiv)
				taskDiv.appendChild(checkTask)
				taskDiv.appendChild(taskTitleDiv)
				taskDiv.appendChild(taskDetailBtn)
				taskDiv.appendChild(editTask)
				taskDiv.appendChild(delBtn)
				parentTaskDiv.appendChild(showTaskDiv)
				parentTaskDiv.appendChild(taskDesDiv)
				showTaskDiv.appendChild(taskDateDiv)
				showTaskDiv.appendChild(taskPrioDiv)
				taskDetailBtn.addEventListener('click', () => {
					taskDesDiv.classList.toggle('showTaskDetail')
					showTaskDiv.classList.toggle('showTaskDes')
				})
				editTask.addEventListener('click', () => {
					const newTaskDialog = document.createElement('dialog')
					todoDiv.appendChild(newTaskDialog)
					const newTaskTitle = document.createElement('input')
					newTaskDialog.appendChild(newTaskTitle)
					const newTaskDes = document.createElement('input')
					const newTaskDate = document.createElement('input')
					newTaskDate.type = 'date'
					const newTaskPrio = document.createElement('input')
					newTaskPrio.type = 'number'
					const saveBtn = document.createElement('button')
					const closeEditBtn = document.createElement('button')
					const newTaskInputDiv = document.createElement('div')
					const newTaskDesDiv = document.createElement('div')
					const newTaskDateDiv = document.createElement('div')
					const newTaskPrioDiv = document.createElement('div')
					newTaskInputDiv.textContent = 'Title'
					newTaskDesDiv.textContent = 'Description'
					newTaskDateDiv.textContent = 'Due Date'
					newTaskPrioDiv.textContent = 'Prio'
					newTaskDialog.appendChild(newTaskInputDiv)
					newTaskDialog.appendChild(newTaskTitle)
					newTaskDialog.appendChild(newTaskDesDiv)
					newTaskDialog.appendChild(newTaskDes)
					newTaskDialog.appendChild(newTaskDateDiv)
					newTaskDialog.appendChild(newTaskDate)
					newTaskDialog.appendChild(newTaskPrioDiv)
					newTaskDialog.appendChild(newTaskPrio)
					newTaskDialog.appendChild(saveBtn)
					newTaskDialog.appendChild(closeEditBtn)
					saveBtn.textContent = 'Save'
					closeEditBtn.textContent = 'Close'
					newTaskDialog.showModal()
					closeEditBtn.addEventListener('click', () => {
						newTaskDialog.close()
					})
					saveBtn.addEventListener('click', () => {
						if (newTaskTitle.value !== ''){
							taskMethods.fetchTask()[todoIndex].title = newTaskTitle.value
						}
						if (newTaskDes.value !== ''){
							taskMethods.fetchTask()[todoIndex].description = newTaskDes.value
						}
						if (newTaskDate.value !== ''){
							taskMethods.fetchTask()[todoIndex].dueDate = newTaskDate.value
						}
						if (newTaskPrio.value !== ''){
							taskMethods.fetchTask()[todoIndex].priority = newTaskPrio.value
						}
						if(newTaskTitle.value.length < 40){
							taskMethods.saveTask()
							listMyTask()
						}else{
							alert('Title length should be less than 40')
						}
						
					})
				})
				delBtn.addEventListener('click', () => {
					taskMethods.delTask(todoIndex)
					taskMethods.saveTask()
					secondMainDiv.removeChild(parentTaskDiv)
					if (taskMethods.fetchTask().length === 0) {
						firstMainDiv.removeChild(sortButton)
					}
				})
				checkTask.addEventListener('click', () => {
					taskMethods.checkTodos(todoIndex)
					taskMethods.saveTask()
					setTimeout((() => {
						secondMainDiv.removeChild(parentTaskDiv)
					}), 1000)
				})
				sortButton.addEventListener('click', () => {
					taskMethods.priority()
					taskMethods.saveTask()
					listMyTask()

				})
			})
		}
		const myProject = document.createElement('button')
		myProject.textContent = 'My Projects'
		myProject.classList.add('myTaskBtn')
		navBar.appendChild(myProject)
		const addMyTaskButton = document.createElement('button')
		mainDiv.appendChild(addMyTaskButton)
		addMyTaskButton.textContent = ' + Add Task'
		mainDiv.classList.add('addTask')
		if (localStorage.getItem('task')) {
			listMyTask()
		}
		myProject.addEventListener('click', () => {
			if (localStorage.getItem('task')) {
				listMyTask()
			}
		})
		addMyTaskButton.addEventListener('click', () => {
			const myTaskDialog = document.createElement('dialog')
			const myTaskTitle = document.createElement('input')
			const myTaskDes = document.createElement('input')
			const myTaskDate = document.createElement('input')
			myTaskDate.type ='date'
			const myTaskPrio = document.createElement('input')
			myTaskPrio.type = 'number'
			const addMyTask = document.createElement('button')
			const closeTaskDialog = document.createElement('button')
			addMyTask.textContent = 'Add'
			closeTaskDialog.textContent = 'Close'
			const taskTitleDiv = document.createElement('div')
			const taskDesDiv = document.createElement('div')
			const taskDueDateDiv = document.createElement('div')
			const taskPrioDiv = document.createElement('div')
			taskTitleDiv.textContent = 'Title'
			taskDesDiv.textContent = 'Description'
			taskDueDateDiv.textContent = 'Due Date'
			taskPrioDiv.textContent = 'Priority'
			myTaskDialog.appendChild(taskTitleDiv)
			myTaskDialog.appendChild(myTaskTitle)
			myTaskDialog.appendChild(taskDesDiv)
			myTaskDialog.appendChild(myTaskDes)
			myTaskDialog.appendChild(taskDueDateDiv)
			myTaskDialog.appendChild(myTaskDate)
			myTaskDialog.appendChild(taskPrioDiv)
			myTaskDialog.appendChild(myTaskPrio)
			myTaskDialog.appendChild(addMyTask)
			myTaskDialog.appendChild(closeTaskDialog)
			todoDiv.appendChild(myTaskDialog)
			myTaskDialog.showModal()
			closeTaskDialog.addEventListener('click', () => {
				myTaskDialog.close()
			})
			addMyTask.addEventListener('click', () => {
				if(myTaskTitle.value.length < 50){
					taskMethods.addTask(myTaskTitle.value, myTaskDes.value, myTaskDate.value, myTaskPrio.value)
					taskMethods.saveTask()
					listMyTask()
				}else{
					alert('Title length should be less than 50')
				}
				
			})

		})

	})()

})()
