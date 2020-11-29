import { TODO_ACTIONS } from '../actions/todo';
/**
 * Helper function to create new task
 * 
 * @param {String} task 
 */
function newTodo(task) {
	return { id: Date.now(), task, complete: false, priority: 0 };
}

/**
 * Reducer for TODOs
 * 
 * @param {Array} todos 
 * @param {String} action 
 */
export function todoReducer(todos, action) {
	switch (action.type) {
		case TODO_ACTIONS.ADD_TODO:
			return [...todos, newTodo(action.payload.task)];
		case TODO_ACTIONS.TOGGLE_TODO:
			return todos.map(todo => {
				if (todo.id === action.payload.id) {
					return { ...todo, complete: !todo.complete }
				}
				return todo;
			});
		case TODO_ACTIONS.DELETE_TODO:
			return todos.filter(todo => todo.id !== action.payload.id);
		default:
			return todos;
	}
}