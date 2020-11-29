import React from 'react'

export default function Stats({ todos }) {
	console.log(todos);
	return (
		<div>
			Total Tasks: {todos.length}
      Completed Tasks: {todos.filter(todo => todo.complete).length}
		</div>
	)
}
