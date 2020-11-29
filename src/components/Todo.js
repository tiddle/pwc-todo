import React from 'react'

import { TODO_ACTIONS as ACTIONS } from '../actions/todo';

export default function Todo({ todo, dispatch }) {
	return (
		<div>
			<span style={{ color: todo.complete ? '#aaa' : '#000' }} onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}>{todo.task} {todo.id}</span>
			<button onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}>x</button>
		</div>
	)
}
