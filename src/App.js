import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoActions from './components/Todos/TodoActions'
import TodoList from './components/Todos/TodoList'
import TodoForm from './components/Todos/TodoForm'
import './App.css'

function App() {
	const [todos, setTodos] = useState([])

	// добавляет задачу в TodoList
	const addTodoHandler = (text) => {
		const newTodo = {
			text: text,
			id: uuidv4(),
			isCompleted: false,
		}
		setTodos([...todos, newTodo])
	}
	// удаляет одну задачу с нужным id
	const deleteTodoHandler = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id))
	}

	// изменяет у объекта свойство на false либо true
	const toggleTodoHandler = (id) => {
		setTodos(
			todos.map((todo) => {
				return todo.id === id
					? { ...todo, isCompleted: !todo.isCompleted }
					: { ...todo }
			})
		)
	}
	// удаляет все задачи при нажатии на кнопку
	const resetTodosHandler = () => {
		setTodos([])
	}

	// const deleteCompletedTodosHandler = () => {
	// 	setTodos(todos.filter((todo) => !todo.isCompleted))
	// }
	const deleteCompletedTodosHandler = () => {
		setTodos(todos.filter((todo) => todo.isCompleted === false))
	}

	const completedTodosCount = todos.filter((todo) => todo.isCompleted).length

	return (
		<div className="App">
			<h1>Todo App</h1>
			<TodoForm addTodo={addTodoHandler} />
			{!!todos.length && (
				<TodoActions
					resetTodos={resetTodosHandler}
					deleteCompletedTodos={deleteCompletedTodosHandler}
					completedTodosExist={!!completedTodosCount}
				/>
			)}
			<TodoList
				todos={todos}
				deleteTodo={deleteTodoHandler}
				toggleTodo={toggleTodoHandler}
			/>
			{!!completedTodosCount && (
				<h3>{`You have completed ${completedTodosCount} ${
					completedTodosCount > 1 ? 'todos' : 'todo'
				}!`}</h3>
			)}
		</div>
	)
}

export default App
