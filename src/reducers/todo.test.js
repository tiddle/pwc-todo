import { todoReducer as reducer } from './todo';
import { TODO_ACTIONS as ACTIONS } from '../actions/todo';

function randomStr() {
	return Math.random().toString(16).substr(2, 8);
}

describe('Todo reducer', () => {
	describe('Add', () => {
		it('should add a new Todo', () => {
			let task = randomStr();
			expect(reducer([], { type: ACTIONS.ADD_TODO, payload: { task } })[0].task).toEqual(task)
			expect(reducer(['aa'], { type: ACTIONS.ADD_TODO, payload: { task } })[1].task).toEqual(task)

		})
	});

	describe('Complete', () => {
		it('should toggle a Todo', () => {
			const todos = [
				{id: 111, task: 'Task 1', complete: false },
				{id: 222, task: 'Task 1', complete: false }
			];

			expect(reducer(todos, { type: ACTIONS.TOGGLE_TODO, payload: { id: 111}})[0].complete).toEqual(true);
			expect(reducer(todos, { type: ACTIONS.TOGGLE_TODO, payload: { id: 111}})[1].complete).toEqual(false);
			todos[0].complete = true;
			expect(reducer(todos, { type: ACTIONS.TOGGLE_TODO, payload: { id: 111}})[0].complete).toEqual(false);
			expect(reducer(todos, { type: ACTIONS.TOGGLE_TODO, payload: { id: 111}})[1].complete).toEqual(false);
		})
	});

	describe('Delete', () => {
		it('should delete a Todo', () => {
			const todos = [
				{id: 111, task: 'Task 1', complete: false },
				{id: 222, task: 'Task 1', complete: false }
			];

			expect(reducer(todos, { type: ACTIONS.DELETE_TODO, payload: { id: 111}})[0].id).toEqual(222);
		})
	});

	describe('Increase Priority', () => {
		it('should increase the priority of a Todo', () => {
			const todos = [
				{id: 111, task: 'Task 1', complete: false, priority: 1 },
				{id: 222, task: 'Task 1', complete: false, priority: 2 },
				{id: 333, task: 'Task 1', complete: false, priority: 3 }
			];


			const output1 = reducer(todos, { type: ACTIONS.INCREASE_PRIORITY, payload: { id: 222}});
			const output2 = reducer(todos, { type: ACTIONS.INCREASE_PRIORITY, payload: { id: 333}});
			const output3 = reducer(todos, { type: ACTIONS.INCREASE_PRIORITY, payload: { id: 111}});
			expect(output1[0].id).toEqual(222);
			expect(output2[1].id).toEqual(333);
			expect(output3[0].id).toEqual(111);
		})
	});

	describe('Decrease Priority', () => {
		it('should decrease the priority of a Todo', () => {
			const todos = [
				{id: 111, task: 'Task 1', complete: false, priority: 1 },
				{id: 222, task: 'Task 1', complete: false, priority: 2 },
				{id: 333, task: 'Task 1', complete: false, priority: 3 }
			];


			const output1 = reducer(todos, { type: ACTIONS.DECREASE_PRIORITY, payload: { id: 222}});
			const output2 = reducer(todos, { type: ACTIONS.DECREASE_PRIORITY, payload: { id: 333}});
			const output3 = reducer(todos, { type: ACTIONS.DECREASE_PRIORITY, payload: { id: 111}});
			expect(output1[2].id).toEqual(222);
			expect(output2[2].id).toEqual(333);
			expect(output3[1].id).toEqual(111);
		})
	});

	describe('Default', () => {
		it('should do nothing if action is unset/invalid', () => {
			const todos = [
				{id: 111, task: 'Task 1', complete: false, priority: 1 },
				{id: 222, task: 'Task 1', complete: false, priority: 2 },
				{id: 333, task: 'Task 1', complete: false, priority: 3 }
			];
			const output = reducer(todos, { type: 'INVALID', payload: { id: 222}});

			expect(output[0].id).toEqual(111);
			expect(output[1].id).toEqual(222);
			expect(output[2].id).toEqual(333);

		})
	});

	describe('Sort', () => {
		it('should sort accordingly', () => {
			const todos = [
				{id: 111, task: 'A', complete: false, priority: 3 },
				{id: 222, task: 'B', complete: false, priority: 2 },
				{id: 333, task: 'C', complete: false, priority: 1 },
				{id: 444, task: 'C', complete: false, priority: 4 }
			];
			const output1 = reducer(todos, { type: ACTIONS.SORT, payload: { sortType: 'task', sortAsc: false}});
			expect(output1[0].id).toEqual(444);

			const output2 = reducer(output1, { type: ACTIONS.SORT, payload: { sortType: 'priority', sortAsc: true}});
			expect(output2[0].id).toEqual(333);
			expect(output2[3].id).toEqual(444);

			const output3 = reducer(output2, { type: ACTIONS.SORT, payload: { sortType: 'task', sortAsc: true}});
			expect(output3[0].id).toEqual(111);
			expect(output3[3].id).toEqual(444);

		})
	});
})