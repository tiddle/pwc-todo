import React, { useReducer, useState } from 'react';

import { TODO_ACTIONS as ACTIONS } from './actions/todo';
import { todoReducer as reducer } from './reducers/todo'; 

import Todo from './components/Todo';
import Stats from './components/Stats';

function App() {
	const [todos, dispatch] = useReducer(reducer, []);
	const [task, setTask] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		dispatch({ type: ACTIONS.ADD_TODO, payload: { task } });
		setTask('');
	}

	function sortBy(sort = 'priority') {
		
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>PWC TODO</h1>

				<form onSubmit={handleSubmit}>
					<input type="text" value={task} onChange={e => setTask(e.target.value)} />
				</form>
			</header>

			{todos.map(todo => {
				return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
			})}

			<Stats todos={todos} />

		</div>
	);
}

export default App;
