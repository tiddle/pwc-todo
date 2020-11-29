import { sortReducer as reducer } from './sort';
import { SORT_ACTIONS as ACTIONS } from '../actions/sort';

describe('Sort reducer', () => {
	describe('Sort', () => {
		it('should sort accordingly', () => {
			const output = reducer({}, {type: ACTIONS.SORT, payload: {currSort: 'aa', prevSort: 'aa', prevAsc: false}})
			expect(output.sortAsc).toBe(true);

			const output1 = reducer({}, {type: ACTIONS.SORT, payload: {currSort: 'aa', prevSort: 'bb', prevAsc: false}})
			expect(output1.sortType).toBe('aa');
			expect(output1.sortAsc).toBe(true);
			
			const output2 = reducer({}, {type: ACTIONS.SORT, payload: {currSort: 'aa', prevSort: 'aa', prevAsc: true}})
			expect(output2.sortAsc).toBe(false);

		})
	});
})