import { TODO_ACTIONS } from '../actions/todo';
/**
 * Helper function to create new task
 * 
 * @param {String} task 
 * @param {Number} Priority 
 */
function newTodo(task, priority) {
	return { id: Date.now(), task, complete: false, priority};
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
			return [...todos, newTodo(action.payload.task, todos.length + 1)];
		case TODO_ACTIONS.TOGGLE_TODO:
			return todos.map(todo => {
				if (todo.id === action.payload.id) {
					return { ...todo, complete: !todo.complete }
				}
				return todo;
			});
		case TODO_ACTIONS.DELETE_TODO:
			return todos.filter(todo => todo.id !== action.payload.id);
		case TODO_ACTIONS.DECREASE_PRIORITY:
		case TODO_ACTIONS.INCREASE_PRIORITY:
			return todos
				.map(todo => {
					if (todo.id === action.payload.id) {
						if (action.type === TODO_ACTIONS.INCREASE_PRIORITY) {
							return { ...todo, priority: todo.priority - 1.5 };
						} else {
							return { ...todo, priority: todo.priority + 1.5 };
						}
					}

					return todo;
				})
				.sort((a, b) => a.priority - b.priority)
				.map((todo, i) => { return { ...todo, priority: i + 1 } });
		default:
			return todos;
	}
}