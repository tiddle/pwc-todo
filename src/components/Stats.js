import React from 'react'

export default function Stats({ todos, className }) {
	return (
		<div className={className}>
			Total Tasks: {todos.length} &nbsp;
      Completed Tasks: {todos.filter(todo => todo.complete).length}
		</div>
	)
}
