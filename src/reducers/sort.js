import { SORT_ACTIONS } from '../actions/sort';

/**
 * Defines the sort of the Todos
 * 
 * @param {string} currSort 
 * @param {string} prevSort 
 * @param {boolean} prevAsc 
 */
function sortDetails(currSort, prevSort, prevAsc) {
	const output = {};

	output.sortType = currSort;
	output.sortAsc = true;

	if (prevSort === currSort) {
		output.sortAsc = !prevAsc
	}

	return output;
}
/**
 * Reducer for sort 
 * 
 * @param {Array} todos 
 * @param {String} action 
 */
export function sortReducer(sort, action) {
	switch (action.type) {
		case SORT_ACTIONS.FORCE:
			return {
				sortType: action.payload.sortType,
				sortAsc: action.payload.sortAsc
			};
		case SORT_ACTIONS.SORT:
		default:
			const { currSort, prevSort, prevAsc } = action.payload;
			const sortObj = sortDetails(currSort, prevSort, prevAsc);

			return sortObj;
	}
}