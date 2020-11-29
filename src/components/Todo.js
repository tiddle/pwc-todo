import React from 'react'

import { TODO_ACTIONS as ACTIONS } from '../actions/todo';
import { SORT_ACTIONS } from '../actions/sort';

import './Todo.css';

export default function Todo({ todo, dispatch, className, sortDispatch }) {
	function priorityChange(id, increase = true) {
		if (increase) {
			dispatch({ type: ACTIONS.INCREASE_PRIORITY, payload: { id } });
		} else {
			dispatch({ type: ACTIONS.DECREASE_PRIORITY, payload: { id } });
		}
		sortDispatch({ type: SORT_ACTIONS.FORCE, payload: { sortType: 'priority', sortAsc: true } });
	}

	return (
		<>
			<div className="task-name" onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}>
				<span style={{ textDecoration: todo.complete ? 'line-through' : 'none' }} className={className} >{todo.task}</span>
			</div>
			<div className="task-priority">
				{todo.priority}
			</div>
			<div className="task-actions">
				<button onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })} aria-label="Remove task">x</button>
				<button onClick={() => priorityChange(todo.id, false)} aria-label="Decrease priority of task">-</button>
				<button onClick={() => priorityChange(todo.id)} aria-label="Increase priority of task">+</button>
			</div>
		</>
	)
}
