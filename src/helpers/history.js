import _ from 'lodash';
import qs from 'qs';

export function sortObjectByKey(params) {
	return _(params).toPairs().sortBy(0).fromPairs().value();
}

export function pushParamsToUrl(history, params) {
	const CURRENT_PARAMS = getParamsFromUrl(history);
	let MODIFIED_PARAMS = { ...CURRENT_PARAMS, ...params };
	MODIFIED_PARAMS = sortObjectByKey(MODIFIED_PARAMS);

	history.push({
		search: qs.stringify(MODIFIED_PARAMS, {
			addQueryPrefix: true,
		}),
	});
}

export function getParamsFromUrl(history) {
	let params = qs.parse(history.location.search, {
		ignoreQueryPrefix: true,
	});
	return sortObjectByKey(params);
}

function findObjectDifference(old, current) {
	const newParams = {};
	Object.entries(current).forEach(([key]) => {
		if (old[key] !== current[key]) {
			newParams[key] = current[key];
		}
	});
	return newParams;
}
