import React, { useReducer, useState } from 'react';

import { TODO_ACTIONS as ACTIONS } from './actions/todo';
import { todoReducer as reducer } from './reducers/todo';
import { sortReducer } from './reducers/sort';

import Todo from './components/Todo';
import Stats from './components/Stats';

import './App.css';


function App() {
	const [todos, dispatch] = useReducer(reducer, []);
	const [sortDetails, sortDispatch] = useReducer(sortReducer, { sortType: 'priority', sortAsc: true }) 
	const [task, setTask] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if(!task) {
			alert('Please enter a task');
			return;
		}
		dispatch({ type: ACTIONS.ADD_TODO, payload: { task } });
		setTask('');
	}

	function sortBy(sort = 'priority') {
		dispatch({ type: ACTIONS.SORT, payload: sortDetails})
		sortDispatch({ type: ACTIONS.SORT, payload: {currSort: sort, prevSort: sortDetails.sortType, prevAsc: sortDetails.sortAsc}});
	}

	function renderArrow(task, dir) {
		let arrow = 'v';
		if(!sortDetails.sortAsc) {
			arrow = '^'
		}

		if(sortDetails.sortType === task) {
			return arrow;
		}

		return '';
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>PWC TODO</h1>

				<form onSubmit={handleSubmit}>
					<label> Task name: <input type="text" value={task} onChange={e => setTask(e.target.value)} />
					</label>
					<button type="submit">Add task</button>
				</form>
			</header>

			{todos.length > 0 &&
				<>
					<div class="grid">
						<div className="todo-task link" onClick={() => sortBy('task')}>Task Name {renderArrow('task')}</div>
						<div className="todo-priority link" onClick={() => sortBy('priority')}>Priority {renderArrow('priority')}</div>
						<div className="todo-actions">Actions</div>

						{todos.map(todo => {
							return <Todo key={todo.id} todo={todo} dispatch={dispatch} sortDispatch={sortDispatch} />
						})}

					</div>
					<Stats todos={todos} className="full" />
				</>
			}

		</div>
	);
}

export default App;
